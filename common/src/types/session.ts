import { Language } from './Language'

export interface Session {
	language: Language
  user: UserDto
}

export interface UserDto {
  userId: number
  username: string
  email: string
}
