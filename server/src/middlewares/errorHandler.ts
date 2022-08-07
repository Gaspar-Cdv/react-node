import { NextFunction, Request, Response } from 'express'
import { HttpError } from '../types/errors'

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const status = err instanceof HttpError ? err.status : 500
  res.status(status).json({
    status,
    name: err.name,
    message: err.message,
  })
}
