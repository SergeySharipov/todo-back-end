import 'dotenv/config'
import express from 'express'
import routes from './routes'
import { requestLogger } from './middlewares/index'
import { connectToDatabase } from './utils/db'

const app = express()

// application/json
app.use(express.json())
// application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

app.use(requestLogger)

app.use(routes.authRoutes)
app.use(routes.taskRoutes)
app.use(routes.categoryRoutes)

const start = async () => {
  await connectToDatabase()
}

start()

export default app
