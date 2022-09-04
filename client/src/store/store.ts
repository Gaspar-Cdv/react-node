import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { elementsVisibilityReducer } from './elementsVisibility/reducer'
import { languageReducer } from './language/reducer'
import { sessionReducer } from './session/reducer'

const store = configureStore({
	reducer: {
		language: languageReducer,
		elementsVisibility: elementsVisibilityReducer,
		session: sessionReducer
	},
})

export default store

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
