import { User } from '@prisma/client'
import { loginValidationSchema, registerValidationSchema } from '@title/common/build/services/validation'
import { RegisterRequest, LoginRequest, LoginResponse } from '@title/common/build/types/requests/auth'
import { Session } from '@title/common/build/types/session'
import { ErrorMessage } from '@title/common/build/types/ErrorMessage'
import bcrypt from 'bcrypt'
import { Response } from 'express'
import jwt, { NotBeforeError, TokenExpiredError } from 'jsonwebtoken'
import { JWT_EXPIRATION_TIME, JWT_SECRET } from '../config/environment'
import { prisma } from '../prisma'
import { TokenPayload } from '../types/auth'
import { ForbiddenError, UnprocessableEntityError } from '../types/errors'
import { Req, Res } from '../types/requestResponse'
import AssertionService from './assertionService'
import { Language } from '@title/common/build/types/Language'
import UserService from './userService'

const assertionService = AssertionService.getService()
const userService = UserService.getService()

export default class AuthService {

	static service: AuthService

	/* PUBLIC */

	register = async (req: Req<RegisterRequest>, res: Response) => {
		const { username, email, password } = req.body

		try {
			registerValidationSchema.validateSync(req.body)
		} catch (e) {
			throw new UnprocessableEntityError(ErrorMessage.INVALID_VALUES)
		}

		assertionService.assertNull(await userService.findByUsername(username), ErrorMessage.USERNAME_ALREADY_USED)
		assertionService.assertNull(await userService.findByEmail(email), ErrorMessage.EMAIL_ALREADY_USED)

		const hashedPassword = await this.hashPassword(password)

		await prisma.user.create({
			data: {
				username,
				email,
				password: hashedPassword
			}
		})

		res.sendStatus(201)
	}

	login = async (req: Req<LoginRequest>, res: Res<LoginResponse>) => {
		const { username, password } = req.body

		try {
			loginValidationSchema.validateSync(req.body)
		} catch (e) {
			throw new UnprocessableEntityError(ErrorMessage.INVALID_VALUES)
		}

		const user = await userService.findByUsername(username)

		try {
			assertionService.assertNotNull(user, ErrorMessage.INVALID_USERNAME)
			assertionService.assertTrue(await this.isPasswordValid(password, user!.password), ErrorMessage.INVALID_PASSWORD)
		} catch (e) {
			throw new ForbiddenError(ErrorMessage.INVALID_CREDENTIALS)
		}

		const token = this.generateToken(user!)
		const session = await this.buildSession(user!.userId)

		res.status(200).json({ token, session })
	}

	findSession = async (req: Req<void>, res: Res<Session>) => {
		const token = this.getTokenFromHeader(req)

		if (token != null) {
			const payload = this.extractPayloadFromToken(token)
			const session = await this.buildSession(payload.userId)

			res.status(200).json(session)
		} else {
			res.sendStatus(204)
		}
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

		return token?.match(/^Bearer "(.+)"$/)?.[1]
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
		const user = await userService.findById(userId)

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

	static getService = () => {
		if (AuthService.service == null) {
			AuthService.service = new AuthService()
		}

		return AuthService.service
	}
}
