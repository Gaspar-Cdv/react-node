import { Language } from '@title/common/build/types/Language'
import api from './api'

const serviceName = 'user'

const changeLanguage = async (data: Language): Promise<void> => {
	await api.call(serviceName, 'changeLanguage', data)
}

const userService = {
	changeLanguage
}

export default userService
