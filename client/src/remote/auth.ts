import { LoginRequest, LoginResponse, RegisterRequest } from '@title/common/build/types/requests/auth'
import { Session } from '@title/common/build/types/session'
import api from './api'

const serviceName = 'auth'

const register = async (data: RegisterRequest): Promise<void> => {
	await api.call(serviceName, 'register', data)
}

const login = async (data: LoginRequest): Promise<LoginResponse> => {
	return api.call(serviceName, 'login', data)
}

const findSession = async (): Promise<Session | null> => {
	return api.call(serviceName, 'findSession')
}

const authService = {
	register,
	login,
	findSession
}

export default authService
