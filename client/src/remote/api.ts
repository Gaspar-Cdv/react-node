import { SERVER_URL } from '../config/environment'
import HttpError from '../types/HttpError'

/**
 * @throws {HttpError}
 */
const call = async <T>(service: string, method: string, data?: any): Promise<T> => {
	const url = `${SERVER_URL}/api/${service}/${method}`

	const response = await fetch(url, {
		method: 'POST',
		mode: 'cors',
		credentials: 'same-origin',
		headers: getHeaders(),
		body: JSON.stringify(data)
	})

	const clonedResponse = response.clone()

	let result

	try {
		result = await response.json()
	} catch (e) {
		result = await clonedResponse.text()
		if (result === '') {
			result = null
		}
	}

	if (!isSuccess(response.status)) {
		const message = typeof result === 'string' ? result : result.message
		throw new HttpError(response.status, message)
	}

	return result as T
}

const getHeaders = () => {
	const headers: HeadersInit = new Headers()
	headers.set('Content-Type', 'application/json;charset=UTF-8')

	const token = localStorage.getItem('token')
	if (token != null) {
		headers.set('Authorization', `Bearer ${token}`)
	}

	return headers
}

function isSuccess (status: number): boolean {
	return status >= 200 && status < 400
}

const api = {
	call
}

export default api
