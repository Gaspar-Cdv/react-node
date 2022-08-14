import { Language } from 'client/src/types/Language'
import { RootState } from '../store'

export const languageSelector = (state: RootState): Language => state.language
