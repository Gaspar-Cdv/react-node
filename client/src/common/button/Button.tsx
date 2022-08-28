import classNames from 'classnames'
import { FunctionComponent, MouseEvent, ReactNode } from 'react'
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
		gap: theme.size.xs,
		backgroundColor: theme.color.cta,
		border: 'none',
		padding: [theme.size.xs, theme.size.sm],
		borderRadius: 1,
		cursor: 'pointer',
		transition: 'background-color 0.2s',
		'&:hover:not($disabled)': {
			backgroundColor: theme.color.amber[300]
		}
	},
	secondary: {
		color: theme.color.gray[50],
		backgroundColor: theme.color.secondary,
		'&:hover:not($disabled)': {
			backgroundColor: theme.color.gray[600]
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
}))

export interface ButtonProps {
	children: ReactNode
	onClick?: (e?: MouseEvent) => void
	disabled?: boolean
	variant?: 'primary' | 'secondary' | 'danger'
	type?: 'button' | 'reset' | 'submit'
	icon?: FunctionComponent<React.SVGProps<SVGSVGElement>>
}

function Button ({ onClick, variant = 'primary', disabled = false, type = 'button', icon: Icon, children }: ButtonProps) {
	const classes = useStyles()
	const className = classNames(classes.button, {
		[classes.disabled]: disabled,
		[classes.secondary]: variant === 'secondary',
		[classes.danger]: variant === 'danger'
	})

	return (
		<div className={classes.container}>
			<button type={type} className={className} onClick={e => !disabled && onClick?.(e)}>
				{Icon != null && (
					<Icon width='1rem' height='1rem' />
				)}

				{children}
			</button>
		</div>
	)
}

export default Button
