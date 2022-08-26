import React, { Suspense } from 'react'
import Loader from '../common/Loader'
import Head from './Head'
import Router from '../common/routing/Router'
import Topbar from './Nav/Topbar'
import { useCss } from '../theme/useCss'

function App () {
	useCss()

	return (
		<>
			<Head />

			<Topbar />

			<Suspense fallback={<Loader show />}>
				<Router />
			</Suspense>
		</>
	)
}

export default App
