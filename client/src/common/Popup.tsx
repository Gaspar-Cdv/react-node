import { ReactElement } from 'react'
import { createUseStyles } from 'react-jss'
import Backdrop from './Backdrop'

const userStyles = createUseStyles(theme => ({
	popup: {
		zIndex: theme.zIndexes.popup,
		backgroundColor: 'white',
		minWidth: 400,
		minHeight: 400,
		maxWidth: '100%',
		maxHeight: '100%',
		borderRadius: 5,
		display: 'flex',
		flexDirection: 'column',
		gap: theme.size.small,
		padding: theme.size.medium
	},
	title: {
		textAlign: 'center',
		fontWeight: 700
	},
	content: {
		flex: '1 1 auto'
	}
}))

interface PopupProps {
	show: boolean
	onCancel: () => void
	title?: string
	children: ReactElement | ReactElement[]
}

function Popup ({ show, title, children, onCancel }: PopupProps) {
	const classes = userStyles()

	return (
		<Backdrop show={show} close={onCancel}>
			<div className={classes.popup}>
				{title != null && (
					<div className={classes.title}>{title}</div>
				)}
				<div className={classes.content}>
					{children}
				</div>
			</div>
		</Backdrop>
	)
}

export default Popup
