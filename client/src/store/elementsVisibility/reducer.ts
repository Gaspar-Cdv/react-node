import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ElementsVisibilityState {
	loader: boolean
	popup: boolean
	sidebar: boolean
}

const initialState: ElementsVisibilityState = {
	loader: false,
	popup: false,
	sidebar: false
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
		setSidebarVisibility: (state, action: PayloadAction<boolean>): ElementsVisibilityState => {
			return {
				...state,
				sidebar: action.payload
			}
		}
	}
})

export const {
	reducer: elementsVisibilityReducer,
	actions: { setLoaderVisibility, setPopupVisibility, setSidebarVisibility }
} = elementsVisibilitySlice
