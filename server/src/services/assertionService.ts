import { UnprocessableEntityError } from '../types/errors'

class AssertionService {
	static instance: AssertionService

	assertTrue (condition: boolean, message: string): condition is true {
		if (!condition) {
			throw new UnprocessableEntityError(message)
		}
		return true
	}

	assertFalse (condition: boolean, message: string): condition is false {
		return this.assertTrue(!condition, message)
	}

	assertNull<T> (value: T | null, message: string): value is null {
		return this.assertTrue(value == null, message)
	}

	assertNotNull<T> (value: T | null, message: string): value is T {
		return this.assertTrue(value != null, message)
	}

	assertEqual (value: any, expected: any, message: string) {
		return this.assertTrue(value === expected, message)
	}

	static getInstance () {
		if (AssertionService.instance == null) {
			AssertionService.instance = new AssertionService()
		}

		return AssertionService.instance
	}
}

export default AssertionService.getInstance()
