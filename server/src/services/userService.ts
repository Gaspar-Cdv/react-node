import { User } from '@prisma/client'
import { changePasswordValidationSchema, updateUserValidationSchema } from '@title/common/build/services/validation'
import { ErrorMessage } from '@title/common/build/types/ErrorMessage'
import { Language } from '@title/common/build/types/Language'
import { ChangePasswordRequest, UpdateUserRequest } from '@title/common/build/types/requests/user'
import { UserDto } from '@title/common/build/types/session'
import userDao from '../dao/userDao'
import { UnprocessableEntityError } from '../types/errors'
import assertionService from './assertionService'
import authService from './authService'

class UserService {

	static instance: UserService

	/* PUBLIC */

	updateUser = async (body: UpdateUserRequest, userId?: number) => {
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
	}

	changePassword = async (body: ChangePasswordRequest, userId?: number) => {
		try {
			changePasswordValidationSchema.validateSync(body)
		} catch (e) {
			throw new UnprocessableEntityError(ErrorMessage.INVALID_VALUES)
		}

		const user = await userDao.findById(userId!)
		const { password, oldPassword } = body

		assertionService.assertTrue(await authService.isPasswordValid(oldPassword, user!.password), ErrorMessage.INVALID_PASSWORD)
		const newPassword = await authService.hashPassword(password)

		await userDao.updatePassword(newPassword, userId!)
	}

	changeLanguage = async (language: Language, userId?: number) => {
		if (language == null || !Object.keys(Language).includes(language)) {
			throw new UnprocessableEntityError(ErrorMessage.INVALID_VALUES)
		}

		await userDao.updateLanguage(language, userId!)
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
