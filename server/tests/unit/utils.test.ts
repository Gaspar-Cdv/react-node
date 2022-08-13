import chai from 'chai'
import { JSONValidator } from '../../src/utils/JSONValidator'
import { isEmailValid, isPasswordStrongEnough } from '../../src/utils/stringUtils'

const { expect } = chai

describe('JSONValidator', () => {
	it('should correctly find missing properties from an object', () => {
		const noParamsValidator = new JSONValidator({})
		const simpleValidator = new JSONValidator({
			string: 'string',
			number: 'number'
		})
		const nestedValidator = new JSONValidator({
			string: 'string',
			x: {
				number: 'number',
				y: {
					boolean: 'boolean'
				}
			}
		})

		const string = 'abc'
		const number = 123
		const boolean = true

		expect(noParamsValidator.findMissingProperties({})).to.eql([])
		expect(noParamsValidator.findMissingProperties({ string, number, boolean })).to.eql([])

		expect(simpleValidator.findMissingProperties({})).to.eql(['string', 'number'])
		expect(simpleValidator.findMissingProperties({ string })).to.eql(['number'])
		expect(simpleValidator.findMissingProperties({ number })).to.eql(['string'])
		expect(simpleValidator.findMissingProperties({ boolean })).to.eql(['string', 'number'])
		expect(simpleValidator.findMissingProperties({ string, number })).to.eql([])
		expect(simpleValidator.findMissingProperties({ string, boolean })).to.eql(['number'])
		expect(simpleValidator.findMissingProperties({ number, boolean })).to.eql(['string'])
		expect(simpleValidator.findMissingProperties({ string, number, boolean })).to.eql([])

		expect(nestedValidator.findMissingProperties({})).to.eql(['string', 'x.number', 'x.y.boolean'])
		expect(nestedValidator.findMissingProperties({ string })).to.eql(['x.number', 'x.y.boolean'])
		expect(nestedValidator.findMissingProperties({ x: { number } })).to.eql(['string', 'x.y.boolean'])
		expect(nestedValidator.findMissingProperties({ x: { y: { boolean } } })).to.eql(['string', 'x.number'])
		expect(nestedValidator.findMissingProperties({ string, x: { number } })).to.eql(['x.y.boolean'])
		expect(nestedValidator.findMissingProperties({ string, x: { y: { boolean } } })).to.eql(['x.number'])
		expect(nestedValidator.findMissingProperties({ x: { number, y: { boolean } } })).to.eql(['string'])
		expect(nestedValidator.findMissingProperties({ string, x: { number, y: { boolean } } })).to.eql([])
	})
})

describe('stringUtils', () => {
	it('should verify if email is valid', () => {
		const correctEmails = [
			'test@test.com',
			'test.test@test.com',
			'test@test.test.com',
			'test-test@test.com',
			'test@test-test.com',
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
			'test.@test.com',
			'test-@test.com',
			'test@.test.com',
			'test@-test.com',
			'test@test..com',
			'test@test-.com',
			'test@test.-com',
			'test@test.com.',
			'test@test.com-',
			'test@test@test.com'
		]

		const toDispatch = [ // TODO are these emails valid?
			'123@test.com',
			'test@123.com',
			'test@test.123'
		]

		expect(correctEmails.every(email => isEmailValid(email))).to.be.true
		expect(incorrectEmails.every(email => !isEmailValid(email))).to.be.true
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

		expect(softCorrectPasswords.every(password => isPasswordStrongEnough(password))).to.be.true
		expect(hardCorrectPasswords.every(password => isPasswordStrongEnough(password))).to.be.true
		expect(incorrectPasswords.every(password => !isPasswordStrongEnough(password))).to.be.true

		expect(hardCorrectPasswords.every(password => isPasswordStrongEnough(password, true))).to.be.true
		expect(softCorrectPasswords.every(password => !isPasswordStrongEnough(password, true))).to.be.true
		expect(incorrectPasswords.every(password => !isPasswordStrongEnough(password, true))).to.be.true
	})
})