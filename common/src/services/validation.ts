import * as Yup from 'yup'
import { ErrorMessage } from '../types/ErrorMessage'

const requiredValidator = Yup.string()
	.required(ErrorMessage.REQUIRED)

const usernameValidator = Yup.string()
	.min(4, ErrorMessage.MIN_LENGTH_4)
	.max(255, ErrorMessage.MAX_LENGTH_255)
	.required(ErrorMessage.REQUIRED)

const fileNameValidator = Yup.string()
	.min(1, ErrorMessage.REQUIRED)
	.max(255, ErrorMessage.MAX_LENGTH_255)
	.required(ErrorMessage.REQUIRED)

const emailValidator = Yup.string()
	.matches(
		/^([a-z0-9]+(?:[._\-+][a-z0-9]+)*)@([a-z0-9]+(?:[.-][a-z0-9]+)*\.[a-z]{2,})$/i,
		ErrorMessage.INVALID_EMAIL
	) // better than email() because it handles hyphens on start and end
	.max(255, ErrorMessage.MAX_LENGTH_255)
	.required(ErrorMessage.REQUIRED)

const passwordLengthValidator = (hardCheck: boolean) => {
	return Yup.string()
		.min(
			hardCheck ? 12 : 8,
			hardCheck ? ErrorMessage.MIN_LENGTH_12 : ErrorMessage.MIN_LENGTH_8
		)
}

const containsLowerValidator = Yup.string()
	.matches(/[a-z\u00e0-\u00f6\u00f8-\u00ffœ]/, ErrorMessage.NO_LOWERCASE)

const containsUpperValidator = Yup.string()
	.matches(/[A-Z\u00e0-\u00f6\u00f8-\u00ffœ]/, ErrorMessage.NO_UPPERCASE)

const containsDigitValidator = Yup.string()
	.matches(/[0-9]/, ErrorMessage.NO_DIGIT)

const containsSymbolValidator = Yup.string()
	.matches(/[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/, ErrorMessage.NO_SYMBOL)

const passwordComplexityValidator = (hardCheck: boolean) => {
	return Yup.string()
		.test({
			test: (password, ctx) => {
				const score = [
					containsLowerValidator,
					containsUpperValidator,
					containsDigitValidator,
					containsSymbolValidator
				]
					.map(validator => validator.isValidSync(password))
					.filter(Boolean).length

				if ((hardCheck && score < 4) || score < 3) {
					return ctx.createError({
						message: hardCheck
							? ErrorMessage.PASSWORD_NOT_STRONG_ENOUGH_HARD_CHECK
							: ErrorMessage.PASSWORD_NOT_STRONG_ENOUGH
					})
				}

				return true
			}
		})
}

const passwordValidator = (hardCheck: boolean) => {
	return passwordLengthValidator(hardCheck)
		.concat(passwordComplexityValidator(hardCheck))
		.max(255, ErrorMessage.MAX_LENGTH_255)
		.required(ErrorMessage.REQUIRED)
}

const passwordConfirmationValidator = (fieldName: string) => {
	return Yup.string()
		.oneOf([Yup.ref(fieldName), null], ErrorMessage.PASSWORDS_DO_NOT_MATCH)
		.required(ErrorMessage.REQUIRED)
}

const notIdenticalValidator = (fieldName: string) => {
	return Yup.string()
		.notOneOf([Yup.ref(fieldName)], ErrorMessage.IDENTICAL_PASSWORDS)
		.required(ErrorMessage.REQUIRED)
}

const registerValidationSchema = Yup.object({
	username: usernameValidator,
	email: emailValidator,
	password: passwordValidator(true),
	passwordConfirmation: passwordConfirmationValidator('password')
})

const loginValidationSchema = Yup.object({
	username: requiredValidator,
	password: requiredValidator,
})

const updateUserValidationSchema = Yup.object({
	username: usernameValidator,
	email: emailValidator
})

const changePasswordValidationSchema = Yup.object({
	oldPassword: requiredValidator,
	password: passwordValidator(true).concat(notIdenticalValidator('oldPassword')),
	passwordConfirmation: passwordConfirmationValidator('password')
})

const forgotPasswordValidationSchema = Yup.object({
	email: emailValidator
})

const resetPasswordValidationSchema = Yup.object({
	password: passwordValidator(true),
	passwordConfirmation: passwordConfirmationValidator('password')
})

const uploadFileValidationSchema = Yup.object({
	name: fileNameValidator,
	file: Yup.mixed().required(ErrorMessage.REQUIRED) // mixed used to handle frontEnd validation (known Yup issue about file validation)
})

export {
	requiredValidator,
	emailValidator,
	passwordValidator,
	registerValidationSchema,
	loginValidationSchema,
	updateUserValidationSchema,
	changePasswordValidationSchema,
	forgotPasswordValidationSchema,
	resetPasswordValidationSchema,
	uploadFileValidationSchema
}
