import Loader from '../common/Loader'
import Router from '../common/routing/Router'
import { useFindSession } from '../services/auth'
import { useCss } from '../theme/useCss'
import { useOnMount } from '../utils/hooks'
import BottomBar from './Nav/BottomBar'
import Sidebar from './Nav/Sidebar'
import Topbar from './Nav/Topbar'

function App () {
	useCss()
	const [findSession, pending] = useFindSession()

	useOnMount(() => void findSession())

	if (pending) {
		return <Loader show />
	}

	return (
		<>
			<Topbar />

			<Sidebar />

			<Router />

			<BottomBar />
		</>
	)
}

export default App
