export interface IUser extends IUserBody {
  id: number;
  uuid: string;
  address?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface IUserParams {
  uuid: string;
}

export interface IUserQueryParams {
  search?: string;
  findBy?: string;
  orderBy?: string;
  page?: string;
  limit?: number
}

export interface IUserBody {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: string;
}
