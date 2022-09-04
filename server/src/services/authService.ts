import { User } from '@prisma/client'
import { loginValidationSchema, registerValidationSchema } from '@title/common/build/services/validation'
import { RegisterRequest, LoginRequest, LoginResponse } from '@title/common/build/types/requests/auth'
import { ErrorMessage } from '@title/common/build/types/ErrorMessage'
import bcrypt from 'bcrypt'
import { Response } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_EXPIRATION_TIME, JWT_SECRET } from '../config/environment'
import { prisma } from '../prisma'
import { TokenPayload } from '../types/auth'
import { ForbiddenError, UnprocessableEntityError } from '../types/errors'
import { Req, Res } from '../types/requestResponse'
import AssertionService from './assertionService'

const assertionService = AssertionService.getService()

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

		assertionService.assertNull(await this.findByUsername(username), ErrorMessage.USERNAME_ALREADY_USED)
		assertionService.assertNull(await this.findByEmail(email), ErrorMessage.EMAIL_ALREADY_USED)

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

		const user = await this.findByUsername(username)

		try {
			assertionService.assertNotNull(user, ErrorMessage.INVALID_USERNAME)
			assertionService.assertTrue(await this.isPasswordValid(password, user!.password), ErrorMessage.INVALID_PASSWORD)
		} catch (e) {
			throw new ForbiddenError(ErrorMessage.INVALID_CREDENTIALS)
		}

		const token = this.generateToken(user!)

		res.status(200).json({ token })
	}

	/* PRIVATE */

	findById = async (userId: number): Promise<User | null> => {
		return prisma.user.findFirst({ where: { userId } })
	}

	findByUsername = async (username: string): Promise<User | null> => {
		return prisma.user.findFirst({ where: { username } })
	}

	findByEmail = async (email: string): Promise<User | null> => {
		return prisma.user.findFirst({ where: { email } })
	}

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

	extractPayloadFromToken = (token: string): TokenPayload | undefined => {
		return jwt.decode(token) as TokenPayload
	}

	isTokenValid = (token = ''): boolean => {
		try {
			jwt.verify(token, JWT_SECRET)

			return true
		} catch (e) {
			return false
		}
	}

	/* STATIC */

	static getService = () => {
		if (AuthService.service == null) {
			AuthService.service = new AuthService()
		}

		return AuthService.service
	}
}
