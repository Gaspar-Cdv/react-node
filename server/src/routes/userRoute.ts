import { Router } from 'express'
import 'express-async-errors'
import UserService from '../services/userService'

const userService = UserService.getService()
const router = Router()

router.post('/changeLanguage', userService.changeLanguage)

export default router
