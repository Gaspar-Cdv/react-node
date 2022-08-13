import { Router } from 'express'
import authRoute from './routes/authRoute'

const router = Router()

router.use('/auth', authRoute)

export default router
