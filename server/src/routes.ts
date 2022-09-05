import { Router } from 'express'
import authRoute from './routes/authRoute'
import userRoute from './routes/userRoute'

const router = Router()

router.use('/auth', authRoute)
router.use('/user', userRoute)

export default router
