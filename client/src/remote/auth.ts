import { LoginRequest, LoginResponse, RegisterRequest } from '@title/common/build/types/requests/auth'
import api from './api'

const serviceName = 'auth'

const register = async (data: RegisterRequest): Promise<void> => {
	await api.call(serviceName, 'register', data)
}

const login = async (data: LoginRequest): Promise<LoginResponse> => {
	return await api.call(serviceName, 'login', data)
}

const authService = {
	register,
	login
}

export default authService
