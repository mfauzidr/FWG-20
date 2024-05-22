import { QueryResult } from "pg"
import db from "../config/pg"
import { IUser, IUserBody } from "../models/users"



export const totalCount = async (search: string = ''): Promise<number> => {
  const query: string = `
    SELECT COUNT(*) as total
    FROM "users"
    WHERE "fullName" ILIKE $1
  `

  const values: string[] = [`%${search}%`]
  const result: QueryResult<{ total: number }> = await db.query(query, values)
  return result.rows[0].total
}

export const findAllUsers = async (
  search: string = '',
  sortBy: string = 'id',
  orderBy: string = 'asc',
  page: number = 1
): Promise<IUser[]> => {
  const columns: string[] = ["fullName", "role", "createdAt"]
  const orderings: string[] = ["asc", "desc"]
  const limit: number = 5
  const offset: number = (page - 1) * limit


  let orderByClause: string = `ORDER BY "id" ASC`


  switch (sortBy) {
    case 'A-Z':
      orderByClause = `ORDER BY "fullName" ASC`
      break
    case 'Z-A':
      orderByClause = `ORDER BY "fullName" DESC`
      break
    case 'oldest':
      orderByClause = `ORDER BY "createdAt" ASC`
      break
    case 'newest':
      orderByClause = `ORDER BY "createdAt" DESC`
      break
    case 'role':
      orderByClause = `ORDER BY "role" ${orderBy === 'asc' ? 'DESC' : 'ASC'}`
      break
    default:
      if (columns.includes(sortBy) && orderings.includes(orderBy)) {
        orderByClause = `ORDER BY "${sortBy}" ${orderBy.toUpperCase()}`
      }
  }

  const query: string = `
    SELECT 
      "id", 
      "fullName", 
      "email",
      "password",
      "phoneNumber",
      "role",
      "uuid",
      "createdAt",
      "updatedAt"
    FROM "users"
    WHERE "fullName" ILIKE $1
    ${orderByClause}
    LIMIT ${limit} OFFSET ${offset}
  `

  const values: string[] = [`%${search}%`]
  const result: QueryResult<IUser> = await db.query(query, values)
  return result.rows
}

export const findDetails = async (uuid: string, selectedColumns?: string[]): Promise<QueryResult<IUser>> => {
  const columns = [
    'id', 'fullName', 'email',
    'password', 'phoneNumber', 'role', 'uuid', 'createdAt'
  ]
  const selectColumns = selectedColumns || columns

  const query = `
        SELECT ${selectColumns.map(col => `"${col}" AS "${col}"`).join(', ')}
        FROM "users" 
        WHERE "uuid" = $1`
  const values: string[] = [uuid]
  const { rows } = await db.query<QueryResult<IUser>>(query, values)
  return rows[0]
}

export const insert = async (data: IUserBody): Promise<IUser> => {
  const columns: string[] = []
  const values: any[] = []
  for (const [key, value] of Object.entries(data)) {
    values.push(value)
    columns.push(`"${key}"`)
  }

  const insertedValues = values.map((_, index) => `$${index + 1}`).join(', ')

  const query = `
        INSERT INTO "users"
        (${columns.join(', ')})
        VALUES
        (${insertedValues})
        RETURNING *
    `

  const { rows } = await db.query<IUser>(query, values)
  return rows[0]
}

export const update = async (uuid: string, data: IUserBody): Promise<IUser> => {
  const columns: string[] = []
  const values: string[] = [uuid]
  for (const [key, value] of Object.entries(data)) {
    values.push(value)
    columns.push(`"${key}"=$${values.length}`)
  }

  const query = `
        UPDATE "users"
        SET ${columns.join(', ')},
        "updatedAt" = now()
        WHERE "uuid" = $1
        RETURNING *
    `

  const { rows } = await db.query<IUser>(query, values)
  return rows[0]
}

export const deleteUser = async (uuid: string): Promise<IUser> => {
  const query = `
        DELETE FROM "users"
        WHERE "uuid" = $1
        RETURNING *
    `

  const values = [uuid]
  const { rows } = await db.query<IUser>(query, values)
  return rows[0]
}