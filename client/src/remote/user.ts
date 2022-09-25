import { Language } from '@title/common/build/types/Language'
import { ChangeLanguageRequest, ChangePasswordRequest, UpdateUserRequest } from '@title/common/build/types/requests/user'
import { UserDto } from '@title/common/build/types/session'
import api from './api'

const serviceName = 'user'

const updateUser = async (data: UpdateUserRequest): Promise<UserDto> => {
	return api.call(serviceName, 'updateUser', data)
}

const changePassword = async (data: ChangePasswordRequest): Promise<void> => {
	await api.call(serviceName, 'changePassword', data)
}

const changeLanguage = async (language: Language): Promise<void> => {
	await api.call(serviceName, 'changeLanguage', { language } as ChangeLanguageRequest)
}

const userService = {
	updateUser,
	changePassword,
	changeLanguage
}

export default userService
