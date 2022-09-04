import { useAppDispatch, useAppSelector } from '../store'
import { setLoaderVisibility, setPopupVisibility, setSidebarVisibility } from './reducer'
import { isLoaderVisibleSelector, isPopupVisibleSelector, isSidebarVisibleSelector } from './selectors'

export const useLoaderVisibility = () => {
	const dispatch = useAppDispatch()

	const isLoaderVisible = useAppSelector(isLoaderVisibleSelector)
	const setIsLoaderVisible = (visible: boolean) => dispatch(setLoaderVisibility(visible))

	return { isLoaderVisible, setIsLoaderVisible }
}

export const usePopupVisibility = () => {
	const dispatch = useAppDispatch()

	const isPopupVisible = useAppSelector(isPopupVisibleSelector)
	const setIsPopupVisible = (visible: boolean) => dispatch(setPopupVisibility(visible))

	return { isPopupVisible, setIsPopupVisible }
}

export const useSidebarVisibility = () => {
	const dispatch = useAppDispatch()

	const isSidebarVisible = useAppSelector(isSidebarVisibleSelector)
	const setIsSidebarVisible = (visible: boolean) => dispatch(setSidebarVisibility(visible))

	return { isSidebarVisible, setIsSidebarVisible }
}
