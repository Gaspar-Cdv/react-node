import { ValidatorTemplate } from '../utils/JSONValidator'

export enum MailTemplate {
	CONFIRM_EMAIL,
	RESET_PASSWORD
}

export interface MailParams {
	[key: string]: MailParams | string | number | boolean
}

type MailProperty = ((params: MailParams) => string) | string

interface MailProperties {
	subject: MailProperty
	title?: MailProperty
}

interface TemplateParams {
	template: string
	properties: MailProperties
	requiredParams: ValidatorTemplate
}

interface TemplatesParams {
	[key: string]: TemplateParams
}

export const TEMPLATES: TemplatesParams = {
	[MailTemplate.CONFIRM_EMAIL]: {
		template: 'confirm-email',
		properties: {
			subject: 'Confirm your email',
			title: ({ username }) => `Confirm you email ${username}`,
		},
		requiredParams: {
			username: 'string',
			confirmationLink: 'string'
		}
	},
	[MailTemplate.RESET_PASSWORD]: {
		template: 'reset-password',
		properties: {
			subject: ({ username }) => `Reset your password ${username}`,
			title: 'Reset your password',
		},
		requiredParams: {
			username: 'string',
			resetLink: 'string'
		}
	}
}

export const extractMailProperties = (properties: MailProperties, params: MailParams) => {
	return {
		subject: extractMailProperty(properties.subject, params),
		title: extractMailProperty(properties.title, params)
	}
}

const extractMailProperty = (property?: MailProperty, params: MailParams = {}): string | undefined => {
	return typeof property === 'function' ? property(params) : property
}
