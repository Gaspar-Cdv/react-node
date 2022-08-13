import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../../src'
import { prisma } from '../../src/prisma'
import AuthService from '../../src/services/authService'
import { ErrorMessage } from '../../src/types/errors'

const authService = AuthService.getService()

const { expect } = chai
chai.use(chaiHttp)

const STRONG_PASSWORD = 'Password@123'
const WEAK_PASSWORD = 'pwd'

describe('register', () => {
	after(async () => {
		await prisma.user.deleteMany({ where: { username: 'authTest' } })
	})

	it('should register a new user', async () => {
		expect(await authService.findByUsername('authTest')).to.be.null

		const res = await chai.request(app)
			.post('/api/auth/register')
			.send({
				username: 'authTest',
				email: 'authTest@test.com',
				password: STRONG_PASSWORD,
				passwordConfirmation: STRONG_PASSWORD
			})

		expect(res.status).to.equal(201)
		expect(await authService.findByUsername('authTest')).not.to.be.null
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
			expect(res.body.message).to.equal(ErrorMessage.MISSING_FIELDS)
			expect(await authService.findByUsername('authTest2')).to.be.null
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
		expect(await authService.findByEmail('authTest2@test.com')).to.be.null
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
		expect(await authService.findByUsername('authTest2')).to.be.null
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
		expect(res.body.message).to.equal(ErrorMessage.INVALID_EMAIL)
		expect(await authService.findByUsername('authTest2')).to.be.null
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
		expect(res.body.message).to.equal(ErrorMessage.PASSWORD_NOT_STRONG_ENOUGH)
		expect(await authService.findByUsername('authTest2')).to.be.null
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
		expect(res.body.message).to.equal(ErrorMessage.PASSWORDS_DO_NOT_MATCH)
		expect(await authService.findByUsername('authTest2')).to.be.null
	})
})

describe('login', () => {
	before(async () => {
		await prisma.user.create({
			data: {
				username: 'authTest',
				email: 'authTest@test.com',
				password: await authService.hashPassword(STRONG_PASSWORD)
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
		expect(res.header.authorization).to.be.a('string').and.to.match(/^Bearer /)
	})

	it('should not login a user with a wrong password', async () => {
		const res = await chai.request(app)
			.post('/api/auth/login')
			.send({
				username: 'authTest',
				password: WEAK_PASSWORD
			})

		expect(res.status).to.equal(422)
		expect(res.body.message).to.equal(ErrorMessage.INVALID_PASSWORD)
	})

	it('should not login a user with a wrong username', async () => {
		const res = await chai.request(app)
			.post('/api/auth/login')
			.send({
				username: 'wrongUsername',
				password: STRONG_PASSWORD
			})

		expect(res.status).to.equal(422)
		expect(res.body.message).to.equal(ErrorMessage.INVALID_USERNAME)
	})
})
