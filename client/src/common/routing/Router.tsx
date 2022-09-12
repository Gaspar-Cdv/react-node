import { lazy, ReactNode } from 'react'
import { useRoutes } from 'react-router-dom'
import Register from '../../components/Register/Register'
import { defineI18n } from '../../utils/i18n'

const Home = lazy(() => import(/* webpackChunkName: "home" */ '../../components/Home/Home'))
const Login = lazy(() => import(/* webpackChunkName: "login" */ '../../components/Login/Login'))
const Settings = lazy(() => import(/* webpackChunkName: "settings" */ '../../components/Settings/Settings'))
const Logout = lazy(() => import(/* webpackChunkName: "logout" */ '../../components/Login/Logout'))
const NotFound = lazy(() => import(/* webpackChunkName: "notFound" */ '../../components/NotFound'))

type RouteNameExtended =
	| 'home'
	| 'login'
	| 'register'
	| 'settings'
	| 'logout'
	| 'notFound'

export type RouteName = Exclude<RouteNameExtended, 'notFound'>

export interface LinkParams {
	[key: string]: string
}

export interface Route<T extends RouteNameExtended = RouteNameExtended> {
	name: T
	path: string
	element: ReactNode
	protected?: boolean
	hideHeader?: boolean
	hideWhenLogged?: boolean
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
		element: <Login />,
		hideWhenLogged: true
	},
	register: {
		name: 'register',
		path: '/register',
		element: <Register />,
		hideWhenLogged: true
	},
	settings: {
		name: 'settings',
		path: '/settings',
		element: <Settings />,
		protected: true
	},
	logout: {
		name: 'logout',
		path: '/logout',
		element: <Logout />,
		hideHeader: true
	},
	notFound: {
		name: 'notFound',
		path: '*',
		element: <NotFound />,
		hideHeader: true
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
		settings: 'Settings',
		logout: 'Logout',
		notFound: 'Page not found'
	},
	fr: {
		home: 'Accueil',
		login: 'Connexion',
		register: 'Inscription',
		settings: 'Paramètres',
		logout: 'Déconnexion',
		notFound: 'Page non trouvée'
	}
})

/**
 * Get the path of a route from its name.
 */
export const getPath = (to: RouteName): string => {
	const url = routes[to]

	return url.path
}

/**
 * From a path and an object of params, return an url with params replaced. E.g.:
 * ```ts
 * const path = '/:foo/:bar'
 * const params = { foo: 'foo', bar: 'bar' }
 * const result = injectParams(path, params) // '/foo/bar'
 * ```
 * @throws If the path contains a param that is not in the params object.
 * @param path The path to replace params in.
 * @param params The params to replace (optionnal).
 */
export const injectParams = (path: string, params: LinkParams = {}) => {
	return path.replace(/:([^/]+)(?=\/|$)/g, (_, key) => {
		const param = params[key]

		if (param == null) {
			throw new Error(`Missing param for the route ${path}`)
		}

		return param
	})
}

function Router () {
	return useRoutes(Object.values(routes))
}

export default Router
