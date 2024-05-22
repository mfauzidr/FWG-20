import { Request, Response } from 'express'
import { findAll, findDetails, insert, totalCount, update, deleteProduct } from "../repositories/products"
import { IProducts, IProductsBody, IProductsParams, IProductsQueryParams } from "../models/products"

export const getAllProducts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {
      search = '',
      sortBy = 'id',
      orderBy = 'asc',
      page = '1',
      limit = '6'
    } = req.query as IProductsQueryParams

    const pageNum: number = parseInt(page, 10) || 1
    const limitNum: number = parseInt(limit, 10)

    const products = await findAll(search, sortBy, orderBy, pageNum, limitNum)
    if (products.length < 1) {
      throw new Error('no_data')
    }
    const count: number = await totalCount(search, sortBy, orderBy)

    const totalPage = Math.ceil(count / limitNum)
    const nextPage = pageNum + 1
    const prevPage = pageNum - 1

    return res.json({
      success: true,
      message: `List all products - ${count} products found`,
      pageInfo: {
        totalData: count,
        currentPage: pageNum,
        totalPage,
        nextPage: nextPage <= totalPage ? nextPage : null,
        prevPage: prevPage > 0 ? prevPage : null
      },
      results: products
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
      message: 'Internal server error',
    })
  }
}

export const createProduct = async (req: Request<{}, {}, IProductsBody>, res: Response): Promise<Response> => {
  try {
    const product: IProductsBody = await insert(req.body)

    return res.json({
      success: true,
      message: 'Create product successfully',
      results: product,
    })

  } catch (error) {
    const err = error as { code?: string; column?: string; detail?: string; message: string }
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

export const updateProduct = async (req: Request<IProductsParams, IProductsBody>, res: Response): Promise<Response> => {
  try {
    const { uuid } = req.params
    const data = {
      ...req.body
    }
    const product = await update(uuid, data)
    if (product) {
      return res.json({
        success: true,
        message: 'Update Success',
        results: product,
      })
    }
    return res.status(404).json({
      success: false,
      message: 'Products not found',
    })
  } catch (error) {
    const err = error as { code?: string; column?: string; detail?: string; message: string }

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
    const err = error as { code?: string; column?: string; detail?: string; message: string }

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