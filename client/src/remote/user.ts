import { Language } from '@title/common/build/types/Language'
import { ChangePasswordRequest, UpdateUserRequest } from '@title/common/build/types/requests/user'
import api from './api'

const serviceName = 'user'

const updateUser = async (data: UpdateUserRequest): Promise<void> => {
	await api.call(serviceName, 'updateUser', data)
}

const changePassword = async (data: ChangePasswordRequest): Promise<void> => {
	await api.call(serviceName, 'changePassword', data)
}

const changeLanguage = async (language: Language): Promise<void> => {
	await api.call(serviceName, 'changeLanguage', { language })
}

const userService = {
	updateUser,
	changePassword,
	changeLanguage
}

export default userService
