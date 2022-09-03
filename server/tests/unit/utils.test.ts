import chai from 'chai'
import { JSONValidator } from '../../src/utils/JSONValidator'

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
