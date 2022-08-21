import { useAppDispatch, useAppSelector } from '../store'
import { setLoaderVisibility, setPopupVisibility, setMenuVisibility } from './reducer'

export const useLoaderVisibility = () => {
	const dispatch = useAppDispatch()

	const isLoaderVisible = useAppSelector(state => state.elementsVisibility.loader)
	const setIsLoaderVisible = (visible: boolean) => dispatch(setLoaderVisibility(visible))

	return { isLoaderVisible, setIsLoaderVisible }
}

export const usePopupVisibility = () => {
	const dispatch = useAppDispatch()

	const isPopupVisible = useAppSelector(state => state.elementsVisibility.popup)
	const setIsPopupVisible = (visible: boolean) => dispatch(setPopupVisibility(visible))

	return { isPopupVisible, setIsPopupVisible }
}

export const useMenuVisibility = () => {
	const dispatch = useAppDispatch()

	const isMenuVisible = useAppSelector(state => state.elementsVisibility.menu)
	const setIsMenuVisible = (visible: boolean) => dispatch(setMenuVisibility(visible))

	return { isMenuVisible, setIsMenuVisible }
}
