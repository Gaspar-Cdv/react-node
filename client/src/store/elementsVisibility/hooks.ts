import { createUseStoreState } from '../store'
import { setLoaderVisibility, setPopupVisibility, setSidebarVisibility } from './reducer'
import { isLoaderVisibleSelector, isPopupVisibleSelector, isSidebarVisibleSelector } from './selectors'

export const useLoaderVisibility = createUseStoreState(isLoaderVisibleSelector, setLoaderVisibility)

export const usePopupVisibility = createUseStoreState(isPopupVisibleSelector, setPopupVisibility)

export const useSidebarVisibility = createUseStoreState(isSidebarVisibleSelector, setSidebarVisibility)
