import { LoginRequest, LoginResponse, RegisterRequest } from '@title/common/build/types/requests/auth'
import { Session } from '@title/common/build/types/session'
import { call } from './api'

const serviceName = 'auth'

export const register = async (data: RegisterRequest): Promise<void> => {
	await call(serviceName, 'register', data)
}

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
	return call(serviceName, 'login', data)
}

export const findSession = async (): Promise<Session | null> => {
	return call(serviceName, 'findSession')
}
