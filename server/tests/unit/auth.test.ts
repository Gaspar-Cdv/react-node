import { User } from '@prisma/client'
import chai from 'chai'
import { JWT_EXPIRATION_TIME } from '../../src/config/environment'
import AuthService from '../../src/services/authService'

const authService = AuthService.getService()
const { expect } = chai

describe('authService', () => {
	it('should generate, decode and verify token', () => {
		const user: User = {
			userId: 1,
			username: 'test',
			email: 'test@test.com',
			password: 'password@123',
			createdAt: new Date()
		}

		const token = authService.generateToken(user)
		const payload = authService.extractPayloadFromToken(token)

		expect(payload).not.to.be.null
		expect(authService.isTokenValid(token)).to.be.true
		expect(authService.isTokenValid(token + 'a')).to.be.false
		expect(payload!.userId).to.equal(user.userId)
		expect(payload!.username).to.equal(user.username)
		expect(payload!.email).to.equal(user.email)
		expect(payload!.exp).to.equal(payload!.iat! + JWT_EXPIRATION_TIME)
	})
})
