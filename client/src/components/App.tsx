import React from 'react'
import Head from './Head'
import Topbar from './Nav/Topbar'
import { useCss } from '../theme/useCss'
import BottomBar from './Nav/BottomBar'
import Sidebar from './Nav/Sidebar'
import Main from './Main'

function App () {
	useCss()

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
