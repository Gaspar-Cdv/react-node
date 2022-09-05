import React from 'react'
import Head from './Head'
import Topbar from './Nav/Topbar'
import { useCss } from '../theme/useCss'
import BottomBar from './Nav/BottomBar'
import Sidebar from './Nav/Sidebar'
import Main from './Main'
import { useFindSession } from '../services/auth'
import { useOnMount } from '../utils/hooks'

function App () {
	useCss()
	const findSession = useFindSession()

	useOnMount(() => void findSession())

	return (
		<>
			<Head />

			<Topbar />

			<Sidebar />

			<Main />

			<BottomBar />
		</>
	)
}

export default App
