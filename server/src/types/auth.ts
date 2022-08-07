import { JwtPayload } from 'jsonwebtoken'

export interface TokenPayload extends JwtPayload {
  userId: number,
  username: string,
  email: string
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
  passwordConfirmation: string
}

export interface LoginRequest {
  username: string
  password: string
}
