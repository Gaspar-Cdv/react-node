import { Link as ReactRouterLink, LinkProps as ReactRouterLinkProps } from 'react-router-dom'
import { getPath, injectParams, LinkParams, RouteName } from './Router'

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
