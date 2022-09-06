export interface UpdateUserRequest {
	username: string
	email: string
}

export interface ChangePasswordRequest {
	password: string
	passwordConfirmation: string
	oldPassword: string
}
