import { Router } from "express"
import { createPromos, getAllPromos, getDetailPromos, updatePromos, deletePromos } from "../handlers/promos"

const promosRouter = Router()

promosRouter.get('/', getAllPromos)

promosRouter.get('/:id', getDetailPromos)

promosRouter.post('/', createPromos)

promosRouter.patch('/:id', updatePromos)

promosRouter.delete('/:id', deletePromos)

export default promosRouter