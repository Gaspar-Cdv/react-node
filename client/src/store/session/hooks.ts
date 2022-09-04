import { Session, UserDto } from '@title/common/build/types/session'
import { useEffect } from 'react'
import authService from '../../remote/auth'
import { useAppDispatch, useAppSelector } from '../store'
import { deleteSession as _deleteSession, updateSession, updateUser } from './reducer'

export const useSession = () => {
	const dispatch = useAppDispatch()

	const session = useAppSelector(state => state.session)
	const setSession = (session: Session) => dispatch(updateSession(session))
	const deleteSession = () => dispatch(_deleteSession())

	return {
		session,
		setSession,
		deleteSession
	}
}

export const useInitSession = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		const fn = async () => {
			try {
				const session = await authService.findSession()
				console.log(session)
				dispatch(updateSession(session))
			} catch (e) {
				// TODO
			}
		}

		fn()
	}, [dispatch])
}

export const useUser = () => {
	const dispatch = useAppDispatch()

	const user = useAppSelector(state => state.session.user)
	const setUser = (user: UserDto) => dispatch(updateUser(user))

	return { user, setUser }
}
