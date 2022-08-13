import 'dotenv/config'

const ENV = process.env['ENV'] || 'dev' as 'dev' | 'test' | 'prod'

const HOSTNAME = process.env['HOSTNAME'] || 'localhost'
const PORT = parseInt(process.env['PORT'] || '3001')

const JWT_SECRET = process.env['JWT_SECRET'] || 'secret'
const JWT_EXPIRATION_TIME = parseInt(process.env['JWT_EXPIRATION'] || '3600')

const MAIL_HOST = process.env['MAIL_HOST'] || 'smtp.gmail.com'
const MAIL_PORT = parseInt(process.env['MAIL_PORT'] || '587')
const MAIL_SERVICE = process.env['MAIL_SERVICE'] || 'gmail'
const MAIL_USERNAME = process.env['MAIL_USERNAME'] || ''
const MAIL_PASSWORD = process.env['MAIL_PASSWORD'] || ''
const MAIL_FROM = process.env['MAIL_FROM'] || ''

export {
	ENV,

	HOSTNAME,
	PORT,

	JWT_SECRET,
	JWT_EXPIRATION_TIME,

	MAIL_HOST,
	MAIL_PORT,
	MAIL_SERVICE,
	MAIL_USERNAME,
	MAIL_PASSWORD,
	MAIL_FROM
}
