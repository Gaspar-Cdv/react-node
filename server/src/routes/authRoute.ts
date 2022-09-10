import { LoginRequest, LoginResponse, RegisterRequest } from '@title/common/build/types/requests/auth'
import { Session } from '@title/common/build/types/session'
import { Response, Router } from 'express'
import 'express-async-errors'
import authService from '../services/authService'
import { Req, Res } from '../types/requestResponse'

const router = Router()

router.post('/register', async ({ body }: Req<RegisterRequest>, res: Response) => {
	await authService.register(body)
	res.sendStatus(201)
})

router.post('/login', async ({ body }: Req<LoginRequest>, res: Res<LoginResponse>) => {
	const { token, session } = await authService.login(body)
	res.status(200).json({ token, session })
})

router.post('/findSession', async (req: Req<void>, res: Res<Session>) => {
	const session = await authService.findSession(req)

	if (session != null) {
		res.status(200).json(session)
	} else {
		res.sendStatus(204)
	}
})

export default router
