import { Suspense } from 'react'
import { createUseStyles } from 'react-jss'
import Loader from '../common/Loader'
import { useRouter } from '../common/routing/hooks'
import Router from '../common/routing/Router'

const useStyles = createUseStyles({
	main: {
		flex: 1,
		overflow: 'auto'
	},
	container: {
		display: 'flex',
		flexDirection: 'column',
		gap: '2rem',
		width: '100%',
		maxWidth: 850,
		margin: '0 auto',
		padding: '2rem'
	}
})

function Main () {
	const classes = useStyles()
	const { currentTitle } = useRouter()

	return (
		<main className={classes.main}>
			<div className={classes.container}>
				<h3>{currentTitle}</h3>
				<hr />
				<Suspense fallback={<Loader show />}>
					<Router />
				</Suspense>
			</div>
		</main>
	)
}

export default Main
