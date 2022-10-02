import { call } from './api'

const serviceName = 'image'

export const uploadAvatar = async (formData: FormData): Promise<void> => {
	return call(serviceName, 'uploadAvatar', formData)
}
