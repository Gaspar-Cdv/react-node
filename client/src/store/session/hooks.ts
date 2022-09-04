import { createUseStoreState } from '../store'
import { deleteUser, updateLanguage, updateSession, updateUser } from './reducer'
import { languageSelector, sessionSelector, userSelector } from './selectors'

export const useSession = createUseStoreState(sessionSelector, updateSession)

export const useUser = createUseStoreState(userSelector, updateUser, deleteUser)

export const useLanguage = createUseStoreState(languageSelector, updateLanguage)
