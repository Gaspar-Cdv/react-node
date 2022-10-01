import { NextFunction, Request, Response } from 'express'
import logger from '../logger'
import { HttpError, InternalServerError } from '../types/errors'

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
	try {
		if (error instanceof HttpError) {
			throw error
		} else {
			logger.error(error.message)
			throw new InternalServerError()
		}
	} catch (e) {
		if (e instanceof HttpError) {
			res.status(e.status).json({
				status: e.status,
				name: e.name,
				message: e.message,
			})
		}
	}
}
