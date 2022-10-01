import { ForgotPasswordRequest, ResetPasswordRequest, TokenRequest } from '@title/common/build/types/requests/auth'
import { call } from './api'

const serviceName = 'token'

export const forgotPassword = async (email: string): Promise<void> => {
	return call(serviceName, 'forgotPassword', { email } as ForgotPasswordRequest)
}

export const findResetPasswordToken = async (token?: string): Promise<void> => {
	return call(serviceName, 'findResetPasswordToken', { token } as TokenRequest)
}

export const resetPassword = async (data: ResetPasswordRequest): Promise<void> => {
	return call(serviceName, 'resetPassword', data)
}

export const verifyEmail = async (token?: string): Promise<void> => {
	return call(serviceName, 'verifyEmail', { token })
}

export const resendVerificationMail = async (): Promise<void> => {
	return call(serviceName, 'resendVerificationMail')
}
