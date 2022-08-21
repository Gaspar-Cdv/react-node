import { Language } from 'client/src/types/Language'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { setLanguage } from './reducer'

export const useCurrentLanguage = () => {
	const dispatch = useDispatch()

	const currentLanguage = useSelector((state: RootState) => state.language)
	const setCurrentLanguage = (language: Language) => dispatch(setLanguage(language))

	return { currentLanguage, setCurrentLanguage }
}
