import { LoginFormValues } from '../components/Login/LoginForm'
import { RegisterFormValues } from '../components/Register/RegisterForm'
import api from './api'

const serviceName = 'auth'

const register = async (registerForm: RegisterFormValues): Promise<void> => {
	await api.call(serviceName, 'register', registerForm)
}

const login = async (loginForm: LoginFormValues): Promise<{ token: string }> => {
	return await api.call(serviceName, 'login', loginForm)
}

const authService = {
	register,
	login
}

export default authService
