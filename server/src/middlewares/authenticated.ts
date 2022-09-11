import { NextFunction } from 'express'
import authService from '../services/authService'
import { Req, Res } from '../types/requestResponse'

export const authenticated = (req: Req, res: Res, next: NextFunction) => {
	const token = authService.getTokenFromHeader(req)
	const { userId } = authService.extractPayloadFromToken(token)
	req.userId = userId

	next()
}
