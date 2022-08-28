import classNames from 'classnames'
import { ReactNode } from 'react'
import { createUseStyles } from 'react-jss'
import { useCurrentRoute } from '../../common/routing/hooks'
import Link from '../../common/routing/Link'
import { RouteName } from '../../common/routing/Router'
import { useSidebarVisibility } from '../../store/elementsVisibility/hooks'

const useStyles = createUseStyles(theme => ({
	link: {
		color: theme.color.cta,
		textTransform: 'uppercase',
		textDecoration: 'none',
		'&:hover': {
			color: theme.color.amber[400]
		}
	},
	active: {
		fontWeight: 700
	}
}))

interface SidebarMenuItemProps {
	route: RouteName
	children: ReactNode
}

function SidebarMenuItem ({ route, children }: SidebarMenuItemProps) {
	const classes = useStyles()
	const currentRoute = useCurrentRoute()
	const { setIsSidebarVisible } = useSidebarVisibility()

	const isActive = currentRoute.name === route

	return (
		<Link
			to={route}
			onClick={() => setIsSidebarVisible(false)}
			className={classNames(classes.link, { [classes.active]: isActive })}
		>
			{children}
		</Link>
	)
}

export default SidebarMenuItem
