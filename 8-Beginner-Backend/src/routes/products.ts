import { Router } from "express"
import { createProduct, deleteProducts, getAllProducts, getDetailProduct, updateProduct, } from "../handlers/products"


const productsRouter = Router()

productsRouter.get('/', getAllProducts)

productsRouter.get('/:uuid', getDetailProduct)

productsRouter.post('/', createProduct)

productsRouter.patch('/:uuid', updateProduct)

productsRouter.delete('/:uuid', deleteProducts)

export default productsRouter