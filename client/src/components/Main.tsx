import { ReactNode, Suspense } from 'react'
import { createUseStyles } from 'react-jss'
import Loader from '../common/Loader'
import { useRouter } from '../common/routing/hooks'
import Header from './Header'
import Login from './Login/Login'
import NotFound from './NotFound'

const useStyles = createUseStyles({
	main: {
		flex: 1,
		overflow: 'auto',
		display: 'flex',
		flexDirection: 'column',
		gap: '2rem',
		width: '100%',
		maxWidth: 850,
		margin: '0 auto',
		padding: '2rem'
	}
})

interface MainProps {
	children: ReactNode
}

function Main ({ children }: MainProps) {
	const classes = useStyles()
	const { isRouteAccessible, currentRoute } = useRouter()

	return (
		<main className={classes.main}>
			{currentRoute.hideHeader !== true && (
				<Header />
			)}

			<Suspense fallback={<Loader show />}>
				{currentRoute.name === 'notFound'
					? <NotFound />
					: isRouteAccessible
						? children
						: <Login />}
			</Suspense>
		</main>
	)
}

export default Main
