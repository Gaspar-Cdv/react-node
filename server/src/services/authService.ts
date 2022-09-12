import { User } from '@prisma/client'
import { loginValidationSchema, registerValidationSchema } from '@title/common/build/services/validation'
import { RegisterRequest, LoginRequest, LoginResponse } from '@title/common/build/types/requests/auth'
import { Session } from '@title/common/build/types/session'
import { ErrorMessage } from '@title/common/build/types/ErrorMessage'
import bcrypt from 'bcrypt'
import jwt, { NotBeforeError, TokenExpiredError } from 'jsonwebtoken'
import { JWT_EXPIRATION_TIME, JWT_SECRET } from '../config/environment'
import { TokenPayload } from '../types/auth'
import { ForbiddenError, UnprocessableEntityError } from '../types/errors'
import { Req } from '../types/requestResponse'
import { Language } from '@title/common/build/types/Language'
import assertionService from './assertionService'
import userDao from '../dao/userDao'
import userService from './userService'

class AuthService {

	static instance: AuthService

	/* PUBLIC */

	register = async (body: RegisterRequest): Promise<User> => {
		try {
			registerValidationSchema.validateSync(body)
		} catch (e) {
			throw new UnprocessableEntityError(ErrorMessage.INVALID_VALUES)
		}

		const { username, email, password, language } = body

		assertionService.assertNull(await userDao.findByUsername(username), ErrorMessage.USERNAME_ALREADY_USED)
		assertionService.assertNull(await userDao.findByEmail(email), ErrorMessage.EMAIL_ALREADY_USED)

		const hashedPassword = await this.hashPassword(password)

		return userDao.insert({
			username,
			email,
			password: hashedPassword,
			language
		})
	}

	login = async (body: LoginRequest): Promise<LoginResponse> => {
		try {
			loginValidationSchema.validateSync(body)
		} catch (e) {
			throw new UnprocessableEntityError(ErrorMessage.INVALID_VALUES)
		}

		const { username, password } = body
		const user = await userDao.findByUsername(username)

		try {
			assertionService.assertNotNull(user, ErrorMessage.INVALID_USERNAME)
			assertionService.assertTrue(await this.isPasswordValid(password, user!.password), ErrorMessage.INVALID_PASSWORD)
		} catch (e) {
			throw new ForbiddenError(ErrorMessage.INVALID_CREDENTIALS)
		}

		const token = this.generateToken(user!)
		const session = await this.buildSession(user!.userId)

		return { token, session }
	}

	findSession = async (req: Req<void>): Promise<Session | null> => {
		const token = this.getTokenFromHeader(req)

		if (token == null) {
			return null
		}

		const payload = this.extractPayloadFromToken(token)
		const session = await this.buildSession(payload.userId)

		return session
	}

	/* PRIVATE */

	hashPassword = (password: string): Promise<string> => {
		return bcrypt.hash(password, 10)
	}

	isPasswordValid = (password: string, hashedPassword: string): Promise<boolean> => {
		return bcrypt.compare(password, hashedPassword)
	}

	generateToken = (user: User): string => {
		const payload: TokenPayload = {
			userId: user.userId,
			username: user.username,
			email: user.email
		}

		const options: jwt.SignOptions = {
			expiresIn: JWT_EXPIRATION_TIME
		}

		return jwt.sign(payload, JWT_SECRET, options)
	}

	getTokenFromHeader = (req: Req): string | undefined => {
		const token = req.header('x-access-token') || req.header('authorization')

		return token?.replace('Bearer ', '')
	}

	extractPayloadFromToken = (token = ''): TokenPayload => {
		try {
			return jwt.verify(token, JWT_SECRET) as TokenPayload
		} catch (e) {
			if (e instanceof TokenExpiredError) {
				throw new ForbiddenError(ErrorMessage.EXPIRED_TOKEN)
			} else if (e instanceof NotBeforeError) {
				throw new ForbiddenError(ErrorMessage.NOT_ACTIVE_TOKEN)
			} else {
				throw new ForbiddenError(ErrorMessage.INVALID_TOKEN)
			}
		}
	}

	isTokenValid = (token = ''): boolean => {
		try {
			this.extractPayloadFromToken(token)

			return true
		} catch (e) {
			return false
		}
	}

	buildSession = async (userId: number) => {
		const user = await userDao.findById(userId)

		if (user == null) {
			throw new Error()
		}

		const session: Session = {
			language: user.language as Language,
			user: userService.createUserDto(user)
		}

		return session
	}

	/* STATIC */

	static getInstance = () => {
		if (AuthService.instance == null) {
			AuthService.instance = new AuthService()
		}

		return AuthService.instance
	}
}

export default AuthService.getInstance()
