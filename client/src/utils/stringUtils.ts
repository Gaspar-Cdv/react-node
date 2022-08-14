import { clamp } from './numberUtils'

export const colorShader = (hex: string, amount: number): string => {
	assertIsValidHex(hex)
	return `rgb(${hexToRgb(hex).map(c => clamp(c + amount, 0, 255)).join(',')})`
}

export const fade = (hex: string, opacity: number): string => {
	assertIsValidHex(hex)
	return `rgba(${hexToRgb(hex).join(',')}, ${clamp(opacity, 0, 1)})`
}

export const hexToRgb = (hex: string): number[] => {
	assertIsValidHex(hex)
	const hexaCode = hex.startsWith('#') ? hex.slice(1) : hex
	return hexaCode.match(/../g)!.map(color => parseInt(color, 16))
}

export const isValidHex = (hex: string): boolean => {
	return /^#?[0-9A-F]{6}$/i.test(hex)
}

export const assertIsValidHex = (hex: string) => {
	if (!isValidHex(hex)) {
		throw new Error('Invalid hex color')
	}
}
