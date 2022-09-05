import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { elementsVisibilityReducer } from './elementsVisibility/reducer'
import { sessionReducer } from './session/reducer'

export function createUseStoreState<T> (
	selector: (state: RootState) => T,
	update: (payload: T) => { payload: T, type: string },
	remove?: () => { payload: undefined, type: string }
) {
	return () => {
		const dispatch = useDispatch()

		const getter = useAppSelector(selector)
		const setter = (payload: T) => dispatch(update(payload))
		const remover = remove != null ? (() => dispatch(remove())) : undefined

		return [getter, setter, remover] as const
	}
}

const store = configureStore({
	reducer: {
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
