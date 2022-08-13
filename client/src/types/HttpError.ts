class HttpError extends Error {

	status: number
	date: Date

	constructor (status: number, message: string) {
		super(message)
		this.name = 'HttpError'
		this.status = status
		this.date = new Date()
	}

}

export default HttpError
