import { Router } from "express"
import { getAllUsers, getDetailUser, createUsers, updateUsers, deleteUsers } from "../handlers/users"

const usersRouter = Router()

usersRouter.get('/', getAllUsers)

usersRouter.get('/:uuid', getDetailUser)

usersRouter.post('/', createUsers)

usersRouter.patch('/:uuid', updateUsers)

usersRouter.delete('/:uuid', deleteUsers)

export default usersRouter