import { defineI18n, useTranslate } from './i18n'
import { ErrorMessage } from '@title/common/build/types/ErrorMessage'

type ErrorI18n = {
	[key in ErrorMessage]: string
}

const i18n = defineI18n<ErrorI18n>({
	en: {
		// common form errors
		REQUIRED: 'Required',
		MIN_LENGTH_4: 'Must contain at least 4 characters',
		MIN_LENGTH_8: 'Must contain at least 8 characters',
		MIN_LENGTH_12: 'Must contain at least 12 characters',
		MAX_LENGTH_255: 'Must contain at most 255 characters',
		NO_LOWERCASE: 'Must contain at least one lowercase',
		NO_UPPERCASE: 'Must contain at least one uppercase',
		NO_DIGIT: 'Must contain at least one digit',
		NO_SYMBOL: 'Must contain at least one symbol',

		// register form errors
		INVALID_EMAIL: 'Invalid email',
		PASSWORD_NOT_STRONG_ENOUGH: 'Password must contain at least three of the following types: lowercase, uppercase, digit, symbol',
		PASSWORD_NOT_STRONG_ENOUGH_HARD_CHECK: 'Password must contain at least a lowercase, an uppercase, a digit and a symbol',
		PASSWORDS_DO_NOT_MATCH: 'Passwords do not match',

		// common errors
		MISSING_FIELDS: 'Missing fields',
		INVALID_VALUES: 'Invalid values',
		UNKNOWN_ERROR: 'Unknown error',

		// login errors
		INVALID_USERNAME: 'Invalid username',
		INVALID_PASSWORD: 'Invalid password',
		INVALID_CREDENTIALS: 'Invalid credentials',
		ACCOUNT_DISABLED: 'Account disabled',

		// register errors
		USERNAME_ALREADY_USED: 'Username already used',
		EMAIL_ALREADY_USED: 'Email already used',

		// session errors
		INVALID_TOKEN: 'Invalid token',
		EXPIRED_TOKEN: 'Expired token'
	},
	fr: {
		// common form errors
		REQUIRED: 'Champ requis',
		MIN_LENGTH_4: 'Doit contenir au moins 4 caractères',
		MIN_LENGTH_8: 'Doit contenir au moins 8 caractères',
		MIN_LENGTH_12: 'Doit contenir au moins 12 caractères',
		MAX_LENGTH_255: 'Doit contenir au plus 255 caractères',
		NO_LOWERCASE: 'Doit contenir au moins une minuscule',
		NO_UPPERCASE: 'Doit contenir au moins une majuscule',
		NO_DIGIT: 'Doit contenir au moins un chiffre',
		NO_SYMBOL: 'Doit contenir au moins un symbole',

		// register form errors
		INVALID_EMAIL: 'Email invalide',
		PASSWORD_NOT_STRONG_ENOUGH: 'Le mot de passe doit contenir au moins trois des types suivants : minuscule, majuscule, chiffre, symbole.',
		PASSWORD_NOT_STRONG_ENOUGH_HARD_CHECK: 'Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre et un symbole',
		PASSWORDS_DO_NOT_MATCH: 'Les deux mots de passes doivent être identiques',

		// common errors
		MISSING_FIELDS: 'Champs manquants',
		INVALID_VALUES: 'Valeurs invalides',
		UNKNOWN_ERROR: 'Erreur inconnue',

		// login errors
		INVALID_USERNAME: 'Nom d\'utilisateur invalide',
		INVALID_PASSWORD: 'Mot de passe invalide',
		INVALID_CREDENTIALS: 'Le nom d\'utilisateur ou le mot de passe est incorrect',
		ACCOUNT_DISABLED: 'Compte désactivé',

		// register errors
		USERNAME_ALREADY_USED: 'Ce nom d\'utilisateur existe déjà',
		EMAIL_ALREADY_USED: 'Cette adresse email existe déjà',

		// session errors
		INVALID_TOKEN: 'Token invalide',
		EXPIRED_TOKEN: 'Token expiré'
	}
})

const isErrorMessage = (error: string): error is ErrorMessage => {
	return Object.values(ErrorMessage).includes(error as ErrorMessage)
}

export const useErrorMessage = () => {
	const translate = useTranslate()

	return (error: string) => {
		if (isErrorMessage(error)) {
			return translate(i18n[error])
		}

		return error
	}
}
