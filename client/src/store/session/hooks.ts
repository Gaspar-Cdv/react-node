import { Language } from '@title/common/build/types/Language'
import userService from '../../remote/user'
import { useLocalStorage } from '../../utils/hooks'
import { createUseStoreState, useAppSelector } from '../store'
import { deleteUser, updateLanguage, updateSession, updateUser } from './reducer'
import { isLoggedSelector, languageSelector, sessionSelector, userSelector } from './selectors'

export const useSession = createUseStoreState(sessionSelector, updateSession)

export const useUser = createUseStoreState(userSelector, updateUser, deleteUser)

export const useLanguage = () => {
	const [language, setStoreLanguage] = createUseStoreState(languageSelector, updateLanguage)()
	const [, setLocalStorageLanguage] = useLocalStorage('language')
	const isLogged = useAppSelector(isLoggedSelector)

	const setLanguage = async (language: Language) => {
		setStoreLanguage(language)
		setLocalStorageLanguage(language)
		if (isLogged) {
			await userService.changeLanguage(language)
		}
	}

	return [language, setLanguage] as const
}
