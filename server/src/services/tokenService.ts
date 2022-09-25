import { Prisma, ResetPasswordToken, User, VerifyEmailToken } from '@prisma/client'
import { resetPasswordValidationSchema } from '@title/common/build/services/validation'
import { ErrorMessage } from '@title/common/build/types/ErrorMessage'
import { ResetPasswordRequest } from '@title/common/build/types/requests/auth'
import crypto from 'crypto'
import { CLIENT_URL } from '../config/environment'
import resetPasswordTokenDao from '../dao/resetPasswordTokenDao'
import userDao from '../dao/userDao'
import verifyEmailTokenDao from '../dao/verifyEmailTokenDao'
import { prisma } from '../prisma'
import { ForbiddenError, UnprocessableEntityError } from '../types/errors'
import { MailTemplate } from '../types/mailTemplates'
import authService from './authService'
import mailService from './mailService'

class TokenService {

	static instance: TokenService

	forgotPassword = async (email: string) => {
		const user = await userDao.findByEmail(email)

		if (user == null) {
			return null
		}

		const { username, userId } = user
		const token = this.generateToken()
		const hashedToken = this.hashToken(token)
		const expirationTime = new Date(Date.now() + 86400000) // 86400000ms = 1 day

		return prisma.$transaction(async (tx) => {
			await resetPasswordTokenDao.disableActiveTokens(userId, tx)

			await resetPasswordTokenDao.insert({
				token: hashedToken,
				expirationTime,
				userId
			}, tx)

			const resetLink = `${CLIENT_URL}/reset-password/${token}`

			const mail = await mailService.sendMail(email, MailTemplate.RESET_PASSWORD, {
				username,
				resetLink
			}, tx)

			return mail
		})
	}

	findResetPasswordToken = async (token: string): Promise<ResetPasswordToken> => {
		const hashedToken = this.hashToken(token)
		const resetPasswordToken = await resetPasswordTokenDao.findByToken(hashedToken)

		if (resetPasswordToken == null) {
			throw new ForbiddenError(ErrorMessage.TOKEN_NOT_FOUND)
		}

		if (!resetPasswordToken.isActive) {
			throw new ForbiddenError(ErrorMessage.NOT_ACTIVE_TOKEN)
		}

		if (resetPasswordToken.expirationTime < new Date()) {
			throw new ForbiddenError(ErrorMessage.EXPIRED_TOKEN)
		}

		return resetPasswordToken
	}

	resetPassword = async ({ token, password, passwordConfirmation }: ResetPasswordRequest) => {
		try {
			resetPasswordValidationSchema.validateSync({ password, passwordConfirmation })
		} catch (e) {
			throw new UnprocessableEntityError(ErrorMessage.INVALID_VALUES)
		}

		const { tokenId, userId } = await this.findResetPasswordToken(token)

		const newPassword = await authService.hashPassword(password)
		await userDao.updatePassword(newPassword, userId)
		await resetPasswordTokenDao.setActive(tokenId, false)
	}

	verifyEmail = async (token: string): Promise<void> => {
		const { tokenId, userId } = await this.findVerifyEmailToken(token)

		await userDao.setEmailVerified(userId, true)
		await verifyEmailTokenDao.setActive(tokenId, false)
	}

	/* PRIVATE */

	sendVerificationMail = async (user: User, tx: Prisma.TransactionClient = prisma) => {
		const { userId, username, email } = user

		const token = this.generateToken()
		const hashedToken = this.hashToken(token)
		const expirationTime = new Date(Date.now() + 86400000) // 86400000ms = 1 day

		await verifyEmailTokenDao.disableActiveTokens(userId, tx)

		await verifyEmailTokenDao.insert({
			token: hashedToken,
			expirationTime,
			userId
		}, tx)

		const verificationLink = `${CLIENT_URL}/verify-email/${token}`

		const mail = await mailService.sendMail(email, MailTemplate.VERIFY_EMAIL, {
			username,
			verificationLink
		}, tx)

		return mail
	}

	findVerifyEmailToken = async (token: string): Promise<VerifyEmailToken> => {
		const hashedToken = this.hashToken(token)
		const verifyEmailToken = await verifyEmailTokenDao.findByToken(hashedToken)

		if (verifyEmailToken == null) {
			throw new ForbiddenError(ErrorMessage.TOKEN_NOT_FOUND)
		}

		if (!verifyEmailToken.isActive) {
			throw new ForbiddenError(ErrorMessage.NOT_ACTIVE_TOKEN)
		}

		if (verifyEmailToken.expirationTime < new Date()) {
			throw new ForbiddenError(ErrorMessage.EXPIRED_TOKEN)
		}

		return verifyEmailToken
	}

	hashToken = (token: string): string => {
		return crypto.createHash('sha256').update(token).digest('hex')
	}

	generateToken = () => {
		return crypto.randomBytes(32).toString('hex')
	}

	/* STATIC */

	static getInstance = () => {
		if (TokenService.instance == null) {
			TokenService.instance = new TokenService()
		}

		return TokenService.instance
	}
}

export default TokenService.getInstance()
