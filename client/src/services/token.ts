import { ForgotPasswordRequest } from '@title/common/build/types/requests/auth'
import tokenService from '../remote/token'
import { defineI18n } from '../utils/i18n'
import { createUseForm } from './createUseForm'

const i18n = defineI18n({
	en: {
		forgotPassword: {
			submit: 'Send email'
		},
	},
	fr: {
		forgotPassword: {
			submit: 'Envoyer l\'email'
		},
	}
})

export const useForgotPasswordForm = createUseForm({
	action: async (values: ForgotPasswordRequest) => {
		await tokenService.forgotPassword(values.email)
	},
	submitKey: i18n.forgotPassword.submit
})
