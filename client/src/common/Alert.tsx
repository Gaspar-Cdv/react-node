import classNames from 'classnames'
import { ReactNode } from 'react'
import { createUseStyles } from 'react-jss'
import { ReactComponent as InfoIcon } from '../images/icons/info.svg'

const useStyles = createUseStyles(theme => ({
	container: {
		display: 'flex',
		alignItems: 'center',
		gap: 20,
		padding: [10, 20],
		borderRadius: theme.borderRadius.xs
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
	}
}))

interface AlertProps {
	show?: boolean
	severity?: 'success' | 'warning' | 'danger'
	children: ReactNode
}

function Alert ({ show = true, severity = 'danger', children }: AlertProps) {
	const classes = useStyles()

	if (!show) {
		return null
	}

	return (
		<div className={classNames(classes.container, classes[severity])}>
			<InfoIcon />
			{children}
		</div>
	)
}

export default Alert
