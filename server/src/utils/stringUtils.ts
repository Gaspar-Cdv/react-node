export const getType = (object: any): string => {
	return Object.prototype.toString.call(object).slice(8, -1).toLowerCase()
}
