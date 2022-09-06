import { User } from '@prisma/client'
import { Language } from '@title/common/build/types/Language'
import { UserDto } from '@title/common/build/types/session'
import userDao from '../dao/userDao'
import { Req, Res } from '../types/requestResponse'

class UserService {

	static instance: UserService

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

	static getInstance = () => {
		if (UserService.instance == null) {
			UserService.instance = new UserService()
		}

		return UserService.instance
	}
}

export default UserService.getInstance()
