/**
 * Clamps a number between a minimum and maximum value.
 * @param value - The number to clamp.
 * @param min - The minimum value.
 * @param max - The maximum value.
 * @returns The clamped number.
 */
export const clamp = (value: number, min: number, max: number) => {
	return Math.min(max, Math.max(min, value))
}
