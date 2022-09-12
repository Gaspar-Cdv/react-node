import { Language } from '../Language'

export interface UpdateUserRequest {
	username: string
	email: string
}

export interface ChangePasswordRequest {
	password: string
	passwordConfirmation: string
	oldPassword: string
}

export interface ChangeLanguageRequest {
	language: Language
}
