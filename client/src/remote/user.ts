import { Language } from '@title/common/build/types/Language'
import api from './api'

const serviceName = 'user'

const changeLanguage = async (language: Language): Promise<void> => {
	await api.call(serviceName, 'changeLanguage', { language })
}

const userService = {
	changeLanguage
}

export default userService
