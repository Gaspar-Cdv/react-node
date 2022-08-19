import { lazy } from 'react'
import { RouteObject, useRoutes } from 'react-router-dom'
import { defineI18n, IntlMessages } from '../../i18n'

const Home = lazy(() => import(/* webpackChunkName: "home" */ '../../components/Home'))
const Login = lazy(() => import(/* webpackChunkName: "login" */ '../../components/Login'))
const NotFound = lazy(() => import(/* webpackChunkName: "notFound" */ '../../components/NotFound'))

export type RouteName =
	| 'home'
	| 'login'
	| 'notFound'

export interface Route extends RouteObject {
	name: RouteName
	path: string
	children?: Route[]
}

export const routes: Route[] = [
	{
		name: 'home',
		path: '/',
		element: <Home />
	},
	{
		name: 'login',
		path: '/login',
		element: <Login />
	}
]

export const notFoundRoute: Route = {
	name: 'notFound',
	path: '*',
	element: <NotFound />
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
	return useRoutes([...routes, notFoundRoute])
}

export default Router
