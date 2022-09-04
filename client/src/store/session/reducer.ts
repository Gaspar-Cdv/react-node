import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Language } from '@title/common/build/types/Language'
import { Session, UserDto } from '@title/common/build/types/session'

export interface SessionState {
	user?: UserDto
	language: Language
}

const initialState: SessionState = {
	user: undefined,
	language: localStorage.getItem('language') as Language ?? Language.en
}

export const sessionSlice = createSlice({
	name: 'session',
	initialState,
	reducers: {
		updateSession: (state, action: PayloadAction<Session>) => {
			state = action.payload
		},
		updateUser: (state, action: PayloadAction<UserDto>) => {
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
