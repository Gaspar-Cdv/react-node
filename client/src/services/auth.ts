import { RegisterFormValues } from '../components/Register/RegisterForm'
import api from './api'

const serviceName = 'auth'

const register = async (registerForm: RegisterFormValues): Promise<void> => {
	await api.call(serviceName, 'register', registerForm)
}

const authService = {
	register
}

export default authService
