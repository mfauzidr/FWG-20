import { ParamsDictionary } from "express-serve-static-core"
import { IProductsParams, IProductsQueryParams } from "./products"

export type AppParams = ParamsDictionary | IProductsParams
export type QueryParams = IProductsQueryParams