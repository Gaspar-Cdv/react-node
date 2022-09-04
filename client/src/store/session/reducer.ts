import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Session, UserDto } from '@title/common/build/types/session'

export type SessionState = Partial<Session>

const initialState: SessionState = {
	user: undefined
}

export const sessionSlice = createSlice({
	name: 'session',
	initialState,
	reducers: {
		updateSession: (state, action: PayloadAction<Session>): SessionState => {
			return action.payload
		},
		deleteSession: (): SessionState => {
			return {}
		},
		updateUser: (state, action: PayloadAction<UserDto>): SessionState => {
			return {
				...state,
				user: action.payload
			}
		}
	}
})

export const {
	reducer: sessionReducer,
	actions: { updateSession, deleteSession, updateUser }
} = sessionSlice
