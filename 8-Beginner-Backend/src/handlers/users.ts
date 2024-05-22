import { Request, Response } from 'express'
import { findAllUsers, findDetails, insert, update, deleteUser, totalCount } from "../repositories/users"
import { IUserParams, IUserBody, IUserQueryParams, IUser } from '../models/users'

export const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {
      search = '',
      sortBy = 'id',
      orderBy = 'asc',
      page = '1'
    } = req.query as IUserQueryParams

    const pageNum: number = parseInt(page, 10) || 1

    const users = await findAllUsers(search, sortBy, orderBy, pageNum)
    if (users.length < 1) {
      throw new Error('no_data')
    }
    const count = await totalCount(search)

    return res.json({
      success: true,
      message: `List all users - ${count} data found.`,
      results: users
    })
  } catch (error) {
    const err = error as { code?: string; column?: string; detail?: string; message: string }
    if (err.message === 'no_data') {
      return res.status(404).json({
        success: false,
        message: 'Data not found'
      })
    }

    console.log(JSON.stringify(err))
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    })
  }
}

export const getDetailUser = async (req: Request<IUser>, res: Response): Promise<Response> => {
  const { uuid } = req.params
  const { columns } = req.query
  const selectedColumns = columns ? (columns as string).split(',') : undefined
  try {
    const user = await findDetails(uuid, selectedColumns)
    if (user) {
      return res.json({
        success: true,
        message: 'OK',
        results: user
      })
    }
    return res.status(404).json({
      success: false,
      message: 'User not found'
    })
  } catch (error) {
    const err = error as { code?: string; column?: string; detail?: string; message: string }

    if (err.code === "22P02") {
      return res.status(400).json({
        success: false,
        message: `Invalid UUID format.`
      })
    }

    console.log(JSON.stringify(err))
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

export const createUsers = async (req: Request<{}, {}, IUserBody>, res: Response): Promise<Response> => {
  try {
    const user = await insert(req.body)
    return res.json({
      success: true,
      message: 'Create user successfully',
      results: user
    })
  } catch (error) {
    const err = error as { code?: string; column?: string; detail?: string; message: string }
    if (err.code === "23502") {
      return res.status(400).json({
        success: false,
        message: `${err.column} Cannot be empty`
      })
    }
    if (err.code === "23505") {
      const errDetails = err.detail?.match(/\((.*?)\)=\((.*?)\)/)
      const column = errDetails ? errDetails[1] : 'field'

      return res.status(400).json({
        success: false,
        message: `${column} already exist.`
      })
    }

    console.log(JSON.stringify(err))
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

export const updateUsers = async (req: Request<IUserParams, IUserBody>, res: Response): Promise<Response> => {
  const { uuid } = req.params
  try {
    const data = {
      ...req.body
    }
    const user = await update(uuid, data)
    if (user) {
      return res.json({
        success: true,
        message: 'Update user successfully',
        results: user
      })
    }
    return res.status(404).json({
      success: false,
      message: 'Users not found',
    })
  } catch (error) {
    const err = error as { code?: string; column?: string; detail?: string; message: string }

    if (err.code === "22P02") {
      return res.status(400).json({
        success: false,
        message: `Invalid UUID format.`
      })
    }

    if (err.code === "23505") {
      const errDetails = err.detail?.match(/\((.*?)\)=\((.*?)\)/)
      const column = errDetails ? errDetails[1] : 'field'

      return res.status(400).json({
        success: false,
        message: `${column} already exist.`
      })
    }

    console.log(JSON.stringify(err))
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

export const deleteUsers = async (req: Request<IUserParams, IUserBody>, res: Response): Promise<Response> => {
  const { uuid } = req.params
  try {
    const user = await deleteUser(uuid)
    if (user) {
      return res.json({
        success: true,
        message: 'User Deleted Successfully',
        results: user
      })
    }

    return res.status(404).json({
      success: false,
      message: 'User not found'
    })
  } catch (error) {
    const err = error as { code?: string; column?: string; detail?: string; message: string }

    if (err.code === "22P02") {
      return res.status(400).json({
        success: false,
        message: `Invalid UUID format.`
      })
    }

    console.log(JSON.stringify(err))
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}