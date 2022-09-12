import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { MAIL_FROM } from '../../src/config/environment'
import { MailParams, MailTemplate } from '../../src/types/mailTemplates'
import mailService from '../../src/services/mailService'

chai.use(chaiAsPromised)
const { expect } = chai

describe('mailService', () => {
	it('should send an email', async () => {
		const recipient = 'gaspar.chefdeville@gmail.com'
		const mailTemplate = MailTemplate.CONFIRM_EMAIL
		const mailParams: MailParams = {
			username: 'Gaspar',
			confirmationLink: 'http://localhost:3000/confirm-email'
		}

		const messageInfo = await mailService.sendMail(recipient, mailTemplate, mailParams)
		expect(messageInfo).not.to.be.null
		const { accepted, rejected, envelope: { from, to } } = messageInfo!
		expect(accepted).to.have.lengthOf(1)
		expect(accepted[0]).to.equal(recipient)
		expect(rejected).to.have.lengthOf(0)
		expect(from).to.equal(MAIL_FROM)
		expect(to).to.have.lengthOf(1)
		expect(to[0]).to.equal(recipient)
	})

	it('should throw an error if the recipient is not valid', async () => {
		const recipient = 'invalid recipent'
		const mailTemplate = MailTemplate.CONFIRM_EMAIL
		const mailParams: MailParams = {
			username: 'Gaspar',
			confirmationLink: 'http://localhost:3000/confirm-email'
		}

		expect(mailService.sendMail(recipient, mailTemplate, mailParams)).to.be.rejectedWith(Error, 'No recipients defined')
	})

	it('should throw an error if one of the params is missing', async () => {
		const recipient = 'gaspar.chefdeville@gmail.com'
		const mailTemplate = MailTemplate.CONFIRM_EMAIL
		const username = 'Gaspar'
		const confirmationLink = 'http://localhost:3000/confirm-email'

		expect(mailService.sendMail(recipient, mailTemplate)).to.be.rejectedWith(Error, 'Missing parameters in template: username, confirmationLink')
		expect(mailService.sendMail(recipient, mailTemplate, {})).to.be.rejectedWith(Error, 'Missing parameters in template: username, confirmationLink')
		expect(mailService.sendMail(recipient, mailTemplate, { username })).to.be.rejectedWith(Error, 'Missing parameters in template: confirmationLink')
		expect(mailService.sendMail(recipient, mailTemplate, { confirmationLink })).to.be.rejectedWith(Error, 'Missing parameters in template: username')
	})
})
