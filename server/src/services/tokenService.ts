import { ResetPasswordToken } from '@prisma/client'
import { resetPasswordValidationSchema } from '@title/common/build/services/validation'
import { ErrorMessage } from '@title/common/build/types/ErrorMessage'
import { ResetPasswordRequest } from '@title/common/build/types/requests/auth'
import crypto from 'crypto'
import { CLIENT_URL } from '../config/environment'
import resetPasswordTokenDao from '../dao/resetPasswordTokenDao'
import userDao from '../dao/userDao'
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

		await resetPasswordTokenDao.disableActiveTokens(userId)

		await resetPasswordTokenDao.insert({
			token: hashedToken,
			expirationTime,
			userId
		})

		const resetLink = `${CLIENT_URL}/reset-password/${token}`

		const mail = await mailService.sendMail(email, MailTemplate.RESET_PASSWORD, {
			username,
			resetLink
		})

		return mail
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
			console.log(e)
			throw new UnprocessableEntityError(ErrorMessage.INVALID_VALUES)
		}

		const { tokenId, userId } = await this.findResetPasswordToken(token)

		const newPassword = await authService.hashPassword(password)
		await userDao.updatePassword(newPassword, userId)
		await resetPasswordTokenDao.setActive(tokenId, false)
	}

	/* PRIVATE */

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
