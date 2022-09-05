import { ErrorMessage } from '@title/common/build/types/ErrorMessage'
import { LoginRequest, RegisterRequest } from '@title/common/build/types/requests/auth'
import { FormikHelpers } from 'formik'
import { useState } from 'react'
import { useRouter } from '../common/routing/hooks'
import authService from '../remote/auth'
import { deleteUser, updateSession } from '../store/session/reducer'
import { useAppDispatch } from '../store/store'
import HttpError from '../types/HttpError'
import { useLocalStorage, useOnMount } from '../utils/hooks'

export const useRegister = (onSuccess?: () => void) => {
	const [error, setError] = useState('')
	const [pending, setPending] = useState(false)

	const resetError = () => setError('')

	const register = async (values: RegisterRequest, formikHelpers: FormikHelpers<RegisterRequest>) => {
		try {
			setPending(true)
			await authService.register(values)
			formikHelpers.resetForm()
			resetError()
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

	return {
		register,
		error,
		resetError,
		pending
	}
}

export const useLogin = () => {
	const [, setToken] = useLocalStorage('token')
	const [, setLanguage] = useLocalStorage('language')
	const { navigate } = useRouter()
	const dispatch = useAppDispatch()

	const [error, setError] = useState('')
	const [pending, setPending] = useState(false)

	const resetError = () => setError('')

	const login = async (values: LoginRequest) => {
		try {
			setPending(true)
			const { token, session } = await authService.login(values)
			dispatch(updateSession(session))
			setToken(token)
			setLanguage(session.language)
			resetError()
			navigate('home')
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

	return {
		login,
		error,
		resetError,
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

export const useInitSession = () => {
	const dispatch = useAppDispatch()
	const [, setLanguage] = useLocalStorage('language')
	const logout = useLogout()

	useOnMount(() => {
		const fn = async () => {
			try {
				const session = await authService.findSession()
				dispatch(updateSession(session))
				setLanguage(session.language)
			} catch (e) {
				console.error(e)
				logout()
			}
		}

		fn()
	})
}
