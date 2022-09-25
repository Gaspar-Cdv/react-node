import { MailTemplate } from '@prisma/client'
import { ErrorMessage } from '@title/common/build/types/ErrorMessage'
import { LoginRequest, ResetPasswordRequest } from '@title/common/build/types/requests/auth'
import { UpdateUserRequest } from '@title/common/build/types/requests/user'
import chai from 'chai'
import chaiDateTime from 'chai-datetime'
import chaiHttp from 'chai-http'
import emailDao from '../../src/dao/emailDao'
import userDao from '../../src/dao/userDao'
import { prisma } from '../../src/prisma'
import testService, { NEW_PASSWORD } from '../../src/services/testService'

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

const verifyEmail = async (token: string) => {
	return testService.call('/api/token/verifyEmail', { token })
}

const updateUser = async (userId: number, data: UpdateUserRequest) => {
	return testService.call('/api/user/updateUser', data, userId)
}

const findResetPasswordTokenByUserId = async (userId: number) => {
	return prisma.resetPasswordToken.findFirst({
		where: {
			userId,
			isActive: true
		}
	})
}

const getTokenFromUrl = (url?: string): string => {
	expect(url).not.to.be.null
	const token = url!.match(/[^/]+$/)?.[0]
	expect(token).not.to.be.null

	return token!
}

const findVerifyEmailTokenByUserId = async (userId: number) => {
	return prisma.verifyEmailToken.findFirst({
		where: {
			userId,
			isActive: true
		}
	})
}

describe('forgot password', () => {
	it('should change password when password is forgotten', async () => {
		const { userId, username, email } = await testService.createTestUser()

		// token doesn't exist yet
		const resetPasswordToken1 = await findResetPasswordTokenByUserId(userId)
		expect(resetPasswordToken1).to.be.null

		// send mail and generate token
		const res1 = await forgotPassword(email)
		expect(res1.status).to.equal(204)

		// token is created
		const resetPasswordToken2 = await findResetPasswordTokenByUserId(userId)
		expect(resetPasswordToken2).not.to.be.null

		// email has been sent
		const resetPasswordEmail = await emailDao.findLastByEmail(email)
		expect(resetPasswordEmail).not.to.be.null
		expect(resetPasswordEmail!.template).to.equal(MailTemplate.RESET_PASSWORD)
		expect(resetPasswordEmail!.date).to.closeToTime(new Date(), 10)

		const { resetLink } = resetPasswordEmail?.params as { resetLink?: string }
		const token = getTokenFromUrl(resetLink)

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
		const resetPasswordToken3 = await findResetPasswordTokenByUserId(userId)
		expect(resetPasswordToken3).to.be.null

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
		const { resetLink } = resetPasswordEmail?.params as { resetLink?: string }
		const token = getTokenFromUrl(resetLink)

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

describe('verify email', () => {
	it('should verify email', async () => {
		const { userId, email, emailVerified } = await testService.createTestUser({}, false)

		// email is not verified
		expect(emailVerified).to.equal(false)

		// token is created
		const verifyEmailToken1 = await findVerifyEmailTokenByUserId(userId)
		expect(verifyEmailToken1).not.to.be.null

		// email has been sent
		const verificationEmail = await emailDao.findLastByEmail(email)
		expect(verificationEmail).not.to.be.null
		expect(verificationEmail!.template).to.equal(MailTemplate.VERIFY_EMAIL)
		expect(verificationEmail!.date).to.closeToTime(new Date(), 10)

		const { verificationLink } = verificationEmail?.params as { verificationLink?: string }
		const token = getTokenFromUrl(verificationLink)

		// visit verification link
		const res = await verifyEmail(token)
		expect(res.status).to.equal(200)

		// email is now verified
		const user = await userDao.findById(userId)
		expect(user?.emailVerified).to.equal(true)

		// token doesn't exist anymore
		const verifyEmailToken2 = await findVerifyEmailTokenByUserId(userId)
		expect(verifyEmailToken2).to.be.null
	})

	it('should throw an error if token is invalid', async () => {
		const { body, status } = await verifyEmail('invalid_token')
		expect(status).to.equal(403)
		expect(body.message).to.equal(ErrorMessage.TOKEN_NOT_FOUND)
	})

	it('should send verification mail when email has changed', async () => {
		const { userId, username, email, emailVerified } = await testService.createTestUser()

		// email is already verified
		expect(emailVerified).to.be.true

		// no token has been generated
		const verifyEmailToken1 = await findVerifyEmailTokenByUserId(userId)
		expect(verifyEmailToken1).to.be.null

		// no mail has been sent
		const verificationEmail1 = await emailDao.findLastByEmail(email)
		expect(verificationEmail1).to.be.null

		// change email
		const { email: newEmail } = testService.generateRegisterRequest()
		await updateUser(userId, {
			username,
			email: newEmail
		})

		// email is now not verified
		const user1 = await userDao.findById(userId)
		expect(user1!.emailVerified).to.be.false

		// token has been generated
		const verifyEmailToken2 = await findVerifyEmailTokenByUserId(userId)
		expect(verifyEmailToken2).not.to.be.null

		// email has been sent
		const verificationEmail2 = await emailDao.findLastByEmail(newEmail)
		expect(verificationEmail2).not.to.be.null
		expect(verificationEmail2!.template).to.equal(MailTemplate.VERIFY_EMAIL)
		expect(verificationEmail2!.date).to.closeToTime(new Date(), 10)

		const { verificationLink } = verificationEmail2?.params as { verificationLink?: string }
		const token = getTokenFromUrl(verificationLink)

		// visit verification link
		const res = await verifyEmail(token)
		expect(res.status).to.equal(200)

		// email is now verified
		const user2 = await userDao.findById(userId)
		expect(user2?.emailVerified).to.equal(true)

		// token doesn't exist anymore
		const verifyEmailToken3 = await findVerifyEmailTokenByUserId(userId)
		expect(verifyEmailToken3).to.be.null
	})
})
