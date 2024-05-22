import { QueryResult } from "pg"
import db from "../config/pg"
import { IProducts, IProductsBody } from "../models/products"

export const totalCount = async (keyword: string = '', sortBy: string, orderBy: string): Promise<number> => {
  const columns: string[] = ["id", "name", "basePrice", "createdAt"]
  const orderings: string[] = ["asc", "desc"]

  sortBy = columns.includes(sortBy) ? sortBy : 'id'
  orderBy = orderings.includes(orderBy) ? orderBy : 'asc'

  const query = `
    SELECT COUNT(*) as total
    FROM "products"
    WHERE "name" ILIKE $1
  `
  const values: string[] = [`%${keyword}%`]

  const result: QueryResult<{ total: number }> = await db.query(query, values)
  return result.rows[0].total
}

export const findAll = async (
  keyword: string = '',
  sortBy: string = 'id',
  orderBy: string = 'asc',
  page: number = 1,
  limit: number = 6
): Promise<IProducts[]> => {
  const columns: string[] = ["id", "name", "basePrice", "createdAt"]
  const orderings: string[] = ["asc", "desc"]
  const limitData: number = limit
  const offset: number = (page - 1) * limitData

  let orderByClause: string = `ORDER BY "p"."id" ASC`

  switch (sortBy) {
    case 'A-Z':
      orderByClause = `ORDER BY "p"."name" ASC`
      break
    case 'Z-A':
      orderByClause = `ORDER BY "p"."name" DESC`
      break
    case 'oldest':
      orderByClause = `ORDER BY "p"."createdAt" ASC`
      break
    case 'newest':
      orderByClause = `ORDER BY "p"."createdAt" DESC`
      break
    case 'priciest':
      orderByClause = 'ORDER BY "p"."basePrice" DESC'
      break
    case 'cheapest':
      orderByClause = 'ORDER BY "p"."basePrice" ASC'
      break
    case 'category':
      orderByClause = `ORDER BY "c"."name" ${orderBy === 'desc' ? 'DESC' : 'ASC'}`
      break
    default:
      if (columns.includes(sortBy) && orderings.includes(orderBy)) {
        orderByClause = `ORDER BY "p"."${sortBy}" ${orderBy.toUpperCase()}`
      }
  }

  const query: string = `
    SELECT
      "p"."id",
      "p"."name" AS "productName",
      "c"."name" AS "category",
      "p"."description",
      "p"."basePrice",
      "p"."uuid",
      "p"."createdAt",
      "p"."updatedAt"
    FROM "products" "p"
    LEFT JOIN "productCategories" "pc" ON "pc"."productId" = "p"."id"
    LEFT JOIN "categories" "c" ON "pc"."categoryId" = "c"."id"
    WHERE "p"."name" ILIKE $1
    ${orderByClause}
    LIMIT ${limitData} OFFSET ${offset}
  `

  const values: string[] = [`%${keyword}%`]
  const result: QueryResult<IProducts> = await db.query(query, values)
  return result.rows
}

export const findDetails = async (
  uuid: string,
  selectedColumns?: string[]
): Promise<QueryResult<IProducts>> => {
  const columns: string[] = ["id", "name", "image", "description", "basePrice", "isRecommended", "uuid", "createdAt"]
  const selectColumns: string[] = selectedColumns || columns

  const query = `
    SELECT ${selectColumns.map(col => `"p"."${col}" AS "${col}"`).join(', ')},"c"."name" AS "category", "pr"."rate" AS "rating"
    FROM "products" "p"
    LEFT JOIN "productCategories" "pc" ON "p"."id" = "pc"."productId"
    LEFT JOIN "categories" "c" ON "pc"."categoryId" = "c"."id"
    LEFT JOIN "productRatings" "pr" ON "p"."id" = "pr"."productId"
    WHERE "p"."uuid" = $1
  `

  const values: string[] = [uuid]
  const { rows } = await db.query<QueryResult<IProducts>>(query, values)
  return rows[0]
}

export const insert = async (data: IProductsBody): Promise<IProducts> => {
  const columns: string[] = []
  const values: any[] = []

  for (const [key, value] of Object.entries(data)) {
    values.push(value)
    columns.push(`"${key}"`)
  }

  const insertedValues = values.map((_, index) => `$${index + 1}`).join(', ')

  const query = `
    INSERT INTO "products"
    (${columns.join(', ')})
    VALUES
    (${insertedValues})
    RETURNING *
  `

  const result: QueryResult<IProducts> = await db.query(query, values)
  return result.rows[0]
}

export const update = async (uuid: string, data: IProductsBody): Promise<IProducts> => {
  const columns: string[] = []
  const values: string[] = [uuid]
  for (const [key, value] of Object.entries(data)) {
    values.push(value)
    columns.push(`"${key}"=$${values.length}`)
  }

  const query = `
        UPDATE "products"
        SET ${columns.join(', ')},
        "updatedAt" = now()
        WHERE "uuid" = $1
        RETURNING *
    `

  const { rows } = await db.query<IProducts>(query, values)
  return rows[0]
}

export const deleteProduct = async (uuid: string): Promise<IProducts> => {
  const query = `
        DELETE FROM "products"
        WHERE "uuid" = $1
        RETURNING *
    `

  const values = [uuid]
  const { rows } = await db.query<IProducts>(query, values)
  return rows[0]
}
