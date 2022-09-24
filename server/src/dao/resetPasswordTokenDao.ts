import { ResetPasswordToken } from '@prisma/client'
import { prisma } from '../prisma'

class ResetPasswordTokenDao {

	static instance: ResetPasswordTokenDao

	insert = async (data: Omit<ResetPasswordToken, 'tokenId' | 'isActive'>): Promise<ResetPasswordToken> => {
		return prisma.resetPasswordToken.create({ data })
	}

	findById = async (tokenId: number): Promise<ResetPasswordToken | null> => {
		return prisma.resetPasswordToken.findFirst({ where: { tokenId } })
	}

	findByToken = async (token: string): Promise<ResetPasswordToken | null> => {
		return prisma.resetPasswordToken.findFirst({ where: { token } })
	}

	setActive = async (tokenId: number, isActive: boolean) => {
		await prisma.resetPasswordToken.update({
			where: { tokenId },
			data: { isActive }
		})
	}

	disableActiveTokens = async (userId: number) => {
		await prisma.resetPasswordToken.updateMany({
			where: {
				userId,
				isActive: true
			},
			data: {
				isActive: false
			}
		})
	}

	/* STATIC */

	static getInstance = () => {
		if (ResetPasswordTokenDao.instance == null) {
			ResetPasswordTokenDao.instance = new ResetPasswordTokenDao()
		}

		return ResetPasswordTokenDao.instance
	}
}

export default ResetPasswordTokenDao.getInstance()
