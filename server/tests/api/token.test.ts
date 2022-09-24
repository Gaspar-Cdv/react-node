import { Email, MailTemplate } from '@prisma/client'
import { LoginRequest, ResetPasswordRequest } from '@title/common/build/types/requests/auth'
import chai from 'chai'
import chaiHttp from 'chai-http'
import chaiDateTime from 'chai-datetime'
import emailDao from '../../src/dao/emailDao'
import { prisma } from '../../src/prisma'
import testService, { NEW_PASSWORD } from '../../src/services/testService'
import { ErrorMessage } from '@title/common/build/types/ErrorMessage'

const { expect } = chai
chai.use(chaiHttp)
chai.use(chaiDateTime)

const forgotPassword = async (email: string) => {
	return testService.call('/api/token/forgotPassword', { email })
}

const findResetPasswordToken = async (token: string) => {
	return testService.call('/api/token/findResetPasswordToken', { token })
}

const resetPassword = async (resetPasswordRequest: ResetPasswordRequest) => {
	return testService.call('/api/token/resetPassword', resetPasswordRequest)
}

const login = async (loginRequest: LoginRequest) => {
	return testService.call('/api/auth/login', loginRequest)
}

const findTokenByUserId = async (userId: number) => {
	return prisma.resetPasswordToken.findFirst({
		where: {
			userId,
			isActive: true
		}
	})
}

const getTokenFromEmail = (email: Email | null): string => {
	const { resetLink } = email?.params as { resetLink?: string }
	expect(resetLink).not.to.be.null
	const token = resetLink!.match(/[^/]+$/)?.[0]
	expect(token).not.to.be.null

	return token!
}

describe('forgot password', () => {
	it('should change password when password is forgotten', async () => {
		const { userId, username, email } = await testService.createTestUser()

		// token doesn't exist yet
		const token1 = await findTokenByUserId(userId)
		expect(token1).to.be.null

		// send mail and generate token
		const res1 = await forgotPassword(email)
		expect(res1.status).to.equal(204)

		// token is created
		const token2 = await findTokenByUserId(userId)
		expect(token2).not.to.be.null

		// email has been sent
		const resetPasswordEmail = await emailDao.findLastByEmail(email)
		expect(resetPasswordEmail).not.to.be.null
		expect(resetPasswordEmail!.template).to.equal(MailTemplate.RESET_PASSWORD)
		expect(resetPasswordEmail!.date).to.closeToTime(new Date(), 10)

		const token = getTokenFromEmail(resetPasswordEmail)

		// token is valid
		const res2 = await findResetPasswordToken(token!)
		expect(res2.status).to.equal(200)

		// change password
		const newPassword = 'NewPassword@123'
		const res3 = await resetPassword({
			token: token!,
			password: newPassword,
			passwordConfirmation: newPassword
		})
		expect(res3.status).to.equal(200)

		// token doesn't exist anymore
		const token3 = await findTokenByUserId(userId)
		expect(token3).to.be.null

		// password has been changed
		const res4 = await login({ username, password: newPassword })
		expect(res4.status).to.equal(200)
	})

	it('should throw an error if token is invalid', async () => {
		const { body, status } = await findResetPasswordToken('invalid_token')
		expect(status).to.equal(403)
		expect(body.message).to.equal(ErrorMessage.TOKEN_NOT_FOUND)
	})

	it('should throw an error if reset password request is invalid', async () => {
		const { username, email } = await testService.createTestUser()
		await forgotPassword(email)
		const resetPasswordEmail = await emailDao.findLastByEmail(email)
		const token = getTokenFromEmail(resetPasswordEmail)

		// weak password
		const res1 = await resetPassword({
			token,
			password: 'weak_password',
			passwordConfirmation: 'weak_password'
		})
		expect(res1.status).to.equal(422)
		expect(res1.body.message).to.equal(ErrorMessage.INVALID_VALUES)

		const login1 = await login({ username, password: 'weak_password' })
		expect(login1.status).to.equal(403)
		expect(login1.body.message).to.equal(ErrorMessage.INVALID_CREDENTIALS)

		// non matching password
		const res2 = await resetPassword({
			token,
			password: NEW_PASSWORD,
			passwordConfirmation: 'non_matching'
		})
		expect(res2.status).to.equal(422)
		expect(res2.body.message).to.equal(ErrorMessage.INVALID_VALUES)

		const login2 = await login({ username, password: NEW_PASSWORD })
		expect(login2.status).to.equal(403)
		expect(login2.body.message).to.equal(ErrorMessage.INVALID_CREDENTIALS)

		// invalid token
		const res3 = await resetPassword({
			token: 'invalid_token',
			password: NEW_PASSWORD,
			passwordConfirmation: NEW_PASSWORD
		})
		expect(res3.status).to.equal(403)
		expect(res3.body.message).to.equal(ErrorMessage.TOKEN_NOT_FOUND)

		const login3 = await login({ username, password: NEW_PASSWORD })
		expect(login3.status).to.equal(403)
		expect(login3.body.message).to.equal(ErrorMessage.INVALID_CREDENTIALS)
	})
})
