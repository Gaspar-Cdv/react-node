import { Session, UserDto } from '@title/common/build/types/session'
import authService from '../../remote/auth'
import { useLocalStorage, useOnMount } from '../../utils/hooks'
import { useAppDispatch, useAppSelector } from '../store'
import { deleteSession, updateSession, updateUser } from './reducer'

export const useSession = () => {
	const dispatch = useAppDispatch()
	const [,, deleteToken] = useLocalStorage('token')

	const session = useAppSelector(state => state.session)
	const isLogged = useAppSelector(state => state.session.user != null)
	const setSession = (session: Session) => dispatch(updateSession(session))
	const logout = () => {
		dispatch(deleteSession())
		deleteToken()
	}

	return {
		session,
		isLogged,
		setSession,
		logout
	}
}

export const useInitSession = () => {
	const dispatch = useAppDispatch()

	useOnMount(() => {
		const fn = async () => {
			try {
				const session = await authService.findSession()
				dispatch(updateSession(session))
			} catch (e) {
				// TODO
			}
		}

		fn()
	})
}

export const useUser = () => {
	const dispatch = useAppDispatch()

	const user = useAppSelector(state => state.session.user)
	const setUser = (user: UserDto) => dispatch(updateUser(user))

	return { user, setUser }
}
