import { Request, Response } from 'express'
import { Send } from 'express-serve-static-core'

export interface Req<T = any> extends Request {
  body: T
}

export interface Res<T = any> extends Response {
  json: Send<T, this>
}
