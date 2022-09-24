import { User } from '@prisma/client'
import { Language } from '@title/common/build/types/Language'
import { RegisterRequest } from '@title/common/build/types/requests/auth'
import chai from 'chai'
import chaiHttp from 'chai-http'
import jwt from 'jsonwebtoken'
import app from '..'
import { JWT_SECRET } from '../config/environment'
import authService from './authService'

chai.use(chaiHttp)

export const TEST_PASSWORD = 'Password@123'
export const NEW_PASSWORD = 'newPassword@123'

class TestService {
	static instance: TestService

	/**
	 * Generate a register request with random and unique username and email.\
	 * The values can be overwritten in the registerRequest argument.
	 */
	generateRegisterRequest = (registerRequest?: Partial<RegisterRequest>): RegisterRequest => {
		const username = `test+${Date.now()}`
		const email = `${username}@test.com`
		const password = TEST_PASSWORD

		return {
			username,
			email,
			password,
			passwordConfirmation: password,
			language: Language.en,
			...registerRequest
		}
	}

	/**
	 * Register a test user with random and unique username and email.\
	 * The values can be overwritten in the registerRequest argument.
	 */
	createTestUser = async (registerRequest?: Partial<RegisterRequest>): Promise<User> => {
		const data = this.generateRegisterRequest(registerRequest)

		return authService.register(data)
	}

	/**
	 * Call the endpoint of the api with the given data.\
	 * If userId is given, a token will be generated and added to the headers of the request.
	 */
	call = async (endpoint: string, data: object, userId?: number) => {
		const request = chai.request(app).post(endpoint)

		if (userId != null) {
			const token = jwt.sign({ userId }, JWT_SECRET)
			request.set({ Authorization: `Bearer ${token}` })
		}

		return request.send(data)
	}

	/* STATIC */

	static getInstance (): TestService {
		if (!TestService.instance) {
			TestService.instance = new TestService()
		}

		return TestService.instance
	}
}

export default TestService.getInstance()
