import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Language } from '../../types/Language'

const initialState: Language = localStorage.getItem('language') as Language ?? Language.en

export const languageSlice = createSlice({
	name: 'language',
	initialState,
	reducers: {
		setLanguage: (state, action: PayloadAction<Language>): Language => {
			localStorage.setItem('language', action.payload)
			return action.payload
		}
	}
})

export const {
	reducer: languageReducer,
	actions: { setLanguage }
} = languageSlice
