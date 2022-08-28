import { createUseStyles } from 'react-jss'
import BottomBarItem from './BottomBarItem'
import { ReactComponent as InfoIcon } from '../../images/icons/info.svg'
import { ReactComponent as QuestionIcon } from '../../images/icons/question.svg'

const useStyles = createUseStyles(theme => ({
	container: {
		display: 'flex',
		height: theme.size.menuHeight,
		backgroundColor: theme.color.menu,
		zIndex: theme.zIndex.topbar,
		borderTop: `1px solid ${theme.color.lightBorder}`
	}
}))

function BottomBar () {
	const classes = useStyles()

	return (
		<nav className={classes.container}>
			<BottomBarItem icon={<InfoIcon />} route='home' />
			<BottomBarItem icon={<QuestionIcon />} route='login' />
		</nav>
	)
}

export default BottomBar
