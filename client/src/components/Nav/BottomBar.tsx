import { ReactElement } from 'react'
import { createUseStyles } from 'react-jss'
import { BottomBarItemProps } from './BottomBarItem'

const useStyles = createUseStyles(theme => ({
	placeholder: {
		height: theme.size.menuHeight
	},
	container: {
		display: 'flex',
		position: 'fixed',
		bottom: 0,
		height: theme.size.menuHeight,
		width: '100%',
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
		<>
			<nav className={classes.container}>
				{children}
			</nav>

			<div className={classes.placeholder} />
		</>
	)
}

export default BottomBar
