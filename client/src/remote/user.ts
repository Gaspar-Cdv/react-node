import { Language } from '@title/common/build/types/Language'
import { ChangeLanguageRequest, ChangePasswordRequest, UpdateUserRequest } from '@title/common/build/types/requests/user'
import { UserDto } from '@title/common/build/types/session'
import { call } from './api'

const serviceName = 'user'

export const updateUser = async (data: UpdateUserRequest): Promise<UserDto> => {
	return call(serviceName, 'updateUser', data)
}

export const changePassword = async (data: ChangePasswordRequest): Promise<void> => {
	await call(serviceName, 'changePassword', data)
}

export const changeLanguage = async (language: Language): Promise<void> => {
	await call(serviceName, 'changeLanguage', { language } as ChangeLanguageRequest)
}
