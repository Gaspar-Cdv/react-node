import { User } from '@prisma/client'
import { Language } from '@title/common/build/types/Language'
import { prisma } from '../prisma'

class UserDao {

	static dao: UserDao

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

	/* STATIC */

	static getInstance = () => {
		if (UserDao.dao == null) {
			UserDao.dao = new UserDao()
		}

		return UserDao.dao
	}
}

export default UserDao.getInstance()
