import { HttpResponse, HttpStatus } from './http'

export enum ErrorMessage {
  // register
  MISSING_FIELDS = 'Missing fields',
  USERNAME_ALREADY_USED = 'Username already used',
  EMAIL_ALREADY_USED = 'Email already used',
  INVALID_EMAIL = 'Invalid email',
  PASSWORD_NOT_STRONG_ENOUGH = 'Password is not strong enough',
  PASSWORDS_DO_NOT_MATCH = 'Passwords do not match',

  //login
  INVALID_TOKEN = 'Invalid token',
  INVALID_USERNAME = 'Invalid username',
  INVALID_PASSWORD = 'Invalid password'
}

export class HttpError extends Error {
	status: number

	constructor (message: string, status: HttpStatus) {
		super(message)
		this.status = status
		Object.setPrototypeOf(this, HttpError.prototype) // to avoid issue with instanceof (see: https://github.com/Microsoft/TypeScript/wiki/FAQ#why-doesnt-extending-built-ins-like-error-array-and-map-work)
	}
}

export class UnauthorizedError extends HttpError {
	constructor (message: string) {
		super(message, HttpStatus.UNAUTHORIZED)
		this.name = HttpResponse.UNAUTHORIZED
		Object.setPrototypeOf(this, UnauthorizedError.prototype)
	}
}

export class ForbiddenError extends HttpError {
	constructor (message: string) {
		super(message, HttpStatus.FORBIDDEN)
		this.name = HttpResponse.FORBIDDEN
		Object.setPrototypeOf(this, ForbiddenError.prototype)
	}
}

export class UnprocessableEntityError extends HttpError {
	constructor (message: string) {
		super(message, HttpStatus.UNPROCESSABLE_ENTITY)
		this.name = HttpResponse.UNPROCESSABLE_ENTITY
		Object.setPrototypeOf(this, UnprocessableEntityError.prototype)
	}
}
