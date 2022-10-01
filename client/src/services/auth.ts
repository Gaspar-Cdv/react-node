import { LoginRequest, RegisterRequest } from '@title/common/build/types/requests/auth'
import { useState } from 'react'
import { useRouter } from '../common/routing/hooks'
import * as authService from '../remote/auth'
import { useLanguage } from '../store/session/hooks'
import { deleteUser, updateSession } from '../store/session/reducer'
import { useAppDispatch } from '../store/store'
import { useLocalStorage } from '../utils/hooks'
import { defineI18n } from '../utils/i18n'
import { createUseForm } from './createUseForm'

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
	const [language] = useLanguage()

	const useForm = createUseForm({
		action: async (values: Omit<RegisterRequest, 'language'>) => {
			await authService.register({ ...values, language })
		},
		titleKey: i18n.register.title,
		submitKey: i18n.register.submit
	})

	return useForm(onSuccess)
}

export const useLoginForm = () => {
	const [, setToken] = useLocalStorage('token')
	const [, setLanguage] = useLocalStorage('language')
	const { currentRoute, navigate } = useRouter()
	const dispatch = useAppDispatch()

	const useForm = createUseForm({
		action: async (values: LoginRequest) => {
			const { token, session } = await authService.login(values)
			dispatch(updateSession(session))
			setToken(token)
			setLanguage(session.language)
		},
		titleKey: i18n.login.title,
		submitKey: i18n.login.submit
	})

	return useForm(() => {
		if (currentRoute.name === 'login') {
			navigate('home')
		}
	})
}

export const useLogout = () => {
	const dispatch = useAppDispatch()
	const [, , deleteToken] = useLocalStorage('token')

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
