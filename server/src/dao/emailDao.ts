import { Email } from '@prisma/client'
import { prisma } from '../prisma'
import { MailParams, MailTemplate } from '../types/mailTemplates'

interface InsertEmail {
	recipient: string,
	template: MailTemplate
	params: MailParams
}

class EmailDao {

	static instance: EmailDao

	insert = async (data: InsertEmail): Promise<Email> => {
		return prisma.email.create({ data })
	}

	findLastByEmail = async (recipient: string): Promise<Email | null> => {
		return prisma.email.findFirst({ where: { recipient }, orderBy: { date: 'desc' } })
	}

	/* STATIC */

	static getInstance = () => {
		if (EmailDao.instance == null) {
			EmailDao.instance = new EmailDao()
		}

		return EmailDao.instance
	}
}

export default EmailDao.getInstance()
