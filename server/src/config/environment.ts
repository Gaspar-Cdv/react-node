import 'dotenv/config'

const ENV = process.env.ENV || 'dev' as 'dev' | 'test' | 'prod'

const HOSTNAME = process.env.HOSTNAME || 'localhost'
const PORT = parseInt(process.env.PORT || '3000')

const JWT_SECRET = process.env.JWT_SECRET || 'secret'
const JWT_EXPIRATION_TIME = parseInt(process.env.JWT_EXPIRATION || '3600')

export {
  ENV,

  HOSTNAME,
  PORT,

  JWT_SECRET,
  JWT_EXPIRATION_TIME
}
