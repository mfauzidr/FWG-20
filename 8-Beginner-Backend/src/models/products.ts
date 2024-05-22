export interface IProducts extends IProductsBody {
  id: number
  uuid: string
  category?: string
  image?: string
  discount?: string
  isRecommended?: boolean
  rating?: number
  createdAt: Date
  updatedAt: Date
}

export interface IProductsParams {
  uuid: string
}

export interface IProductsQueryParams {
  search?: string
  sortBy?: string
  orderBy?: string
  page?: string
  limit?: string
}

export interface IProductsBody {
  name: string
  description: string
  basePrice: number
}
