import 'dotenv/config'

const ENV = process.env.ENV || 'dev' as 'dev' | 'test' | 'prod'

const HOSTNAME = process.env.HOSTNAME || 'localhost'
const PORT = parseInt(process.env.PORT || '3000')

export {
  ENV,

  HOSTNAME,
  PORT

}
