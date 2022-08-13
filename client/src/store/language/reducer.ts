import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Language } from '../../types/Language'

const initialState: Language = localStorage.getItem('language') as Language ?? Language.EN

export const languageSlice = createSlice({
	name: 'language',
	initialState,
	reducers: {
		setLanguage: (state, action: PayloadAction<Language>) => {
			localStorage.setItem('language', action.payload)
			return action.payload
		}
	}
})

export const {
	setLanguage
} = languageSlice.actions

export default languageSlice.reducer
