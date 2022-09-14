import { ForgotPasswordRequest, ResetPasswordRequest, TokenRequest } from '@title/common/build/types/requests/auth'
import api from './api'

const serviceName = 'token'

const forgotPassword = async (email: string): Promise<void> => {
	return api.call(serviceName, 'forgotPassword', { email } as ForgotPasswordRequest)
}

const findResetPasswordToken = async (token?: string): Promise<void> => {
	return api.call(serviceName, 'findResetPasswordToken', { token } as TokenRequest)
}

const resetPassword = async (data: ResetPasswordRequest): Promise<void> => {
	return api.call(serviceName, 'resetPassword', data)
}

const tokenService = {
	forgotPassword,
	findResetPasswordToken,
	resetPassword
}

export default tokenService
