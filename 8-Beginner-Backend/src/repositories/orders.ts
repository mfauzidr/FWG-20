import { QueryResult } from "pg"
import db from "../config/pg"
import { IOrders, IOrdersBody } from "../models/orders"
import { IProductsBody } from "../models/products"

export const totalCount = async (): Promise<number> => {
  const columns: string[] = ["id", "orderNumber", "total", "createdAt"]
  const orderings: string[] = ["asc", "desc"]

  const query = `
    SELECT COUNT(*) as total
    FROM "orders"
  `

  const result: QueryResult<{ total: number }> = await db.query(query)
  return result.rows[0].total
}

export const findAll = async (page: number = 1,
  limit: number = 3): Promise<IOrders[]> => {
  const limitData: number = limit
  const offset: number = (page - 1) * limitData

  const query: string = `SELECT * FROM "orders"
  LIMIT ${limitData} OFFSET ${offset}
  `
  const result: QueryResult<IOrders> = await db.query(query)
  return result.rows
}

export const findDetails = async (uuid: string) => {
  const query: string = `SELECT * FROM "orders" WHERE "uuid" = $1`
  const values: string[] = [uuid]
  const { rows } = await db.query<QueryResult<IOrders>>(query, values)
  return rows[0]
}

export const insert = async (data: IOrdersBody): Promise<IOrders> => {
  const columns: string[] = []
  const values: any[] = []
  const productIds: number[] = Array.isArray(data.productId)
    ? data.productId
    : (data.productId as string).split(',').map(Number)

  for (const [key, value] of Object.entries(data)) {
    if (key !== 'productId') {
      values.push(value)
      columns.push(`"${key}"`)
    }
  }

  const productIdPlaceholders = productIds.map((_, index) => `$${values.length + index + 1}`).join(', ')

  const totalQuery = `(SELECT SUM("basePrice") FROM "products" WHERE "id" IN (${productIdPlaceholders}))`

  values.push(...productIds)

  const insertedValues = values.slice(0, columns.length).map((_, index) => `$${index + 1}`).join(', ')

  const query = `
    INSERT INTO "orders" ("orderNumber", ${columns.join(', ')}, "total")
    VALUES (generate_order_number(), ${insertedValues}, (${totalQuery}))
    RETURNING *
  `

  console.log('Product IDs:', productIds)
  console.log('Total Query:', totalQuery)
  console.log('Values:', values)
  console.log('Query:', query)

  const { rows } = await db.query(query, values)
  return rows[0]
}



export const update = async (uuid: string, data: IOrdersBody): Promise<IOrders> => {
  const columns: string[] = []
  const values: any[] = [uuid]

  for (const [key, value] of Object.entries(data)) {
    if (key !== 'productId') {
      values.push(value)
      columns.push(`"${key}"=$${values.length}`)
    }
    if (key === 'productId') {
      const totalValue = (value as string).split(',').map(Number)
      values.push(...totalValue)
      const totalPlaceholders = totalValue.map((_, index) => `$${values.length - totalValue.length + index + 1}`).join(', ')
      columns.push(`"total" = (SELECT SUM("basePrice") FROM "products" WHERE "id" IN (${totalPlaceholders}))`)
    }
  }

  const query = `
    UPDATE "orders"
    SET ${columns.join(', ')}
    WHERE "uuid" = $1
    RETURNING *
  `

  console.log('Values:', values)
  console.log('Query:', query)

  const { rows } = await db.query(query, values)
  return rows[0]
}





export const deleteOrder = async (uuid: string) => {
  const query = `DELETE FROM "orders" WHERE "uuid" = $1 RETURNING *`
  const values = [uuid]
  const { rows } = await db.query(query, values)
  return rows[0]
}
