import * as Yup from 'yup'
import { ErrorMessage } from '../types/ErrorMessage'

const usernameValidator = Yup.string()
	.min(4, ErrorMessage.MIN_LENGTH_4)
	.max(255, ErrorMessage.MAX_LENGTH_255)
	.required(ErrorMessage.REQUIRED)

const emailValidator = Yup.string()
	.email(ErrorMessage.INVALID_EMAIL)
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

const passwordValidator = (hardCheck: boolean) => {
	return passwordLengthValidator(hardCheck)
		.max(255, ErrorMessage.MAX_LENGTH_255)
		.test({
			test: (password, ctx) => {
				const isLongEnough = passwordLengthValidator(hardCheck).isValidSync(password)

				const score = [
					containsLowerValidator,
					containsUpperValidator,
					containsDigitValidator,
					containsSymbolValidator
				]
					.map(validator => validator.isValidSync(password))
					.filter(Boolean).length

				if (!isLongEnough || (hardCheck && score < 4) || score < 3) {
					return ctx.createError({ message: ErrorMessage.PASSWORD_NOT_STRONG_ENOUGH })
				}

				return true
			}
		})
		.required(ErrorMessage.REQUIRED)
}

const passwordConfirmationValidator = (fieldName: string) => {
	return Yup.string()
		.oneOf([Yup.ref(fieldName), null], ErrorMessage.PASSWORDS_DO_NOT_MATCH)
		.required(ErrorMessage.REQUIRED)
}

const registerValidationSchema = Yup.object({
	username: usernameValidator,
	email: emailValidator,
	password: passwordValidator(true),
	passwordConfirmation: passwordConfirmationValidator('password')
})

export {
	registerValidationSchema
}
