import { Request, Response } from 'express'
import { findAll, findDetails, insert, totalCount, update, deleteProduct } from "../repositories/products"
import { IProducts, IProductsBody, IProductsParams, IProductsQueryParams } from "../models/products"
import { IErrResponse, IProductsResponse } from '../models/response'
import paginLink from '../helper/paginLink'
import multer from 'multer'

export const getAllProducts = async (req: Request<{}, {}, {}, IProductsQueryParams>, res: Response<IProductsResponse>) => {
  try {

    const products = await findAll(req.query)
    if (products.length < 1) {
      throw new Error('no_data')
    }
    const limitData = req.query.limit || 6
    const count = await totalCount(req.query)
    const currentPage = parseInt((req.query.page as string) || '1');
    const totalData = count
    const totalPage = Math.ceil(totalData / limitData);
    console.log(totalPage)
    return res.status(200).json({
      meta: {
        totalData,
        totalPage,
        currentPage,
        nextPage: currentPage != totalPage ? paginLink(req, "next") : null,
        prevPage: currentPage > 1 ? paginLink(req, "previous") : null,
      },
      message: `List all products. ${count} data found`,
      results: products,
    })

  } catch (error) {
    const err = error as IErrResponse
    if (err.message === 'no_data') {
      return res.status(404).json({
        success: false,
        message: 'Data not found'
      })
    }

    console.log(err)
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    })
  }
}
export const getDetailProduct = async (req: Request<IProducts>, res: Response): Promise<Response> => {
  const { uuid } = req.params
  const { columns } = req.query
  const selectedColumns = columns ? (columns as string).split(',') : undefined

  try {
    const product = await findDetails(uuid, selectedColumns)
    if (product) {
      return res.json({
        success: true,
        message: 'OK',
        results: product,
      })
    }
    return res.status(404).json({
      success: false,
      message: 'Product not found',
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
      message: 'Internal server error',
    })
  }
}

export const createProduct = async (req: Request<{}, {}, IProductsBody>, res: Response<IProductsResponse>): Promise<Response> => {
  try {
    if (req.file) {
      const imgUrl = `/imgs/${req.file.path}`
      req.body.image = imgUrl;
    }
    const product = await insert(req.body)

    return res.json({
      success: true,
      message: 'Create product successfully',
      results: product,
    })

  } catch (error) {
    const err = error as IErrResponse
    if (err.code === '23502') {
      return res.status(400).json({
        success: false,
        message: `${err.column} Cannot be empty`,
      })
    }

    console.log(JSON.stringify(err))
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
}

export const updateProduct = async (req: Request, res: Response<IProductsResponse>): Promise<Response> => {
  const { uuid } = req.params
  try {
    const data: Partial<IProductsBody> = {
      ...req.body
    }
    console.log(req.body)

    if (req.file) {
      const imgUrl = `/imgs/${req.file.filename}`
      data.image = imgUrl;
    }
    const product = await update(uuid, data)
    if (product) {
      return res.json({
        success: true,
        message: 'Update Success',
        results: product
      })
    }
    return res.status(404).json({
      success: false,
      message: 'Products not found'
    })
  } catch (error) {
    const err = error as IErrResponse

    if (err instanceof multer.MulterError) {
      if (err.message === 'Incorrect File') {
        return res.status(400).json({
          success: false,
          message: 'Incorrect file type. Only jpg, png, and jpeg are allowed.'
        });
      }
    }

    if (err.message === 'File too large') {
      return res.status(400).json({
        success: false,
        message: 'File is too large. Maximum size is 1MB.'
      });
    }
    if (err.code === "22P02") {
      return res.status(400).json({
        success: false,
        message: `Invalid UUID format.`
      })
    }

    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

export const deleteProducts = async (req: Request<IProductsParams, IProductsBody>, res: Response): Promise<Response> => {
  const { uuid } = req.params

  try {
    const product = await deleteProduct(uuid)

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      })
    }

    return res.json({
      success: true,
      message: 'Delete success',
      results: product,
    })
  } catch (error) {
    const err = error as IErrResponse

    if (err.code === "22P02") {
      return res.status(400).json({
        success: false,
        message: `Invalid UUID format.`
      })
    }

    console.error(JSON.stringify(error))
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
};