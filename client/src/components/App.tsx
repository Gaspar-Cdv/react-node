import React from 'react'
import Head from './Head'
import Topbar from './Nav/Topbar'
import { useCss } from '../theme/useCss'
import BottomBar from './Nav/BottomBar'
import Sidebar from './Nav/Sidebar'
import Main from './Main'
import { useInitSession } from '../store/session/hooks'

function App () {
	useCss()
	useInitSession()

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
