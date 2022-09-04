import React, { useEffect } from 'react'
import Head from './Head'
import Topbar from './Nav/Topbar'
import { useCss } from '../theme/useCss'
import BottomBar from './Nav/BottomBar'
import Sidebar from './Nav/Sidebar'
import Main from './Main'
import { useSession } from '../store/session/hooks'

function App () {
	useCss()
	const { refreshSession } = useSession()

	useEffect(() => {
		refreshSession()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

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
