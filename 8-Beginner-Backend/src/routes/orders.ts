import { Router } from "express"
import { createOrders, deleteOrders, getAllOrders, getDetailOrders, updateOrders } from "../handlers/orders"

const ordersRouter = Router()

ordersRouter.get('/', getAllOrders)

ordersRouter.get('/:uuid', getDetailOrders)

ordersRouter.post('/', createOrders)

ordersRouter.patch('/:uuid', updateOrders)

ordersRouter.delete('/:uuid', deleteOrders)

export default ordersRouter