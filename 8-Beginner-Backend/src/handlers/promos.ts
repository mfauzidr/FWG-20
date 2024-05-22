import { Request, Response } from 'express'
import { findAll, findDetails, insert, update, deletePromo } from "../repositories/promos"
import { IPromos, IPromosBody, IPromosParams, } from "../models/promos"

export const getAllPromos = async (req: Request, res: Response): Promise<Response> => {
  try {
    const promos: IPromos[] = await findAll();
    return res.json({
      success: true,
      message: 'List all promos',
      results: promos
    });
  } catch (error) {
    const err = error as { code?: string; column?: string; detail?: string; message: string }
    console.error(JSON.stringify(error));
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

export const getDetailPromos = async (req: Request<IPromos>, res: Response): Promise<Response> => {
  const { id } = req.params;
  try {
    const promo = await findDetails(id);

    if (!promo) {
      return res.status(404).json({
        success: false,
        message: 'Promo not found'
      });
    }

    return res.json({
      success: true,
      message: 'OK',
      results: promo
    });
  } catch (error) {
    const err = error as { code?: string; column?: string; detail?: string; message: string }

    console.error(JSON.stringify(error));
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

export const createPromos = async (req: Request, res: Response): Promise<Response> => {
  try {
    const promo: IPromos = await insert(req.body);
    return res.json({
      success: true,
      message: 'Create promo successfully',
      results: promo
    });
  } catch (error) {
    const err = error as { code?: string; column?: string; detail?: string; message: string }
    console.error(JSON.stringify(error));
    if (err.code === "23502") {
      return res.status(400).json({
        success: false,
        message: `${err.column} cannot be empty`
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

export const updatePromos = async (req: Request<IPromosParams, IPromosBody>, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const data = {
      ...req.body
    }
    const promo = await update(id, data)

    if (!promo) {
      return res.status(404).json({
        success: false,
        message: 'Promo not found'
      });
    }

    return res.json({
      success: true,
      message: 'OK',
      results: promo
    });
  } catch (error) {
    const err = error as { code?: string; column?: string; detail?: string; message: string }

    console.error(JSON.stringify(error));
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

export const deletePromos = async (req: Request<IPromosParams, IPromosBody>, res: Response): Promise<Response> => {
  const { id } = req.params;
  try {
    const promo = await deletePromo(id);

    if (!promo) {
      return res.status(404).json({
        success: false,
        message: 'Promo not found'
      });
    }

    return res.json({
      success: true,
      message: 'Delete success',
      results: promo
    });
  } catch (error) {
    const err = error as { code?: string; column?: string; detail?: string; message: string }

    console.error(JSON.stringify(error));
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};