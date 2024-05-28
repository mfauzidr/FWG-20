import { IOrders } from "./orders";
import { IProducts } from "./products";
import { IUser } from "./users";

interface IPaginationMeta {
  totalData?: number
  currentPage?: number
  totalPage?: number
  nextPage: string | null
  prevPage: string | null
}

interface IBasicResponse {
  success?: boolean
  message: string
  err?: string
  meta?: IPaginationMeta
}

export interface IUserResponse extends IBasicResponse {
  results?: IUser[]
}

export interface IProductsResponse extends IBasicResponse {
  results?: IProducts[]
}

export interface IOrderResponse extends IBasicResponse {
  results?: IOrders[]
}

export interface IErrResponse {
  code?: string
  column?: string
  detail?: string
  message?: string
}