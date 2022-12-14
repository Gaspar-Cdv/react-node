import { JwtPayload } from 'jsonwebtoken'

export interface TokenPayload extends JwtPayload {
  userId: number,
  username: string,
  email: string
}
