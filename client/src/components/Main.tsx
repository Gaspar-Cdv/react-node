import { Suspense } from 'react'
import { createUseStyles } from 'react-jss'
import Loader from '../common/Loader'
import Router from '../common/routing/Router'

const useStyles = createUseStyles({
	main: {
		flex: 1,
		overflow: 'auto'
	}
})

function Main () {
	const classes = useStyles()

	return (
		<main className={classes.main}>
			<Suspense fallback={<Loader show />}>
				<Router />
			</Suspense>
		</main>
	)
}

export default Main
