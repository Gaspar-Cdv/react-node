import { Language } from '@title/common/build/types/Language'
import { useAppDispatch, useAppSelector } from '../store'
import { setLanguage } from './reducer'

export const useCurrentLanguage = () => {
	const dispatch = useAppDispatch()

	const currentLanguage = useAppSelector(state => state.language)
	const setCurrentLanguage = (language: Language) => dispatch(setLanguage(language))

	return { currentLanguage, setCurrentLanguage }
}
