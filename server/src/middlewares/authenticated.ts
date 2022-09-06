import { ErrorMessage } from '@title/common/build/types/ErrorMessage'
import { NextFunction } from 'express'
import { NotBeforeError, TokenExpiredError } from 'jsonwebtoken'
import AuthService from '../services/authService'
import { ForbiddenError } from '../types/errors'
import { Req, Res } from '../types/requestResponse'

const authService = AuthService.getService()

export const authenticated = (req: Req, res: Res, next: NextFunction) => {
	const token = authService.getTokenFromHeader(req)

	try {
		const { userId } = authService.extractPayloadFromToken(token)
		req.userId = userId
	} catch (e) {
		if (e instanceof TokenExpiredError) {
			throw new ForbiddenError(ErrorMessage.EXPIRED_TOKEN)
		} else if (e instanceof NotBeforeError) {
			throw new ForbiddenError(ErrorMessage.NOT_ACTIVE_TOKEN)
		} else {
			throw new ForbiddenError(ErrorMessage.INVALID_TOKEN)
		}
	}

	next()
}
