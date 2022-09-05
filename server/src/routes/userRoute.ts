import { Router } from 'express'
import { authenticated } from '../middlewares/authenticated'
import UserService from '../services/userService'

const userService = UserService.getService()
const router = Router()

router.post('changeLanguage', authenticated, userService.changeLanguage)

export default router
