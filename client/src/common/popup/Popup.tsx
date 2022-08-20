import { ReactNode } from 'react'
import { createUseStyles } from 'react-jss'
import theme from '../../theme'
import Backdrop from '../Backdrop'
import Scrollbar from '../Scrollbar'

const userStyles = createUseStyles(theme => ({
	popup: {
		backgroundColor: 'white',
		width: '100%',
		height: '100%',
		borderRadius: 5,
		display: 'flex',
		flexDirection: 'column',
		gap: theme.size.xs,
		padding: theme.size.sm
	},
	title: {
		textAlign: 'center',
		fontWeight: 700
	},
	content: {
		flex: '1 1 auto',
		maxWidth: '30rem'
	}
}))

export interface PopupProps {
	show: boolean
	onCancel: () => void
	title?: string
	children: ReactNode | ReactNode[]
}

function Popup ({ show, title, children, onCancel }: PopupProps) {
	const classes = userStyles()

	return (
		<Backdrop show={show} close={onCancel} zIndex={theme.zIndexes.popup}>
			<div className={classes.popup}>
				{title != null && (
					<div className={classes.title}>{title}</div>
				)}
				<Scrollbar maxHeight='20rem' className={classes.content}>
					{children}
				</Scrollbar>
			</div>
		</Backdrop>
	)
}

export default Popup
