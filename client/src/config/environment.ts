const ENV = process.env['ENV'] || 'dev' as 'dev' | 'test' | 'prod'

const SERVER_URL = process.env['SERVER_URL'] || 'http://localhost:3001'

export {
	ENV,

	SERVER_URL
}
