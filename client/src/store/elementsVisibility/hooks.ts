import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { setLoaderVisibility, setPopupVisibility, setMenuVisibility } from './reducer'

export const useLoaderVisibility = () => {
	const dispatch = useDispatch()

	const isLoaderVisible = useSelector((state: RootState) => state.elementsVisibility.loader)
	const setIsLoaderVisible = (visible: boolean) => dispatch(setLoaderVisibility(visible))

	return { isLoaderVisible, setIsLoaderVisible }
}

export const usePopupVisibility = () => {
	const dispatch = useDispatch()

	const isPopupVisible = useSelector((state: RootState) => state.elementsVisibility.popup)
	const setIsPopupVisible = (visible: boolean) => dispatch(setPopupVisibility(visible))

	return { isPopupVisible, setIsPopupVisible }
}

export const useMenuVisibility = () => {
	const dispatch = useDispatch()

	const isMenuVisible = useSelector((state: RootState) => state.elementsVisibility.menu)
	const setIsMenuVisible = (visible: boolean) => dispatch(setMenuVisibility(visible))

	return { isMenuVisible, setIsMenuVisible }
}
