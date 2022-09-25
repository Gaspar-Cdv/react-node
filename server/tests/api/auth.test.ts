import { ErrorMessage } from '@title/common/build/types/ErrorMessage'
import { Language } from '@title/common/build/types/Language'
import { LoginRequest, RegisterRequest } from '@title/common/build/types/requests/auth'
import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../../src'
import userDao from '../../src/dao/userDao'
import testService, { TEST_PASSWORD } from '../../src/services/testService'

const { expect } = chai
chai.use(chaiHttp)

const register = async (registerRequest: Partial<RegisterRequest>) => {
	const request = testService.generateRegisterRequest(registerRequest)
	return testService.call('/api/auth/register', request)
}

const login = async (loginRequest: LoginRequest) => {
	return testService.call('/api/auth/login', loginRequest)
}

describe('register', () => {
	const {
		username: USERNAME,
		email: EMAIL
	} = testService.generateRegisterRequest()

	it('should register a new user', async () => {
		expect(await userDao.findByUsername(USERNAME)).to.be.null

		const res = await register({
			username: USERNAME,
			email: EMAIL
		})

		expect(res.status).to.equal(201)
		expect(await userDao.findByUsername(USERNAME)).not.to.be.null
	})

	it('should not register a new user if one of the fields is missing', async () => {
		const { username, email, password, passwordConfirmation } = testService.generateRegisterRequest()

		const requests = [
			{ username, email, password },
			{ username, email, passwordConfirmation },
			{ username, password, passwordConfirmation },
			{ email, password, passwordConfirmation }
		]

		for (const request of requests) {
			const res = await testService.call('/api/auth/register', request)

			expect(res.status).to.equal(422)
			expect(res.body.message).to.equal(ErrorMessage.INVALID_VALUES)
			expect(await userDao.findByUsername('authTest2')).to.be.null
		}
	})

	it('should not register a new user with an existing username', async () => {
		const res = await register({ username: USERNAME })

		expect(res.status).to.equal(422)
		expect(res.body.message).to.equal(ErrorMessage.USERNAME_ALREADY_USED)
		expect(await userDao.findByEmail('authTest2@test.com')).to.be.null
	})

	it('should not register a new user with an existing email', async () => {
		const res = await register({ email: EMAIL })

		expect(res.status).to.equal(422)
		expect(res.body.message).to.equal(ErrorMessage.EMAIL_ALREADY_USED)
		expect(await userDao.findByUsername('authTest2')).to.be.null
	})

	it('should not register a new user with an invalid email', async () => {
		const res = await register({ email: 'invalid_email' })

		expect(res.status).to.equal(422)
		expect(res.body.message).to.equal(ErrorMessage.INVALID_VALUES)
		expect(await userDao.findByUsername('authTest2')).to.be.null
	})

	it('should not register a new user with a weak password', async () => {
		const res = await register({
			password: 'weak_password',
			passwordConfirmation: 'weak_password'
		})

		expect(res.status).to.equal(422)
		expect(res.body.message).to.equal(ErrorMessage.INVALID_VALUES)
		expect(await userDao.findByUsername('authTest2')).to.be.null
	})

	it('should not register a new user with non matching passwords', async () => {
		const res = await register({ passwordConfirmation: 'non_matching' })

		expect(res.status).to.equal(422)
		expect(res.body.message).to.equal(ErrorMessage.INVALID_VALUES)
		expect(await userDao.findByUsername('authTest2')).to.be.null
	})
})

describe('login', () => {
	const {
		username: USERNAME,
		email: EMAIL
	} = testService.generateRegisterRequest()

	before(async () => {
		await testService.createTestUser({ username: USERNAME, email: EMAIL })
	})

	it('should login a user', async () => {
		const res = await login({
			username: USERNAME,
			password: TEST_PASSWORD
		})

		expect(res.status).to.equal(200)
		expect(res.body.token).to.be.a('string').and.to.match(/^.+\..+\..+$/)
		expect(res.body.session.language).to.equal(Language.en)
		expect(res.body.session.user.username).to.equal(USERNAME)
	})

	it('should not login a user with a wrong password', async () => {
		const res = await login({
			username: USERNAME,
			password: 'wrong_password'
		})

		expect(res.status).to.equal(403)
		expect(res.body.message).to.equal(ErrorMessage.INVALID_CREDENTIALS)
	})

	it('should not login a user with a wrong username', async () => {
		const res = await login({
			username: 'wrong_username',
			password: TEST_PASSWORD
		})

		expect(res.status).to.equal(403)
		expect(res.body.message).to.equal(ErrorMessage.INVALID_CREDENTIALS)
	})
})

describe('Find session', () => {
	it('should find session', async () => {
		const { userId, username, email, emailVerified } = await testService.createTestUser({ language: Language.en })

		const { status, body } = await testService.call('/api/auth/findSession', {}, userId)
		const { user, language } = body

		expect(status).to.equal(200)
		expect(user).not.to.be.null
		expect(user).to.deep.equal({ userId, username, email, emailVerified })
		expect(language).not.to.be.null
		expect(language).to.equal(Language.en)
	})

	it('should return null if no token is provided or throw error if an invalid token is provided', async () => {
		const res1 = await testService.call('/api/auth/findSession', {})
		expect(res1.status).to.equal(204)
		expect(res1.body).to.be.empty

		const res2 = await chai.request(app)
			.post('/api/auth/findSession')
			.set({ Authorization: 'Bearer "invalid_token"' })
			.send({})

		expect(res2.status).to.equal(403)
		expect(res2.body.message).to.equal(ErrorMessage.INVALID_TOKEN)
	})
})
