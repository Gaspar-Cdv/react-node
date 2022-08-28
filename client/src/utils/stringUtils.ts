/**
 * Generate a random id, in base 36.
 * The id can be prefixed with a string.
 * If so, an hyphen will be inserted between the prefix and the id.
 * @param prefix The prefix to add to the id.
 * @returns The generated id.
 */
export const generateId = (prefix?: string): string => {
	const id = Math.random().toString(36).slice(2)
	return prefix != null ? `${prefix}-${id}` : id
}
