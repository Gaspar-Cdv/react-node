import { UnprocessableEntityError } from '../types/errors'

export default class AssertionService {
	static service: AssertionService

	assertTrue (condition: boolean, message: string) {
		if (!condition) {
			throw new UnprocessableEntityError(message)
		}
	}

	assertFalse (condition: boolean, message: string) {
		this.assertTrue(!condition, message)
	}

	assertNull (value: any, message: string) {
		this.assertTrue(value == null, message)
	}

	assertNotNull (value: any, message: string) {
		this.assertTrue(value != null, message)
	}

	assertEqual (value: any, expected: any, message: string) {
		this.assertTrue(value === expected, message)
	}

	static getService () {
		if (AssertionService.service == null) {
			AssertionService.service = new AssertionService()
		}

		return AssertionService.service
	}
}
