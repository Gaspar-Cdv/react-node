import { lazy, ReactNode } from 'react'
import { useRoutes } from 'react-router-dom'
import Register from '../../components/Register/Register'
import { defineI18n } from '../../utils/i18n'

const Home = lazy(() => import(/* webpackChunkName: "home" */ '../../components/Home/Home'))
const Login = lazy(() => import(/* webpackChunkName: "login" */ '../../components/Login/Login'))
const NotFound = lazy(() => import(/* webpackChunkName: "notFound" */ '../../components/NotFound'))

type RouteNameExtended =
	| 'home'
	| 'login'
	| 'register'
	| 'notFound'

export type RouteName = Exclude<RouteNameExtended, 'notFound'>

export interface Route<T extends RouteNameExtended = RouteNameExtended> {
	name: T
	path: string
	element: ReactNode
}

type Routes = {
	[K in RouteNameExtended]: Route<K>
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
	register: {
		name: 'register',
		path: '/register',
		element: <Register />
	},
	notFound: {
		name: 'notFound',
		path: '*',
		element: <NotFound />
	}
}

type RoutesI18n = {
	[key in RouteNameExtended]: string
}

export const pageTitles = defineI18n<RoutesI18n>({
	en: {
		home: 'Home',
		login: 'Login',
		register: 'Register',
		notFound: 'Page not found'
	},
	fr: {
		home: 'Accueil',
		login: 'Connexion',
		register: 'Inscription',
		notFound: 'Page non trouvée'
	}
})

function Router () {
	return useRoutes(Object.values(routes))
}

export default Router
