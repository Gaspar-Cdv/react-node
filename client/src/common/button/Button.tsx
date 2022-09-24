import classNames from 'classnames'
import { MouseEvent, ReactNode } from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles(theme => ({
	container: {
		display: 'inline-flex',
		justifyContent: 'strech',
		alignItems: 'strech',
		backgroundColor: 'white' // to handle background opacity safely
	},
	button: {
		display: 'flex',
		alignItems: 'center',
		gap: theme.size.sm,
		backgroundColor: theme.color.cta,
		border: 'none',
		padding: [theme.size.sm, theme.size.lg],
		fontSize: '1rem',
		borderRadius: theme.borderRadius.xs,
		cursor: 'pointer',
		transition: 'background-color 0.2s',
		textTransform: 'uppercase',
		'&:hover:not($disabled)': {
			backgroundColor: theme.color.amber[300]
		},
		'& > svg': {
			transform: 'scale(1.3)',
			width: '1rem',
			height: '1rem'
		}
	},
	secondary: {
		color: theme.color.gray[50],
		backgroundColor: theme.color.secondary,
		'&:hover:not($disabled)': {
			backgroundColor: theme.color.gray[400]
		}
	},
	danger: {
		color: theme.color.gray[50],
		backgroundColor: theme.color.danger,
		'&:hover:not($disabled)': {
			backgroundColor: theme.color.red[400]
		}
	},
	disabled: {
		cursor: 'auto',
		opacity: 0.5
	},
	small: {
		padding: [theme.size.xs, theme.size.sm],
		fontSize: '0.875rem',
		gap: theme.size.xs,
		'& > svg': {
			transform: 'scale(1.1)',
			width: '0.875rem',
			height: '0.875rem'
		}
	}
}))

export interface ButtonProps {
	children: ReactNode
	onClick?: (e?: MouseEvent) => void
	disabled?: boolean
	variant?: 'primary' | 'secondary' | 'danger'
	type?: 'button' | 'reset' | 'submit'
	small?: boolean
	icon?: ReactNode
}

function Button ({ onClick, variant = 'primary', disabled = false, type = 'button', small = false, icon, children }: ButtonProps) {
	const classes = useStyles()
	const className = classNames(classes.button, {
		[classes.small]: small,
		[classes.disabled]: disabled,
		[classes.secondary]: variant === 'secondary',
		[classes.danger]: variant === 'danger'
	})

	return (
		<div className={classes.container}>
			<button type={type} className={className} onClick={e => !disabled && onClick?.(e)}>
				{icon}

				{children}
			</button>
		</div>
	)
}

export default Button
