import { ErrorMessage } from '@title/common/build/types/ErrorMessage'
import { ChangePasswordRequest, UpdateUserRequest } from '@title/common/build/types/requests/user'
import { useState } from 'react'
import userService from '../remote/user'
import HttpError from '../types/HttpError'
import { defineI18n, useTranslate } from '../utils/i18n'

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

export const useUpdateUserForm = () => {
	const translate = useTranslate()
	const [error, setError] = useState('')
	const [pending, setPending] = useState(false)

	const onChange = () => setError('')

	const onSubmit = async (values: UpdateUserRequest) => {
		try {
			setPending(true)
			await userService.updateUser(values)
			// dispatch(updateSession(session)) // TODO
			onChange()
		} catch (e) {
			if (e instanceof HttpError) {
				setError(e.message)
			} else {
				setError(ErrorMessage.UNKNOWN_ERROR)
				console.error(e)
			}
		} finally {
			setPending(false)
		}
	}

	const title = translate(i18n.userSettings.title)
	const submitLabel = translate(i18n.userSettings.submit)

	return {
		title,
		submitLabel,
		onSubmit,
		error,
		onChange,
		pending
	}
}

export const useChangePasswordForm = (handleClose: () => void) => {
	const translate = useTranslate()
	const [error, setError] = useState('')
	const [pending, setPending] = useState(false)

	const onChange = () => setError('')

	const onSubmit = async (values: ChangePasswordRequest) => {
		try {
			setPending(true)
			await userService.changePassword(values)
			handleClose()
			onChange()
		} catch (e) {
			if (e instanceof HttpError) {
				setError(e.message)
			} else {
				setError(ErrorMessage.UNKNOWN_ERROR)
				console.error(e)
			}
		} finally {
			setPending(false)
		}
	}

	const submitLabel = translate(i18n.changePassword.submit)

	return {
		submitLabel,
		onSubmit,
		error,
		onChange,
		pending
	}
}
