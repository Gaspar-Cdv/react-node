import { Navigate } from 'react-router-dom'
import { useSession } from '../../store/session/hooks'
import { useOnMount } from '../../utils/hooks'

function Logout () {
	const { logout } = useSession()

	useOnMount(logout)

	return (
		<Navigate to='/' />
	)
}

export default Logout
