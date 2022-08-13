export const getType = (object: any): string => {
	return Object.prototype.toString.call(object).slice(8, -1).toLowerCase()
}

export const isEmailValid = (email: string): boolean => {
	return /^([a-z0-9]+(?:[._-][a-z0-9]+)*)@([a-z0-9]+(?:[.-][a-z0-9]+)*\.[a-z]{2,})$/i.test(email)
}

export const isPasswordStrongEnough = (password: string, hardcheck = false): boolean => {
	// Handle diacritics in regex
	const MINIMUM_LENGTH = hardcheck ? 12 : 8
	const MINIMUM_TYPES = hardcheck ? 4 : 3

	const isLongEnough = password.length >= MINIMUM_LENGTH
	const hasEnoughTypes = [
		/[a-z]/.test(password),
		/[A-Z]/.test(password),
		/[0-9]/.test(password),
		/[^a-zA-Z0-9]/.test(password),
	].filter(Boolean).length >= MINIMUM_TYPES

	return isLongEnough && hasEnoughTypes
}
