import { createLogger, format, transports } from 'winston'
import { ENV } from './config/environment'

const logger = createLogger({
	level: 'info',
	format: format.combine(
		format.timestamp({
			format: 'DD/MM/YYYY HH:mm:ss'
		}),
		format.errors({ stack: true }),
		format.splat(),
		format.json()
	),
	defaultMeta: { service: 'your-service-name' },
	transports: [
		new transports.File({ filename: 'logs/error.log', level: 'error' }),
		new transports.File({ filename: 'logs/info.log' })
	]
})

if (ENV !== 'prod') {
	logger.add(new transports.Console({
		format: format.combine(
			format.colorize(),
			format.simple()
		)
	}))
}

export default logger
