import { ErrorMessage } from '@title/common/build/types/ErrorMessage'
import { Language } from '@title/common/build/types/Language'
import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../../src'
import { prisma } from '../../src/prisma'
import AuthService from '../../src/services/authService'
import UserService from '../../src/services/userService'

const authService = AuthService.getService()
const userService = UserService.getService()

const { expect } = chai
chai.use(chaiHttp)

const STRONG_PASSWORD = 'Password@123'
const WEAK_PASSWORD = 'pwd'

describe('register', () => {
	after(async () => {
		await prisma.user.deleteMany({ where: { username: 'authTest' } })
	})

	it('should register a new user', async () => {
		expect(await userService.findByUsername('authTest')).to.be.null

		const res = await chai.request(app)
			.post('/api/auth/register')
			.send({
				username: 'authTest',
				email: 'authTest@test.com',
				password: STRONG_PASSWORD,
				passwordConfirmation: STRONG_PASSWORD
			})

		expect(res.status).to.equal(201)
		expect(await userService.findByUsername('authTest')).not.to.be.null
	})

	it('should not register a new user if one of the fields is missing', async () => {
		const username = 'authTest2'
		const email = 'authTest@test.com'
		const password = STRONG_PASSWORD
		const passwordConfirmation = STRONG_PASSWORD

		const requests = [
			{ username, email, password },
			{ username, email, passwordConfirmation },
			{ username, password, passwordConfirmation },
			{ email, password, passwordConfirmation }
		]

		for (const request of requests) {
			const res = await chai.request(app)
				.post('/api/auth/register')
				.send(request)

			expect(res.status).to.equal(422)
			expect(res.body.message).to.equal(ErrorMessage.INVALID_VALUES)
			expect(await userService.findByUsername('authTest2')).to.be.null
		}
	})

	it('should not register a new user with an existing username', async () => {
		const res = await chai.request(app)
			.post('/api/auth/register')
			.send({
				username: 'authTest',
				email: 'authTest2@test.com',
				password: STRONG_PASSWORD,
				passwordConfirmation: STRONG_PASSWORD
			})

		expect(res.status).to.equal(422)
		expect(res.body.message).to.equal(ErrorMessage.USERNAME_ALREADY_USED)
		expect(await userService.findByEmail('authTest2@test.com')).to.be.null
	})

	it('should not register a new user with an existing email', async () => {
		const res = await chai.request(app)
			.post('/api/auth/register')
			.send({
				username: 'authTest2',
				email: 'authTest@test.com',
				password: STRONG_PASSWORD,
				passwordConfirmation: STRONG_PASSWORD
			})

		expect(res.status).to.equal(422)
		expect(res.body.message).to.equal(ErrorMessage.EMAIL_ALREADY_USED)
		expect(await userService.findByUsername('authTest2')).to.be.null
	})

	it('should not register a new user with an invalid email', async () => {
		const res = await chai.request(app)
			.post('/api/auth/register')
			.send({
				username: 'authTest2',
				email: 'invalidEmail',
				password: STRONG_PASSWORD,
				passwordConfirmation: STRONG_PASSWORD
			})

		expect(res.status).to.equal(422)
		expect(res.body.message).to.equal(ErrorMessage.INVALID_VALUES)
		expect(await userService.findByUsername('authTest2')).to.be.null
	})

	it('should not register a new user with a weak password', async () => {
		const res = await chai.request(app)
			.post('/api/auth/register')
			.send({
				username: 'authTest2',
				email: 'authTest2@test.com',
				password: WEAK_PASSWORD,
				passwordConfirmation: WEAK_PASSWORD
			})

		expect(res.status).to.equal(422)
		expect(res.body.message).to.equal(ErrorMessage.INVALID_VALUES)
		expect(await userService.findByUsername('authTest2')).to.be.null
	})

	it('should not register a new user with non matching passwords', async () => {
		const res = await chai.request(app)
			.post('/api/auth/register')
			.send({
				username: 'authTest2',
				email: 'authTest2@test.com',
				password: STRONG_PASSWORD,
				passwordConfirmation: WEAK_PASSWORD
			})

		expect(res.status).to.equal(422)
		expect(res.body.message).to.equal(ErrorMessage.INVALID_VALUES)
		expect(await userService.findByUsername('authTest2')).to.be.null
	})
})

describe('login', () => {
	before(async () => {
		await prisma.user.create({
			data: {
				username: 'authTest',
				email: 'authTest@test.com',
				password: await authService.hashPassword(STRONG_PASSWORD),
				language: Language.en
			}
		})
	})

	after(async () => {
		await prisma.user.deleteMany({ where: { username: 'authTest' } })
	})

	it('should login a user', async () => {
		const res = await chai.request(app)
			.post('/api/auth/login')
			.send({
				username: 'authTest',
				password: STRONG_PASSWORD
			})

		expect(res.status).to.equal(200)
		expect(res.body.token).to.be.a('string').and.to.match(/^.+\..+\..+$/)
		expect(res.body.session.language).to.equal(Language.en)
		expect(res.body.session.user.username).to.equal('authTest')
	})

	it('should not login a user with a wrong password', async () => {
		const res = await chai.request(app)
			.post('/api/auth/login')
			.send({
				username: 'authTest',
				password: WEAK_PASSWORD
			})

		expect(res.status).to.equal(403)
		expect(res.body.message).to.equal(ErrorMessage.INVALID_CREDENTIALS)
	})

	it('should not login a user with a wrong username', async () => {
		const res = await chai.request(app)
			.post('/api/auth/login')
			.send({
				username: 'wrongUsername',
				password: STRONG_PASSWORD
			})

		expect(res.status).to.equal(403)
		expect(res.body.message).to.equal(ErrorMessage.INVALID_CREDENTIALS)
	})
})
