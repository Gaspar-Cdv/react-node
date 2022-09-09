import classNames from 'classnames'
import { ReactNode } from 'react'
import { createUseStyles } from 'react-jss'
import { ReactComponent as InfoIcon } from '../images/icons/info.svg'
import { ReactComponent as CloseIcon } from '../images/icons/close.svg'

const useStyles = createUseStyles(theme => ({
	container: {
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		gap: 20,
		padding: [10, 40, 10, 20],
		borderRadius: theme.borderRadius.xs,
		'& svg': {
			flex: [0, 0, 'auto']
		}
	},
	success: {
		color: theme.color.success,
		backgroundColor: theme.color.green[50],
		border: [1, 'solid', theme.color.green[300]]
	},
	warning: {
		color: theme.color.warning,
		backgroundColor: theme.color.amber[50],
		border: [1, 'solid', theme.color.amber[300]]
	},
	danger: {
		color: theme.color.danger,
		backgroundColor: theme.color.red[50],
		border: [1, 'solid', theme.color.red[300]]
	},
	close: {
		position: 'absolute',
		top: 10,
		right: 10,
		cursor: 'pointer'
	}
}))

export interface AlertProps {
	show?: boolean
	severity?: 'success' | 'warning' | 'danger'
	onClose?: () => void
	children: ReactNode
}

function Alert ({ show = true, severity = 'danger', onClose, children }: AlertProps) {
	const classes = useStyles()

	if (!show) {
		return null
	}

	return (
		<div className={classNames(classes.container, classes[severity])}>
			{onClose != null && (
				<CloseIcon onClick={onClose} className={classes.close} />
			)}
			<InfoIcon />
			{children}
		</div>
	)
}

export default Alert
