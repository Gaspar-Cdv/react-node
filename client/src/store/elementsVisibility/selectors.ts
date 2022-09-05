import { RootState } from '../store'

export const isLoaderVisibleSelector = (state: RootState) => {
	return state.elementsVisibility.loader
}

export const isPopupVisibleSelector = (state: RootState) => {
	return state.elementsVisibility.popup
}

export const isSidebarVisibleSelector = (state: RootState) => {
	return state.elementsVisibility.sidebar
}
