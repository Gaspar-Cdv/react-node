import { useLocation, useParams } from 'react-router-dom'
import { useTranslate } from '../../utils/i18n'
import { pageTitles, Route, routes } from './Router'

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
export function useCurrentRoute (): Route {
	const rawPath = useRawPath()
	const currentRoute = Object.values(routes).find(({ path }) => path && path === rawPath)

	return currentRoute || routes.notFound
}

/**
 * Get the current page title, already translated.
 */
export function useCurrentTitle (): string {
	const translate = useTranslate()
	const { name } = useCurrentRoute()
	const params = useParams()

	return translate(pageTitles[name!], params)
}
