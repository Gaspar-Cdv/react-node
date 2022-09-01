import { HttpResponse, HttpStatus } from './http'

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
