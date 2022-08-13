import { getType } from './stringUtils'

const ALLOWED_TYPES = ['string', 'number', 'boolean'] as const

type AllowedType = typeof ALLOWED_TYPES[number]

export interface ValidatorTemplate {
	[key: string]: ValidatorTemplate | AllowedType
}

export interface JSONObject {
	[key: string]: any
}

export class JSONValidator {
	validator: ValidatorTemplate

	constructor (validator: ValidatorTemplate) {
		this.validator = validator
	}

	/**
	 * Check recursively if the type signature of the JSON object is conform to the validator.
	 * If there are extra properties in the JSON object, they are ignored.
	 * @param object - The JSON object to check
	 * @returns true if the type signature is valid, false otherwise
	 */
	validate (object: JSONObject): boolean {
		return this.findMissingProperties(object).length === 0
	}

	/**
	 * Find all properties in the JSON object that do not match the validator.
	 * @param object The JSON object to check
	 * @returns an array of strings containing the path to the missing properties. If properties are nested, the path is separated by a dot. If no properties are missing, an empty array is returned
	 */
	findMissingProperties (object: JSONObject): string[] {
		return this.findMissingPropertiesInternal(object, this.validator)
	}

	private findMissingPropertiesInternal (object: JSONObject, validator: ValidatorTemplate, path = ''): string[] {
		const missingProperties = []
		for (const key in validator) {
			const expectedType = validator[key]
			const foundType = getType(object?.[key])
			const newPath = path === '' ? key : [path, key].join('.')
	
			if (JSONValidator.isValidator(expectedType)) {
				missingProperties.push(...this.findMissingPropertiesInternal(object?.[key], expectedType, newPath))
			}

			if (JSONValidator.isAllowedType(expectedType) && expectedType !== foundType) {
				missingProperties.push(newPath)
			}
		}

		return missingProperties
	}

	private static isAllowedType = (object: ValidatorTemplate | AllowedType): object is AllowedType => {
		return ALLOWED_TYPES.some(x => x === getType(object))
	}
	
	private static isValidator = (object: ValidatorTemplate | AllowedType): object is ValidatorTemplate => {
		return getType(object) === 'object'
	}
}
