import { generateLoremIpsum } from '../utils/loremIpsum'
import { clamp } from '../utils/numberUtils'

describe('Lorem ipsum', () => {
	it('should generate a single paragraph if no argument is passed', () => {
		const defaultLorem = generateLoremIpsum()
		expect(defaultLorem).toHaveLength(1)
		expect(defaultLorem[0].startsWith('Lorem ipsum')).toBe(true)
	})

	it('should generate as much as paragraphs as specified', () => {
		for (let i = 1; i < 20; i++) {
			const lorem = generateLoremIpsum(i)
			expect(lorem).toHaveLength(i)
			const [first, ...rest] = lorem
			expect(first.startsWith('Lorem ipsum')).toBe(true)
			expect(rest.every(p => !p.startsWith('Lorem ipsum'))).toBe(true)
		}
	})

	it('should throw an error if the argument is less than 1', () => {
		expect(() => generateLoremIpsum(0)).toThrow('Paragraphs argument must be greater than 0')
		expect(() => generateLoremIpsum(-1)).toThrow('Paragraphs argument must be greater than 0')
	})
})

describe('numberUtils', () => {
	it('should clamp a number between a min and max', () => {
		expect(clamp(-1, 0, 1)).toBe(0)
		expect(clamp(0, 0, 1)).toBe(0)
		expect(clamp(0.5, 0, 1)).toBe(0.5)
		expect(clamp(1, 0, 1)).toBe(1)
		expect(clamp(2, 0, 1)).toBe(1)
	})
})
