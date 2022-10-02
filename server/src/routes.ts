import { Router } from 'express'
import authRoute from './routes/authRoute'
import tokenRoute from './routes/tokenRoute'
import userRoute from './routes/userRoute'
import imageRoute from './routes/imageRoute'
import { authenticated } from './middlewares/authenticated'

const router = Router()

router.use('/auth', authRoute)
router.use('/token', tokenRoute)
router.use('/user', authenticated, userRoute)
router.use('/image', imageRoute)

export default router
