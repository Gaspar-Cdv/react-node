import { ForgotPasswordRequest, ResetPasswordRequest, TokenRequest } from '@title/common/build/types/requests/auth'
import { Response, Router } from 'express'
import 'express-async-errors'
import { authenticated } from '../middlewares/authenticated'
import tokenService from '../services/tokenService'
import { Req } from '../types/requestResponse'

const router = Router()

router.post('/forgotPassword', async ({ body }: Req<ForgotPasswordRequest>, res: Response) => {
	await tokenService.forgotPassword(body.email)
	res.sendStatus(204)
})

router.post('/findResetPasswordToken', async ({ body }: Req<TokenRequest>, res: Response) => {
	await tokenService.findResetPasswordToken(body.token)
	res.sendStatus(200)
})

router.post('/resetPassword', async ({ body }: Req<ResetPasswordRequest>, res: Response) => {
	await tokenService.resetPassword(body)
	res.sendStatus(200)
})

router.post('/verifyEmail', async ({ body }: Req<TokenRequest>, res: Response) => {
	await tokenService.verifyEmail(body.token)
	res.sendStatus(200)
})

router.post('/resendVerificationMail', authenticated, async ({ userId }: Req, res: Response) => {
	await tokenService.resendVerificationMail(userId!)
	res.sendStatus(200)
})

export default router
