import { ChangePasswordRequest, UpdateUserRequest } from '@title/common/build/types/requests/user'
import * as userService from '../remote/user'
import { updateUser } from '../store/session/reducer'
import { useAppDispatch } from '../store/store'
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

export const useUpdateUserForm = (onSuccess?: () => void) => {
	const dispatch = useAppDispatch()

	const useForm = createUseForm({
		action: async (values: UpdateUserRequest) => {
			const user = await userService.updateUser(values)
			dispatch(updateUser(user))
		},
		titleKey: i18n.userSettings.title,
		submitKey: i18n.userSettings.submit,
		resetForm: false
	})

	return useForm(onSuccess)
}

export const useChangePasswordForm = createUseForm({
	action: async (values: ChangePasswordRequest) => {
		await userService.changePassword(values)
	},
	submitKey: i18n.changePassword.submit,
	resetForm: false
})
