import { User } from '@prisma/client'
import { Language } from '@title/common/build/types/Language'
import { UserDto } from '@title/common/build/types/session'
import UserDao from '../dao/userDao'
import { Req, Res } from '../types/requestResponse'

const userDao = UserDao.getDao()

export default class UserService {

	static service: UserService

	/* PUBLIC */

	changeLanguage = async (req: Req<{ language: Language }>, res: Res<void>) => {
		const { body, userId } = req
		await userDao.updateLanguage(body.language, userId)
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

	static getService = () => {
		if (UserService.service == null) {
			UserService.service = new UserService()
		}

		return UserService.service
	}
}
