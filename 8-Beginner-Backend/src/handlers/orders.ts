import { Request, Response } from 'express'
import { findAll, findDetails, insert, update, deleteOrder, totalCount } from "../repositories/orders"
import { IOrders, IOrdersBody, IOrdersParams, IOrdersQueryParams } from "../models/orders"

export const getAllOrders = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {
      page = '1',
      limit = '6'
    } = req.query as IOrdersQueryParams

    const pageNum: number = parseInt(page, 10) || 1
    const limitNum: number = parseInt(limit, 10)

    const orders = await findAll(pageNum, limitNum);
    if (orders.length < 1) {
      throw new Error('no_data')
    }
    const count: number = await totalCount()

    const totalPage = Math.ceil(count / limitNum)
    const nextPage = pageNum + 1
    const prevPage = pageNum - 1

    return res.json({
      success: true,
      message: 'List all orders',
      pageInfo: {
        totalData: count,
        currentPage: pageNum,
        totalPage,
        nextPage: nextPage <= totalPage ? nextPage : null,
        prevPage: prevPage > 0 ? prevPage : null
      },
      results: orders,
    });
  } catch (error) {
    const err = error as { code?: string; column?: string; detail?: string; message: string }
    if (err.message === 'no_data') {
      return res.status(404).json({
        success: false,
        message: 'Data not found'
      })
    }

    console.error(err);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

export const getDetailOrders = async (req: Request<IOrdersParams>, res: Response): Promise<Response> => {
  const { uuid } = req.params;
  console.log(uuid)
  try {
    const orders = await findDetails(uuid);

    if (orders) {
      return res.json({
        success: true,
        message: 'OK',
        results: orders,
      });
    }
    return res.status(404).json({
      success: false,
      message: 'Order not found',
    });

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
};

export const createOrders = async (req: Request<{}, {}, IOrdersBody>, res: Response): Promise<Response> => {
  try {
    const orders: IOrdersBody = await insert(req.body);
    return res.json({
      success: true,
      message: 'Create order successfully',
      results: orders,
    });
  } catch (error) {
    const err = error as { code?: string; column?: string; detail?: string; message: string }
    if (err.code === '23502') {
      return res.status(400).json({
        success: false,
        message: `${err.column} Cannot be empty`,
      });
    }

    console.log(err);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};


export const updateOrders = async (req: Request<IOrdersParams, IOrdersBody>, res: Response): Promise<Response> => {
  const { uuid } = req.params
  const data = {
    ...req.body
  }
  try {
    const orders = await update(uuid, data);
    if (!orders) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }
    return res.json({
      success: true,
      message: 'Update Success',
      results: orders,
    });
  } catch (error) {
    const err = error as { code?: string; column?: string; detail?: string; message: string }
    console.error(err)
    if (err.code === "22P02") {
      return res.status(400).json({
        success: false,
        message: `Invalid UUID format.`
      })
    }

    console.error(err);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

export const deleteOrders = async (req: Request<IOrdersParams, IOrdersBody>, res: Response): Promise<Response> => {
  const { uuid } = req.params

  try {
    const order = await deleteOrder(uuid)

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      })
    }

    return res.json({
      success: true,
      message: 'Delete success',
      results: order,
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