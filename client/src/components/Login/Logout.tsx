import { Navigate } from 'react-router-dom'
import { useLogout } from '../../services/auth'
import { useOnMount } from '../../utils/hooks'

function Logout () {
	const logout = useLogout()

	useOnMount(logout)

	return (
		<Navigate to='/' />
	)
}

export default Logout
