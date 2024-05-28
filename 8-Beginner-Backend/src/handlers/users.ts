import { Request, Response } from 'express'
import { findAllUsers, findDetails, insert, update, deleteUser, totalCount } from "../repositories/users"
import { IUserParams, IUserBody, IUserQueryParams } from '../models/users'
import { IErrResponse, IUserResponse } from '../models/response'
import paginLink from '../helper/paginLink'

export const getAllUsers = async (req: Request<{}, {}, {}, IUserQueryParams>, res: Response<IUserResponse>) => {
  try {

    const users = await findAllUsers(req.query);
    if (users.length < 1) {
      throw new Error('no_data');
    }
    const limitData = req.query.limit || 5
    const count = await totalCount(req.query);
    const currentPage = parseInt((req.query.page as string) || '1');
    const totalData = count
    const totalPage = Math.ceil(totalData / limitData);

    return res.json({
      meta: {
        totalData,
        totalPage,
        currentPage,
        nextPage: currentPage != totalPage ? paginLink(req, "next") : null,
        prevPage: currentPage > 1 ? paginLink(req, "previous") : null,
      },
      message: `List all users. ${count} data found`,
      results: users
    });
  } catch (error) {
    const err = error as IErrResponse
    if (err.message === 'no_data') {
      return res.status(404).json({
        success: false,
        message: 'Data not found'
      });
    }

    console.log(err);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};


export const getDetailUser = async (req: Request, res: Response<IUserResponse>): Promise<Response> => {
  const { uuid } = req.params;
  try {
    const user = await findDetails(uuid as string);
    if (user) {
      return res.json({
        success: true,
        message: 'OK',
        results: user
      });
    }
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  } catch (error) {
    const err = error as IErrResponse

    if (err.code === "22P02") {
      return res.status(400).json({
        success: false,
        message: 'Invalid UUID format.'
      });
    }

    console.log(JSON.stringify(err));
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const createUsers = async (req: Request<{}, {}, IUserBody>, res: Response<IUserResponse>): Promise<Response> => {
  try {
    const user = await insert(req.body)
    if (!req.body.fullName || !req.body.email || !req.body.password) {
      const missingFields = [];
      if (!req.body.fullName) missingFields.push('fullName');
      if (!req.body.email) missingFields.push('email');
      if (!req.body.password) missingFields.push('password');

      return res.status(400).json({
        success: false,
        message: `${missingFields.join(', ')} cannot be empty`
      })
    }
    return res.json({
      success: true,
      message: 'Create user successfully',
      results: user
    })
  } catch (error) {
    const err = error as IErrResponse
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

export const updateUsers = async (req: Request<IUserParams, {}, IUserBody>, res: Response<IUserResponse>): Promise<Response> => {
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
    const err = error as IErrResponse

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

export const deleteUsers = async (req: Request<IUserParams>, res: Response<IUserResponse>): Promise<Response> => {
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
    const err = error as IErrResponse

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