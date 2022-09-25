import nodemailer from 'nodemailer'
import path from 'path'
import { MAIL_FROM, MAIL_HOST, MAIL_PASSWORD, MAIL_PORT, MAIL_SERVICE, MAIL_USERNAME } from '../config/environment'
import hbs, { HbsTransporter } from 'nodemailer-express-handlebars'
import { extractMailProperties, MailParams, MailTemplate, TEMPLATES } from '../types/mailTemplates'
import { SentMessageInfo } from 'nodemailer/lib/smtp-transport'
import { JSONValidator, ValidatorTemplate } from '../utils/JSONValidator'
import emailDao from '../dao/emailDao'
import logger from '../logger'
import { InternalServerError } from '../types/errors'
import { Prisma } from '@prisma/client'
import { prisma } from '../prisma'

const TEMPLATES_DIR = path.resolve(__dirname, '../templates')
const TEMPLATES_EXT = '.hbs'

class MailService {
	static instance: MailService

	private transporter: HbsTransporter

	constructor () {
		this.transporter = this.createTransporter()
		this.initializeTemplateEngine()
	}

	async sendMail (
		to: string,
		mailTemplate: MailTemplate,
		params: MailParams = {},
		tx: Prisma.TransactionClient = prisma
	): Promise<SentMessageInfo | null> {
		const { template, properties, requiredParams } = TEMPLATES[mailTemplate]
		this.checkRequiredParams(requiredParams, params)

		const { subject, title } = extractMailProperties(properties, params)
		const context = this.createContext(params, title)

		try {
			const mail = await this.transporter.sendMail({
				from: MAIL_FROM,
				to,
				subject,
				template,
				context
			})

			await emailDao.insert({
				recipient: to,
				template: mailTemplate,
				params
			}, tx)

			return mail
		} catch (e) {
			if (e instanceof Error) {
				logger.error(e.message) // probably 'No recipients defined' (or emailDao.insert())
				throw new InternalServerError()
			}
			return null
		}
	}

	checkRequiredParams (requiredParams: ValidatorTemplate, params: MailParams): void {
		const validator = new JSONValidator(requiredParams)
		const missingProperties = validator.findMissingProperties(params)

		if (missingProperties.length > 0) {
			logger.error(`Missing parameters in template: ${missingProperties.join(', ')}`)
			throw new InternalServerError()
		}
	}

	private createContext (userParams: MailParams, title?: string): MailParams {
		const currentYear = new Date().getFullYear()

		return {
			...userParams,
			header: {
				...(title != null && { title }),
			},
			footer: {
				currentYear
			}
		}
	}

	private createTransporter () {
		return nodemailer.createTransport({
			host: MAIL_HOST,
			port: MAIL_PORT,
			secure: true,
			service: MAIL_SERVICE,
			auth: {
				user: MAIL_USERNAME,
				pass: MAIL_PASSWORD
			},
			tls: {
				rejectUnauthorized: false
			},
			debug: true
		})
	}

	private initializeTemplateEngine () {
		this.transporter.use('compile', hbs({
			viewEngine: {
				partialsDir: TEMPLATES_DIR,
				layoutsDir: TEMPLATES_DIR,
				defaultLayout: false,
				extname: TEMPLATES_EXT
			},
			viewPath: TEMPLATES_DIR,
			extName: TEMPLATES_EXT
		}))
	}

	static getInstance (): MailService {
		if (!MailService.instance) {
			MailService.instance = new MailService()
		}

		return MailService.instance
	}
}

export default MailService.getInstance()
