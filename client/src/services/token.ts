import { ForgotPasswordRequest, ResetPasswordRequest } from '@title/common/build/types/requests/auth'
import * as tokenService from '../remote/token'
import { defineI18n } from '../utils/i18n'
import { createUseForm } from './createUseForm'

const i18n = defineI18n({
	en: {
		forgotPassword: {
			submit: 'Send email',
			cancel: 'Cancel'
		},
		resetPassword: {
			title: 'Reset Password',
			submit: 'Reset Password'
		}
	},
	fr: {
		forgotPassword: {
			submit: 'Envoyer l\'email',
			cancel: 'Annuler'
		},
		resetPassword: {
			title: 'Réinitialiser le mot de passe',
			submit: 'Réinitialiser le mot de passe'
		}
	}
})

export const useForgotPasswordForm = createUseForm({
	action: async (values: ForgotPasswordRequest) => {
		await tokenService.forgotPassword(values.email)
	},
	submitKey: i18n.forgotPassword.submit,
	cancelKey: i18n.forgotPassword.cancel
})

export const useResetPasswordForm = createUseForm({
	action: async (values: ResetPasswordRequest) => {
		await tokenService.resetPassword(values)
	},
	titleKey: i18n.resetPassword.title,
	submitKey: i18n.resetPassword.submit
})
