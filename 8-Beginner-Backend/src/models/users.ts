export interface IUser extends IUserBody {
  id: number
  uuid: string
  createdAt: Date
  updatedAt?: Date
}

export interface IUserParams {
  uuid: string
}

export interface IUserQueryParams {
  search?: string
  sortBy?: string
  orderBy?: string
  page?: string
}

export interface IUserBody {
  fullName: string
  email: string
  password: string
  phoneNumber: string
  role: string
}