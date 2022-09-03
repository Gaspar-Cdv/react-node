import { NavigateOptions, useLocation, useNavigate as useRouterNavigate, useParams } from 'react-router-dom'
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

	const pathname = location.pathname.replace(/(?<=.+)\/$/, '') // remove trailing slash

	const rawPath = Object.keys(params).reduce((path, key) => {
		if (params[key] === undefined) {
			return path
		}

		return path.replace(new RegExp(`(?<=/)${params[key]}(?=/|$)`), `:${key}`) // replace params with :key
	}, pathname)

	return rawPath
}

/**
 * Get the current route, as defined in useRoutes.
 */
function useCurrentRoute (): Route {
	const rawPath = useRawPath()
	const currentRoute = Object.values(routes).find(({ path }) => path && path === rawPath)

	return currentRoute || routes.notFound
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

export function useRouter () {
	const router = {
		currentRoute: useCurrentRoute(),
		currentTitle: useCurrentTitle(),
		navigate: useNavigate()
	}

	return router
}
