import { ErrorMessage } from '@title/common/build/types/ErrorMessage'
import { LoginRequest, RegisterRequest } from '@title/common/build/types/requests/auth'
import { FormikHelpers } from 'formik'
import { useState } from 'react'
import { useRouter } from '../common/routing/hooks'
import authService from '../remote/auth'
import { useLanguage } from '../store/session/hooks'
import { deleteUser, updateSession } from '../store/session/reducer'
import { useAppDispatch } from '../store/store'
import HttpError from '../types/HttpError'
import { useLocalStorage } from '../utils/hooks'
import { defineI18n, useTranslate } from '../utils/i18n'

const i18n = defineI18n({
	en: {
		register: {
			title: 'Register',
			submit: 'Register'
		},
		login: {
			title: 'Login',
			submit: 'Login'
		}
	},
	fr: {
		register: {
			title: 'S\'inscrire',
			submit: 'S\'inscrire'
		},
		login: {
			title: 'Se connecter',
			submit: 'Se connecter'
		}
	}
})

export const useRegisterForm = (onSuccess?: () => void) => {
	const translate = useTranslate()
	const [error, setError] = useState('')
	const [pending, setPending] = useState(false)
	const [language] = useLanguage()

	const onChange = () => setError('')

	const onSubmit = async (values: RegisterRequest, formikHelpers: FormikHelpers<RegisterRequest>) => {
		try {
			setPending(true)
			await authService.register({ ...values, language })
			formikHelpers.resetForm()
			onChange()
			onSuccess?.()
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

	const title = translate(i18n.register.title)
	const submitLabel = translate(i18n.register.submit)

	return {
		title,
		submitLabel,
		onSubmit,
		error,
		onChange,
		pending
	}
}

export const useLoginForm = () => {
	const translate = useTranslate()
	const [, setToken] = useLocalStorage('token')
	const [, setLanguage] = useLocalStorage('language')
	const { currentRoute, navigate } = useRouter()
	const dispatch = useAppDispatch()

	const [error, setError] = useState('')
	const [pending, setPending] = useState(false)

	const onChange = () => setError('')

	const onSubmit = async (values: LoginRequest) => {
		try {
			setPending(true)
			const { token, session } = await authService.login(values)
			dispatch(updateSession(session))
			setToken(token)
			setLanguage(session.language)
			onChange()
			if (currentRoute.name === 'login') {
				navigate('home')
			}
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

	const title = translate(i18n.login.title)
	const submitLabel = translate(i18n.login.submit)

	return {
		title,
		submitLabel,
		onSubmit,
		error,
		onChange,
		pending
	}
}

export const useLogout = () => {
	const dispatch = useAppDispatch()
	const [,, deleteToken] = useLocalStorage('token')

	return () => {
		dispatch(deleteUser())
		deleteToken()
	}
}

export const useFindSession = () => {
	const dispatch = useAppDispatch()
	const [, setLanguage] = useLocalStorage('language')
	const logout = useLogout()

	const [pending, setPending] = useState(true)

	const findSession = async () => {
		try {
			setPending(true)
			const session = await authService.findSession()
			if (session != null) {
				dispatch(updateSession(session))
				setLanguage(session.language)
			}
		} catch (e) {
			console.error(e)
			logout()
		} finally {
			setPending(false)
		}
	}

	return [findSession, pending] as const
}
