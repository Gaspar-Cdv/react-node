import classNames from 'classnames'
import { ReactNode } from 'react'
import { createUseStyles } from 'react-jss'
import { useCurrentRoute } from '../../common/routing/hooks'
import Link from '../../common/routing/Link'
import { RouteName } from '../../common/routing/Router'

const useStyles = createUseStyles(theme => ({
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
		margin: [3, 7],
		borderRadius: theme.borderRadius.sm,
		cursor: 'pointer',
		color: theme.color.gray[400],
		transition: 'color 100ms linear',
		'&:hover': {
			color: theme.color.gray[500]
		},
		'& > svg': {
			height: `calc(${theme.size.menuHeight} - 1rem)`,
			width: `calc(${theme.size.menuHeight} - 1rem)`
		}
	},
	active: {
		color: theme.color.gray[800],
		'&:hover': {
			color: theme.color.gray[800],
		}
	}
}))

export interface BottomBarItemProps {
	icon: ReactNode
	route?: RouteName
	onClick?: () => void
}

function BottomBarItem ({ icon, route, onClick }: BottomBarItemProps) {
	const classes = useStyles()
	const currentRoute = useCurrentRoute()

	const isActive = currentRoute.name === route

	const props = {
		onClick,
		className: classNames(classes.container, { [classes.active]: isActive })
	}

	if (route != null) {
		return (
			<Link to={route} {...props}>
				{icon}
			</Link>
		)
	}

	return (
		<div {...props}>
			{icon}
		</div>
	)
}

export default BottomBarItem
