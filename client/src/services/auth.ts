import { ErrorMessage } from '@title/common/build/types/ErrorMessage'
import { LoginRequest, RegisterRequest } from '@title/common/build/types/requests/auth'
import { FormikHelpers } from 'formik'
import { useState } from 'react'
import { useRouter } from '../common/routing/hooks'
import authService from '../remote/auth'
import HttpError from '../types/HttpError'
import { useLocalStorage } from '../utils/hooks'

export const useRegister = (onSuccess?: () => void) => {
	const [error, setError] = useState('')
	const [pending, setPending] = useState(false)

	const resetError = () => setError('')

	const register = async (values: RegisterRequest, formikHelpers: FormikHelpers<RegisterRequest>) => {
		try {
			setPending(true)
			await authService.register(values)
			formikHelpers.resetForm()
			setError('')
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
	const { navigate } = useRouter()

	const [error, setError] = useState('')
	const [pending, setPending] = useState(false)

	const resetError = () => setError('')

	const login = async (values: LoginRequest) => {
		try {
			setPending(true)
			const { token } = await authService.login(values)
			setToken(token)
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
