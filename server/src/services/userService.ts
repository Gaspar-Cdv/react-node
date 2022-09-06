import { User } from '@prisma/client'
import { changePasswordValidationSchema, updateUserValidationSchema } from '@title/common/build/services/validation'
import { ErrorMessage } from '@title/common/build/types/ErrorMessage'
import { Language } from '@title/common/build/types/Language'
import { ChangePasswordRequest, UpdateUserRequest } from '@title/common/build/types/requests/user'
import { UserDto } from '@title/common/build/types/session'
import userDao from '../dao/userDao'
import { UnprocessableEntityError } from '../types/errors'
import { Req, Res } from '../types/requestResponse'
import assertionService from './assertionService'
import authService from './authService'

class UserService {

	static instance: UserService

	/* PUBLIC */

	updateUser = async (req: Req<UpdateUserRequest>, res: Res) => {
		const { body, userId } = req

		try {
			updateUserValidationSchema.validateSync(body)
		} catch (e) {
			throw new UnprocessableEntityError(ErrorMessage.INVALID_VALUES)
		}

		const user = await userDao.findById(userId!)

		const { username, email } = body

		if (user!.username !== username) {
			assertionService.assertNull(await userDao.findByUsername(username), ErrorMessage.USERNAME_ALREADY_USED)
			user!.username = username
		}

		if (user!.email !== email) {
			assertionService.assertNull(await userDao.findByEmail(email), ErrorMessage.EMAIL_ALREADY_USED)
			user!.email = email
		}

		await userDao.updateUser(user!)

		res.sendStatus(200)
	}

	changePassword = async (req: Req<ChangePasswordRequest>, res: Res) => {
		const { body, userId } = req
		const { oldPassword, password } = body

		try {
			changePasswordValidationSchema.validateSync(body)
		} catch (e) {
			throw new UnprocessableEntityError(ErrorMessage.INVALID_VALUES)
		}

		const user = await userDao.findById(userId!)

		assertionService.assertTrue(await authService.isPasswordValid(oldPassword, user!.password), ErrorMessage.INVALID_PASSWORD)
		const newPassword = await authService.hashPassword(password)

		await userDao.updatePassword(newPassword, userId!)

		res.sendStatus(200)
	}

	changeLanguage = async (req: Req<{ language: Language }>, res: Res<void>) => {
		const { body, userId } = req
		await userDao.updateLanguage(body.language, userId!)
		res.sendStatus(200)
	}

	/* PRIVATE */

	createUserDto = (user: User): UserDto => {
		const { userId, username, email } = user

		const userDto: UserDto = {
			userId,
			username,
			email
		}

		return userDto
	}

	/* STATIC */

	static getInstance = () => {
		if (UserService.instance == null) {
			UserService.instance = new UserService()
		}

		return UserService.instance
	}
}

export default UserService.getInstance()
