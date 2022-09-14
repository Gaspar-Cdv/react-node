import { User } from '@prisma/client'
import { Language } from '@title/common/build/types/Language'
import { prisma } from '../prisma'

class UserDao {

	static instance: UserDao

	insert = async (data: Omit<User, 'userId' | 'createdAt'>): Promise<User> => {
		return prisma.user.create({ data })
	}

	findById = async (userId: number): Promise<User | null> => {
		return prisma.user.findFirst({ where: { userId } })
	}

	findByUsername = async (username: string): Promise<User | null> => {
		return prisma.user.findFirst({ where: { username } })
	}

	findByEmail = async (email: string): Promise<User | null> => {
		return prisma.user.findFirst({ where: { email } })
	}

	updateLanguage = async (language: Language, userId: number) => {
		await prisma.user.update({
			where: { userId },
			data: { language }
		})
	}

	updatePassword = async (password: string, userId: number) => {
		await prisma.user.update({
			where: { userId },
			data: { password }
		})
	}

	updateUser = async (user: User) => {
		const { userId, username, email } = user

		return prisma.user.update({
			where: { userId },
			data: {
				username,
				email
			}
		})
	}

	/* STATIC */

	static getInstance = () => {
		if (UserDao.instance == null) {
			UserDao.instance = new UserDao()
		}

		return UserDao.instance
	}
}

export default UserDao.getInstance()
