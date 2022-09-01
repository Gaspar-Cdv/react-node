export enum ErrorMessage {
	// common
	REQUIRED = 'REQUIRED',
	MISSING_FIELDS = 'MISSING_FIELDS',
	INVALID_VALUES = 'INVALID_VALUES',
	UNKNOWN_ERROR = 'UNKNOWN_ERROR',
	MIN_LENGTH_4 = 'MIN_LENGTH_4',
	MIN_LENGTH_8 = 'MIN_LENGTH_8',
	MIN_LENGTH_12 = 'MIN_LENGTH_12',
	MAX_LENGTH_255 = 'MAX_LENGTH_255',

	// login
	INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
	ACCOUNT_DISABLED = 'ACCOUNT_DISABLED',

	// register
	INVALID_USERNAME = 'INVALID_USERNAME',
	INVALID_EMAIL = 'INVALID_EMAIL',
	INVALID_PASSWORD = 'INVALID_PASSWORD',
	USERNAME_ALREADY_USED = 'USERNAME_ALREADY_USED',
	EMAIL_ALREADY_USED = 'EMAIL_ALREADY_USED',
	PASSWORD_NOT_STRONG_ENOUGH = 'PASSWORD_NOT_STRONG_ENOUGH',
	PASSWORDS_DO_NOT_MATCH = 'PASSWORDS_DO_NOT_MATCH',

	// token
	INVALID_TOKEN = 'INVALID_TOKEN',
	EXPIRED_TOKEN = 'EXPIRED_TOKEN',
}
