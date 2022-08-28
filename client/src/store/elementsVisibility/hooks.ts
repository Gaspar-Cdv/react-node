import { useAppDispatch, useAppSelector } from '../store'
import { setLoaderVisibility, setPopupVisibility, setSidebarVisibility } from './reducer'

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

export const useSidebarVisibility = () => {
	const dispatch = useAppDispatch()

	const isSidebarVisible = useAppSelector(state => state.elementsVisibility.sidebar)
	const setIsSidebarVisible = (visible: boolean) => dispatch(setSidebarVisibility(visible))

	return { isSidebarVisible, setIsSidebarVisible }
}
