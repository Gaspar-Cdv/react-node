import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import 'reflect-metadata'
import { HOSTNAME, PORT } from './config/environment'
import { errorHandler } from './middlewares/errorHandler'
import routes from './routes'

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', routes)
app.use(errorHandler)

app.listen(PORT, () => {
	console.info(`Server running at http://${HOSTNAME}:${PORT}/`)
})

export default app
