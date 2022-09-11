import { ErrorMessage } from '@title/common/build/types/ErrorMessage'
import { Language } from '@title/common/build/types/Language'
import { ChangePasswordRequest, UpdateUserRequest } from '@title/common/build/types/requests/user'
import chai from 'chai'
import chaiHttp from 'chai-http'
import userDao from '../../src/dao/userDao'
import authService from '../../src/services/authService'
import testService, { TEST_PASSWORD } from '../../src/services/testService'

const { expect } = chai
chai.use(chaiHttp)

const updateUser = async (userId: number, data: UpdateUserRequest) => {
	return testService.call('/api/user/updateUser', data, userId)
}

const changePassword = async (userId: number, data: ChangePasswordRequest) => {
	return testService.call('/api/user/changePassword', data, userId)
}

const changeLanguage = async (userId: number, language: Language) => {
	return testService.call('/api/user/changeLanguage', { language }, userId)
}

describe('Update user', () => {
	it('should update an user', async () => {
		const { userId, email } = await testService.createTestUser()

		const { username: newUsername, email: newEmail } = testService.generateRegisterRequest()

		// change username
		const res1 = await updateUser(userId, {
			username: newUsername,
			email
		})

		expect(res1.status).to.equal(200)
		expect(await userDao.findById(userId)).to.have.property('username', newUsername)

		// change email
		const res2 = await updateUser(userId, {
			username: newUsername,
			email: newEmail
		})

		expect(res2.status).to.equal(200)
		expect(await userDao.findById(userId)).to.have.property('email', newEmail)
	})

	it('should throw errors if invalid or already existing values', async () => {
		const { userId, username, email } = await testService.createTestUser()
		const user2 = await testService.createTestUser()

		// invalid values
		const res1 = await updateUser(userId, {
			username,
			email: 'incorrect_email'
		})

		expect(res1.status).to.equal(422)
		expect(res1.body.message).to.equal(ErrorMessage.INVALID_VALUES)

		// username already used
		const res2 = await updateUser(userId, {
			username: user2.username,
			email
		})

		expect(res2.status).to.equal(422)
		expect(res2.body.message).to.equal(ErrorMessage.USERNAME_ALREADY_USED)

		// email already used
		const res3 = await updateUser(userId, {
			username,
			email: user2.email
		})

		expect(res3.status).to.equal(422)
		expect(res3.body.message).to.equal(ErrorMessage.EMAIL_ALREADY_USED)

		const user = await userDao.findById(userId)

		expect(user).to.not.be.null
		expect(user).to.have.property('username', username)
		expect(user).to.have.property('email', email)
	})
})

describe('Change password', () => {
	it('should change password', async () => {
		const { userId } = await testService.createTestUser()

		const newPassword = 'newPassword@123'

		const res = await changePassword(userId, {
			oldPassword: TEST_PASSWORD,
			password: newPassword,
			passwordConfirmation: newPassword
		})

		const user = await userDao.findById(userId)

		expect(res.status).to.equal(200)
		expect(await authService.isPasswordValid(newPassword, user!.password)).to.be.true
	})

	it('should throw errors if invalid values', async () => {
		const { userId } = await testService.createTestUser()

		const newPassword = 'newPassword@123'

		// wrong password
		const res1 = await changePassword(userId, {
			oldPassword: 'wrong_password',
			password: newPassword,
			passwordConfirmation: newPassword
		})

		expect(res1.status).to.equal(422)
		expect(res1.body.message).to.equal(ErrorMessage.INVALID_PASSWORD)

		// weak password
		const res2 = await changePassword(userId, {
			oldPassword: TEST_PASSWORD,
			password: 'weak',
			passwordConfirmation: 'weak'
		})

		expect(res2.status).to.equal(422)
		expect(res2.body.message).to.equal(ErrorMessage.INVALID_VALUES)

		// different password
		const res3 = await changePassword(userId, {
			oldPassword: TEST_PASSWORD,
			password: newPassword,
			passwordConfirmation: 'different_password'
		})

		expect(res3.status).to.equal(422)
		expect(res3.body.message).to.equal(ErrorMessage.INVALID_VALUES)

		const user = await userDao.findById(userId)

		expect(await authService.isPasswordValid(TEST_PASSWORD, user!.password)).to.be.true
	})
})

describe('Update language', () => {
	it('should change the language of the user', async () => {
		const { userId } = await testService.createTestUser({ language: Language.en })

		const initialLanguage = (await userDao.findById(userId))!.language
		expect(initialLanguage).to.equal(Language.en)

		await changeLanguage(userId, Language.fr)

		const newLanguage = (await userDao.findById(userId))!.language
		expect(newLanguage).to.equal(Language.fr)
	})
})
