import { Link as ReactRouterLink, LinkProps as ReactRouterLinkProps } from 'react-router-dom'
import { RouteName, routes } from './Router'


export const getUrl = (to: RouteName): string => {
	const url = routes.find(({ name }) => name === to)

	if (url === undefined) {
		throw new Error(`Route ${to} not found`)
	}

	return url.path
}

interface LinkProps extends Omit<ReactRouterLinkProps, 'to'> {
	to: RouteName
}

function Link ({ children, to, ...props }: LinkProps) {
	const url = getUrl(to)

	return (
		<ReactRouterLink to={url} {...props}>
			{children}
		</ReactRouterLink>
	)
}

export default Link
