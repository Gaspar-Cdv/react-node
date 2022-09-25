import { Prisma, VerifyEmailToken } from '@prisma/client'
import { prisma } from '../prisma'

class VerifyEmailTokenDao {

	static instance: VerifyEmailTokenDao

	insert = async (data: Omit<VerifyEmailToken, 'tokenId' | 'isActive'>, tx: Prisma.TransactionClient = prisma): Promise<VerifyEmailToken> => {
		return tx.verifyEmailToken.create({ data })
	}

	findById = async (tokenId: number): Promise<VerifyEmailToken | null> => {
		return prisma.verifyEmailToken.findFirst({ where: { tokenId } })
	}

	findByToken = async (token: string): Promise<VerifyEmailToken | null> => {
		return prisma.verifyEmailToken.findFirst({ where: { token } })
	}

	setActive = async (tokenId: number, isActive: boolean) => {
		await prisma.verifyEmailToken.update({
			where: { tokenId },
			data: { isActive }
		})
	}

	disableActiveTokens = async (userId: number, tx: Prisma.TransactionClient = prisma) => {
		await tx.verifyEmailToken.updateMany({
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
		if (VerifyEmailTokenDao.instance == null) {
			VerifyEmailTokenDao.instance = new VerifyEmailTokenDao()
		}

		return VerifyEmailTokenDao.instance
	}
}

export default VerifyEmailTokenDao.getInstance()
