import { ChangePasswordRequest, UpdateUserRequest } from '@title/common/build/types/requests/user'
import userService from '../remote/user'
import { defineI18n } from '../utils/i18n'
import { createUseForm } from './createUseForm'

const i18n = defineI18n({
	en: {
		userSettings: {
			title: 'User Settings',
			submit: 'Update Settings'
		},
		changePassword: {
			submit: 'Change password'
		}
	},
	fr: {
		userSettings: {
			title: 'Paramètres utilisateur',
			submit: 'Modifier les paramètres'
		},
		changePassword: {
			submit: 'Modifier le mot de passe'
		}
	}
})

export const useUpdateUserForm = createUseForm({
	action: async (values: UpdateUserRequest) => {
		await userService.updateUser(values)
		// dispatch(updateSession(session)) // TODO
	},
	titleKey: i18n.userSettings.title,
	submitKey: i18n.userSettings.submit,
	resetForm: false
})

export const useChangePasswordForm = createUseForm({
	action: async (values: ChangePasswordRequest) => {
		await userService.changePassword(values)
	},
	submitKey: i18n.changePassword.submit,
	resetForm: false
})
