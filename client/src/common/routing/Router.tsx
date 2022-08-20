import { lazy, ReactNode } from 'react'
import { useRoutes } from 'react-router-dom'
import { defineI18n, IntlMessages } from '../../utils/i18n'

const Home = lazy(() => import(/* webpackChunkName: "home" */ '../../components/Home/Home'))
const Login = lazy(() => import(/* webpackChunkName: "login" */ '../../components/Login/Login'))
const NotFound = lazy(() => import(/* webpackChunkName: "notFound" */ '../../components/NotFound'))

export type RouteName =
	| 'home'
	| 'login'
	| 'notFound'

export interface Route<T extends RouteName = RouteName> {
	name: T
	path: string
	element: ReactNode
}

type Routes = {
	[K in RouteName]: Route<K>
}

export const routes: Routes = {
	home: {
		name: 'home',
		path: '/',
		element: <Home />
	},
	login: {
		name: 'login',
		path: '/login',
		element: <Login />
	},
	notFound: {
		name: 'notFound',
		path: '*',
		element: <NotFound />
	}
}

type RoutesI18n = IntlMessages & {
	[key in RouteName]: string
}

export const pageTitles = defineI18n<RoutesI18n>({
	en: {
		home: 'Home',
		login: 'Login',
		notFound: 'Page not found'
	},
	fr: {
		home: 'Accueil',
		login: 'Connexion',
		notFound: 'Page non trouvée'
	}
})

function Router () {
	return useRoutes(Object.values(routes))
}

export default Router
