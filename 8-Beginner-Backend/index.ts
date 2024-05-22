import express, { Request, Response } from 'express'
import * as dotenv from "dotenv"
import router from './src/routes'

dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/", (req: Request, res: Response) => res.json({
  success: true,
  message: "Backend is running well",
}))

app.use(router)

const PORT = process.env.PORT || 8888

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
});
