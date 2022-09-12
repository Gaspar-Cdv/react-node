import { expect } from 'chai'
import { emailValidator, passwordValidator } from '../services/validation'

describe('validation', () => {
	it('should verify if email is valid', () => {
		const correctEmails = [
			'test@test.com',
			'test.test@test.com',
			'test@test.test.com',
			'test-test@test.com',
			'test@test-test.com',
			'test_test@test.com',
			'test+test@test.com',
			'test123@test.com',
			'test@test123.com',
			'TEST@test.com',
			'test@TEST.com',
			'test@test.COM'
		]

		const incorrectEmails = [
			'test',
			'test@test',
			'test.com',
			'@test.com',
			'test@.com',
			'test@test.',
			'.test@test.com',
			'-test@test.com',
			'_test@test.com',
			'+test@test.com',
			'test.@test.com',
			'test-@test.com',
			'test_@test.com',
			'test+@test.com',
			'test@.test.com',
			'test@-test.com',
			'test@_test.com',
			'test@+test.com',
			'test@test..com',
			'test@test-.com',
			'test@test_.com',
			'test@test+.com',
			'test@test.-com',
			'test@test._com',
			'test@test.+com',
			'test@test.com.',
			'test@test.com-',
			'test@test.com_',
			'test@test.com+',
			'test@test@test.com'
		]

		const toDispatch = [ // TODO are these emails valid?
			'test@test_test.com',
			'test@test+test.com',
			'123@test.com',
			'test@123.com',
			'test@test.123'
		]

		expect(correctEmails.every(email => emailValidator.isValidSync(email))).to.be.true
		expect(incorrectEmails.every(email => !emailValidator.isValidSync(email))).to.be.true
	})

	it('should verify if password is strong enough', () => {
		const softCorrectPasswords = [
			'abcABC123',
			'abcABC.!?',
			'abc123.!?',
			'ABC123.!?',
			'abAB12.!?'
		]

		const hardCorrectPasswords = [
			'abcABC123.!?'
		]

		const incorrectPasswords = [
			'abcdefgh',
			'ABCDEFGH',
			'12345678',
			'.!?@/-_()',
			'abcdABCD',
			'abcd1234',
			'abcd.!?@',
			'ABCD1234',
			'ABCD.!?@',
			'1234.!?@',
			'abAB12!'
		]

		const toDispatch = [ // TODO handle diacritics
			'àéôABC123'
		]

		expect(softCorrectPasswords.every(password => passwordValidator(false).isValidSync(password))).to.be.true
		expect(hardCorrectPasswords.every(password => passwordValidator(false).isValidSync(password))).to.be.true
		expect(incorrectPasswords.every(password => !passwordValidator(false).isValidSync(password))).to.be.true

		expect(hardCorrectPasswords.every(password => passwordValidator(true).isValidSync(password))).to.be.true
		expect(softCorrectPasswords.every(password => !passwordValidator(true).isValidSync(password))).to.be.true
		expect(incorrectPasswords.every(password => !passwordValidator(true).isValidSync(password))).to.be.true
	})
})
