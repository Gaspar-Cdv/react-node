import { injectParams } from '../common/routing/Router'

describe('injectParams', () => {
	it('should inject params into url', () => {
		const url = '/:foo/:bar'
		const params = { foo: 'foofoo', bar: 'barbar' }
		const result = injectParams(url, params)

		expect(result).toBe('/foofoo/barbar')
	})

	it('should inject params correctly if they start with the same characters', () => {
		const url = '/:foo/:foofoo'
		const params = { foo: 'bar', foofoo: 'barbar' }
		const result = injectParams(url, params)

		expect(result).toBe('/bar/barbar')
	})

	it('should not inject params into url if no params are provided', () => {
		const url = '/foo/bar'
		const result = injectParams(url)

		expect(result).toBe('/foo/bar')
	})

	it('should throw an error if one of the params is missing', () => {
		const url = '/:foo/:bar'
		const params = { foo: 'foofoo' }
		const result = () => injectParams(url, params)

		expect(result).toThrowError(`Missing param for the route ${url}`)
	})
})
