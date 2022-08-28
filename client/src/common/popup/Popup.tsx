import { ReactNode } from 'react'
import { createUseStyles } from 'react-jss'
import { useAppTheme } from '../../theme/theme'
import Backdrop from '../Backdrop'
import Scrollbar from '../Scrollbar'

const userStyles = createUseStyles(theme => ({
	popup: {
		backgroundColor: theme.color.background,
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
	const theme = useAppTheme()

	return (
		<Backdrop show={show} close={onCancel} zIndex={theme.zIndex.popup}>
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
