import { Router } from 'express'
import authRoute from './routes/authRoute'
import tokenRoute from './routes/tokenRoute'
import userRoute from './routes/userRoute'
import { authenticated } from './middlewares/authenticated'

const router = Router()

router.use('/auth', authRoute)
router.use('/token', tokenRoute)
router.use('/user', authenticated, userRoute)

export default router
