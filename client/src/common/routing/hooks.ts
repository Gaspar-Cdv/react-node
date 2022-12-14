import { useMemo } from 'react'
import { NavigateOptions, useLocation, useNavigate as useRouterNavigate, useParams } from 'react-router-dom'
import { isLoggedSelector } from '../../store/session/selectors'
import { useAppSelector } from '../../store/store'
import { useTranslate } from '../../utils/i18n'
import { getPath, injectParams, LinkParams, pageTitles, Route, RouteName, routes } from './Router'

/**
 * Get the raw path of the current route, as defined in useRoutes.\
 * E.g. `/invoices/123` => `/invoices/:id`\
 * Note : trailing slash and url params are removed.
 */
function useRawPath (): string {
	const location = useLocation()
	const params = useParams()

	const rawPath = useMemo(() => {
		const pathname = location.pathname.replace(/(?<=.+)\/$/, '') // remove trailing slash

		return Object.keys(params).reduce((path, key) => {
			if (params[key] === undefined) {
				return path
			}

			return path.replace(new RegExp(`(?<=/)${params[key]}(?=/|$)`), `:${key}`) // replace params with :key
		}, pathname)
	}, [location.pathname, params])

	return rawPath
}

/**
 * Get the current route, as defined in useRoutes.
 */
function useCurrentRoute (): Route {
	const rawPath = useRawPath()
	const isLogged = useAppSelector(isLoggedSelector)

	const currentRoute = useMemo(() => {
		return Object.values(routes).find(({ path }) => path && path === rawPath)
	}, [rawPath])

	if (currentRoute == null || (isLogged && currentRoute.hideWhenLogged)) {
		return routes.notFound
	}

	return currentRoute
}

/**
 * Get the current page title, already translated.
 */
function useCurrentTitle (): string {
	const translate = useTranslate()
	const { name } = useCurrentRoute()
	const params = useParams()

	return translate(pageTitles[name!], params)
}

/**
 * Navigate to the given route.
 */
function useNavigate () {
	const routerNavigate = useRouterNavigate()

	const navigate = (to: RouteName, params: LinkParams = {}, options?: NavigateOptions) => {
		const path = getPath(to)
		const url = injectParams(path, params)

		routerNavigate(url, options)
	}

	return navigate
}

function useIsRouteAccessible () {
	const currentRoute = useCurrentRoute()
	const isLogged = useAppSelector(isLoggedSelector)

	return isLogged || !currentRoute.protected
}

export function useRouter () {
	const router = {
		currentRoute: useCurrentRoute(),
		currentTitle: useCurrentTitle(),
		navigate: useNavigate(),
		isRouteAccessible: useIsRouteAccessible()
	}

	return router
}
