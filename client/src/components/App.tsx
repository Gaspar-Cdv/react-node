import React from 'react'
import Head from './Head'
import Topbar from './Nav/Topbar'
import { useCss } from '../theme/useCss'
import BottomBar from './Nav/BottomBar'
import Sidebar from './Nav/Sidebar'
import Main from './Main'
import { useFindSession } from '../services/auth'
import { useOnMount } from '../utils/hooks'
import Loader from '../common/Loader'
import Router from '../common/routing/Router'

function App () {
	useCss()
	const [findSession, pending] = useFindSession()

	useOnMount(() => void findSession())

	if (pending) {
		return <Loader show />
	}

	return (
		<>
			<Head />

			<Topbar />

			<Sidebar />

			<Router />

			<BottomBar />
		</>
	)
}

export default App
