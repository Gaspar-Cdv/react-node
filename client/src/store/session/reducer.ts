import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Language } from '@title/common/build/types/Language'
import { UserDto } from '@title/common/build/types/session'

export interface SessionState {
	user?: UserDto
	language: Language
}

const localStorageLanguage = localStorage.getItem('language')
const initialLanguage = localStorageLanguage != null ? JSON.parse(localStorageLanguage) as Language : Language.en

const initialState: SessionState = {
	user: undefined,
	language: initialLanguage
}

export const sessionSlice = createSlice({
	name: 'session',
	initialState,
	reducers: {
		updateSession: (state, action: PayloadAction<SessionState>) => {
			return action.payload
		},
		updateUser: (state, action: PayloadAction<UserDto | undefined>) => {
			state.user = action.payload
		},
		deleteUser: (state) => {
			delete state.user
		},
		updateLanguage: (state, action: PayloadAction<Language>) => {
			state.language = action.payload
		}
	}
})

export const {
	reducer: sessionReducer,
	actions: { updateSession, updateUser, deleteUser, updateLanguage }
} = sessionSlice
