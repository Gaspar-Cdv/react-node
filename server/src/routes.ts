import { Router } from 'express'
import authRoute from './routes/authRoute'
import userRoute from './routes/userRoute'
import { authenticated } from './middlewares/authenticated'

const router = Router()

router.use('/auth', authRoute)
router.use('/user', authenticated, userRoute)

export default router
