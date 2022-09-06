import { Router } from 'express'
import 'express-async-errors'
import userService from '../services/userService'

const router = Router()

router.post('/updateUser', userService.updateUser)
router.post('/changePassword', userService.changePassword)
router.post('/changeLanguage', userService.changeLanguage)

export default router
