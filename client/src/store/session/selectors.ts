import { RootState } from '../store'

export const sessionSelector = (state: RootState) => {
	return state.session
}

export const userSelector = (state: RootState) => {
	return state.session.user
}

export const languageSelector = (state: RootState) => {
	return state.session.language
}

export const isLoggedSelector = (state: RootState) => {
	return userSelector(state) != null
}

export const isEmailVerifiedSelector = (state: RootState) => {
	return state.session.user?.emailVerified
}
