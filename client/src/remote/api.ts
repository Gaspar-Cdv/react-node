import { SERVER_URL } from '../config/environment'
import HttpError from '../types/HttpError'

type HttpMethod = 'POST' | 'GET'

/**
 * @throws {HttpError}
 */
export async function call<T> (service: string, method: string, data?: any): Promise<T> {
	const url = buildUrl(service, method)
	const init = getRequestInit('POST', data)

	const response = await fetch(url, init)
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

function getRequestInit (method: HttpMethod, data?: any): RequestInit {
	const isFormData = data instanceof FormData

	return {
		method,
		mode: 'cors',
		credentials: 'same-origin',
		headers: getHeaders(isFormData),
		body: isFormData ? data : JSON.stringify(data)
	}
}

function getHeaders (isFormData = true) {
	const headers: HeadersInit = new Headers()

	if (!isFormData) { // do not specify content-type when form data (or specify boundary)
		headers.set('Content-Type', 'application/json;charset=UTF-8')
	}

	const token = localStorage.getItem('token')
	if (token != null) {
		headers.set('Authorization', `Bearer ${JSON.parse(token)}`)
	}

	return headers
}

export function buildUrl (service: string, method: string) {
	return `${SERVER_URL}/api/${service}/${method}`
}

function isSuccess (status: number): boolean {
	return status >= 200 && status < 400
}
