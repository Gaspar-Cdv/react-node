import { Link as ReactRouterLink, LinkProps as ReactRouterLinkProps } from 'react-router-dom'
import { RouteName, routes } from './Router'

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

export interface LinkParams {
	[key: string]: string
}

interface LinkProps extends Omit<ReactRouterLinkProps, 'to'> {
	to: RouteName
	params?: LinkParams
}

function Link ({ children, to, params = {}, ...props }: LinkProps) {
	const path = getPath(to)
	const url = injectParams(path, params)

	return (
		<ReactRouterLink to={url} {...props}>
			{children}
		</ReactRouterLink>
	)
}

export default Link
