import { Language } from '../Language'
import { Session } from '../session'

export interface RegisterRequest {
	username: string
	email: string
	password: string
	passwordConfirmation: string
	language: Language
}

export interface LoginRequest {
	username: string
	password: string
}

export interface LoginResponse {
	token: string
	session: Session
}
