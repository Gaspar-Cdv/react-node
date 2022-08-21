import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ElementsVisibilityState {
	loader: boolean
	popup: boolean
	menu: boolean
}

const initialState: ElementsVisibilityState = {
	loader: false,
	popup: false,
	menu: false
}

export const elementsVisibilitySlice = createSlice({
	name: 'elementsVisibility',
	initialState,
	reducers: {
		setLoaderVisibility: (state, action: PayloadAction<boolean>): ElementsVisibilityState => {
			return {
				...state,
				loader: action.payload
			}
		},
		setPopupVisibility: (state, action: PayloadAction<boolean>): ElementsVisibilityState => {
			return {
				...state,
				popup: action.payload
			}
		},
		setMenuVisibility: (state, action: PayloadAction<boolean>): ElementsVisibilityState => {
			return {
				...state,
				menu: action.payload
			}
		}
	}
})

export const {
	reducer: elementsVisibilityReducer,
	actions: { setLoaderVisibility, setPopupVisibility, setMenuVisibility }
} = elementsVisibilitySlice
