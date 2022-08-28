import { SERVER_URL } from '../config/environment'
import HttpError from '../types/HttpError'

type CommonType = string | number | boolean

type Data = CommonType | {
	[key in string]: Data
}

/**
 * @throws {HttpError}
 */
const call = async (service: string, method: string, data?: Data) => {
	const url = `${SERVER_URL}/api/${service}/${method}`

	const response = await fetch(url, {
		method: 'POST',
		mode: 'cors',
		credentials: 'same-origin',
		headers: getHeaders(),
		body: JSON.stringify(data)
	})

	const result = await response.json()

	if (!isSuccess(response.status)) {
		throw new HttpError(response.status, result.message)
	}

	return result
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
