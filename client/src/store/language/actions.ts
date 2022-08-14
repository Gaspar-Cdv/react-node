import { Language } from 'client/src/types/Language'
import { useDispatch } from 'react-redux'
import { setLanguage } from './reducer'

export const useSetLanguage = () => {
	const dispatch = useDispatch()
	return (language: Language) => dispatch(setLanguage(language))
}
