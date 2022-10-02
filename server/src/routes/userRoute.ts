import { ChangeLanguageRequest, ChangePasswordRequest, UpdateUserRequest } from '@title/common/build/types/requests/user'
import { UserDto } from '@title/common/build/types/session'
import { Router } from 'express'
import 'express-async-errors'
import userService from '../services/userService'
import { Req, Res } from '../types/requestResponse'

const router = Router()

router.post('/updateUser', async ({ body, userId }: Req<UpdateUserRequest>, res: Res<UserDto>) => {
	const user = await userService.updateUser(body, userId!)
	res.status(200).json(user)
})

router.post('/changePassword', async ({ body, userId }: Req<ChangePasswordRequest>, res: Res<void>) => {
	await userService.changePassword(body, userId!)
	res.sendStatus(200)
})

router.post('/changeLanguage', async ({ body, userId }: Req<ChangeLanguageRequest>, res: Res<void>) => {
	await userService.changeLanguage(body.language, userId!)
	res.sendStatus(200)
})

export default router
