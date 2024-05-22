import { QueryResult } from "pg"
import db from "../config/pg"
import { IPromos, IPromosBody } from "../models/promos"

export const findAll = async (): Promise<IPromos[]> => {
  const sql = `SELECT * FROM "promos"`;
  const { rows }: QueryResult<IPromos> = await db.query(sql);
  return rows;
};

export const findDetails = async (id: number): Promise<IPromos | null> => {
  const sql = `SELECT * FROM "promos" WHERE "id" = $1`;
  const values = [id];
  const { rows }: QueryResult<IPromos> = await db.query(sql, values);
  return rows[0] || null;
};

export const insert = async (data: IPromosBody): Promise<IPromos> => {
  const columns: string[] = []
  const values: any[] = []

  for (const [key, value] of Object.entries(data)) {
    values.push(value)
    columns.push(`"${key}"`)
  }

  const insertedValues = values.map((_, index) => `$${index + 1}`).join(', ')

  const query = `
    INSERT INTO "promos"
    (${columns.join(', ')})
    VALUES
    (${insertedValues})
    RETURNING *
  `

  const result: QueryResult<IPromos> = await db.query(query, values)
  return result.rows[0]
};

export const update = async (id: number, data: IPromosBody): Promise<IPromos> => {
  const columns: string[] = []
  const values: any[] = [id]
  for (const [key, value] of Object.entries(data)) {
    values.push(value)
    columns.push(`"${key}"=$${values.length}`)
  }

  const query = `
        UPDATE "promos"
        SET ${columns.join(', ')},
        "updatedAt" = now()
        WHERE "id" = $1
        RETURNING *
    `

  const { rows } = await db.query<IPromos>(query, values)
  return rows[0]
}

export const deletePromo = async (id: number): Promise<IPromos | null> => {
  const sql = `
    DELETE FROM "promos"
    WHERE "id" = $1
    RETURNING *
  `;
  const values = [id];
  const { rows }: QueryResult<IPromos> = await db.query(sql, values);
  return rows[0] || null;
};