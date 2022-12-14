import { ReactNode } from 'react'
import { createUseStyles } from 'react-jss'
import { useAppTheme } from '../../theme/theme'
import Backdrop from '../Backdrop'
import Scrollbar from '../Scrollbar'
import { ReactComponent as CloseIcon } from '../../images/icons/close.svg'
import Portal from './Portal'

const userStyles = createUseStyles(theme => ({
	popup: {
		backgroundColor: theme.color.background,
		borderRadius: theme.borderRadius.sm,
		display: 'flex',
		flexDirection: 'column',
		gap: theme.size.xs,
		padding: [theme.size.sm, 0],
		position: 'relative'
	},
	title: {
		textAlign: 'center',
		minHeight: theme.size.lg
	},
	scrollbars: {
		flex: '1 1 auto',
		maxWidth: '30rem'
	},
	content: {
		padding: [0, theme.size.sm]
	},
	close: {
		position: 'absolute',
		top: theme.size.sm,
		right: theme.size.sm,
		cursor: 'pointer'
	}
}))

export interface PopupProps {
	show: boolean
	onClose: () => void
	title?: string
	children: ReactNode | ReactNode[]
}

function Popup ({ show, title, children, onClose }: PopupProps) {
	const classes = userStyles()
	const theme = useAppTheme()

	return (
		<Portal>
			<Backdrop show={show} close={onClose} zIndex={theme.zIndex.popup}>
				<div className={classes.popup}>
					<CloseIcon className={classes.close} onClick={onClose} />

					<h5 className={classes.title}>{title}</h5>

					<Scrollbar maxHeight='20rem' className={classes.scrollbars}>
						<div className={classes.content}>
							{children}
						</div>
					</Scrollbar>
				</div>
			</Backdrop>
		</Portal>
	)
}

export default Popup
