import { Router } from 'express'
import AuthService from '../services/authService'

const authService = AuthService.getService()
const router = Router()

router.post('/register', authService.register)
router.post('/login', authService.login)

export default router
