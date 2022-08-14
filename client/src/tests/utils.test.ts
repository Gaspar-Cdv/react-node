import { generateLoremIpsum } from '../utils/loremIpsum'
import { clamp } from '../utils/numberUtils'
import { assertIsValidHex, colorShader, fade, hexToRgb } from '../utils/stringUtils'

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

describe('stringUtils', () => {
	const invalidHexs = [
		'#',
		'#0',
		'#00',
		'#000',
		'#0000',
		'#00000',
		'#0000000',
		'#00000000',
		'000000',
		'#z1e6t9'
	]

	it('should shade a color by an amount', () => {
		expect(colorShader('#000000', -127)).toBe('rgb(0,0,0)')
		expect(colorShader('#000000', 0)).toBe('rgb(0,0,0)')
		expect(colorShader('#000000', 127)).toBe('rgb(127,127,127)')
		expect(colorShader('#000000', 255)).toBe('rgb(255,255,255)')
		expect(colorShader('#000000', 511)).toBe('rgb(255,255,255)')

		expect(colorShader('#ffffff', 127)).toBe('rgb(255,255,255)')
		expect(colorShader('#ffffff', 0)).toBe('rgb(255,255,255)')
		expect(colorShader('#ffffff', -127)).toBe('rgb(128,128,128)')
		expect(colorShader('#ffffff', -255)).toBe('rgb(0,0,0)')
		expect(colorShader('#ffffff', -511)).toBe('rgb(0,0,0)')

		invalidHexs.forEach(hex => {
			expect(() => colorShader(hex, 0)).toThrow('Invalid hex color')
		})
	})

	it('should fade a color by an amount', () => {
		expect(fade('#000000', -1)).toBe('rgba(0,0,0,0)')
		expect(fade('#000000', 0)).toBe('rgba(0,0,0,0)')
		expect(fade('#000000', 0.5)).toBe('rgba(0,0,0,0.5)')
		expect(fade('#000000', 1)).toBe('rgba(0,0,0,1)')
		expect(fade('#000000', 2)).toBe('rgba(0,0,0,1)')

		expect(fade('#ffffff', -1)).toBe('rgba(255,255,255,0)')
		expect(fade('#ffffff', 0)).toBe('rgba(255,255,255,0)')
		expect(fade('#ffffff', 0.5)).toBe('rgba(255,255,255,0.5)')
		expect(fade('#ffffff', 1)).toBe('rgba(255,255,255,1)')
		expect(fade('#ffffff', 2)).toBe('rgba(255,255,255,1)')

		invalidHexs.forEach(hex => {
			expect(() => fade(hex, 0)).toThrow('Invalid hex color')
		})
	})

	it('should convert a hex color to rgb array', () => {
		expect(hexToRgb('#000000')).toEqual([0, 0, 0])
		expect(hexToRgb('#ff0000')).toEqual([255, 0, 0])
		expect(hexToRgb('#00ff00')).toEqual([0, 255, 0])
		expect(hexToRgb('#0000ff')).toEqual([0, 0, 255])
		expect(hexToRgb('#ffff00')).toEqual([255, 255, 0])
		expect(hexToRgb('#ff00ff')).toEqual([255, 0, 255])
		expect(hexToRgb('#ffffff')).toEqual([255, 255, 255])

		invalidHexs.forEach(hex => {
			expect(() => hexToRgb(hex)).toThrow('Invalid hex color')
		})
	})

	it('should assert if a string is a valid hex color', () => {
		expect(() => assertIsValidHex('#000000')).not.toThrow()
		expect(() => assertIsValidHex('#ff0000')).not.toThrow()
		expect(() => assertIsValidHex('#00ff00')).not.toThrow()
		expect(() => assertIsValidHex('#0000ff')).not.toThrow()
		expect(() => assertIsValidHex('#ffff00')).not.toThrow()
		expect(() => assertIsValidHex('#ff00ff')).not.toThrow()
		expect(() => assertIsValidHex('#ffffff')).not.toThrow()

		invalidHexs.forEach(hex => {
			expect(() => assertIsValidHex(hex)).toThrow('Invalid hex color')
		})
	})
})
