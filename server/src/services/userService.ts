import { User } from '@prisma/client'
import { Language } from '@title/common/build/types/Language'
import { UserDto } from '@title/common/build/types/session'
import { prisma } from '../prisma'
import { Req, Res } from '../types/requestResponse'

export default class UserService {

	static service: UserService

	/* PUBLIC */

	changeLanguage = async (req: Req<{ language: Language }>, res: Res<void>) => {
		const { body, userId } = req
		await this.updateLanguage(body.language, userId)
		res.sendStatus(200)
	}

	/* PRIVATE */

	findById = async (userId: number): Promise<User | null> => {
		return prisma.user.findFirst({ where: { userId } })
	}

	findByUsername = async (username: string): Promise<User | null> => {
		return prisma.user.findFirst({ where: { username } })
	}

	findByEmail = async (email: string): Promise<User | null> => {
		return prisma.user.findFirst({ where: { email } })
	}

	updateLanguage = async (language: Language, userId?: number) => {
		await prisma.user.update({
			where: { userId },
			data: { language }
		})
	}

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
