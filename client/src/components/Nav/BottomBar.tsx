import { ReactElement } from 'react'
import { createUseStyles } from 'react-jss'
import { BottomBarItemProps } from './BottomBarItem'

const useStyles = createUseStyles(theme => ({
	container: {
		display: 'flex',
		height: theme.size.menuHeight,
		backgroundColor: theme.color.menu,
		zIndex: theme.zIndex.topbar,
		borderTop: `1px solid ${theme.color.lightBorder}`
	}
}))

interface BottomBarProps {
	children: ReactElement<BottomBarItemProps> | ReactElement<BottomBarItemProps>[]
}

function BottomBar ({ children }: BottomBarProps) {
	const classes = useStyles()

	return (
		<nav className={classes.container}>
			{children}
		</nav>
	)
}

export default BottomBar
