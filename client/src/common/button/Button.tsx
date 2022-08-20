import classNames from 'classnames'
import { MouseEvent, ReactNode } from 'react'
import { createUseStyles } from 'react-jss'
import { colorShader } from '../../utils/stringUtils'

const useStyles = createUseStyles(theme => ({
	container: {
		display: 'inline-flex',
		justifyContent: 'strech',
		alignItems: 'strech',
		backgroundColor: 'white' // to handle background opacity safely
	},
	button: {
		backgroundColor: theme.color.cta,
		border: 'none',
		padding: [theme.size.xs, theme.size.md],
		borderRadius: 1,
		cursor: 'pointer',
		transition: 'background-color 0.2s',
		'&:hover:not($disabled)': {
			backgroundColor: colorShader(theme.color.cta, 20)
		}
	},
	secondary: {
		color: 'white',
		backgroundColor: theme.color.secondary,
		'&:hover:not($disabled)': {
			backgroundColor: colorShader(theme.color.secondary, 20)
		}
	},
	danger: {
		color: 'white',
		backgroundColor: theme.color.danger,
		'&:hover:not($disabled)': {
			backgroundColor: colorShader(theme.color.danger, 20)
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
}

function Button ({ onClick, variant = 'primary', disabled = false, type = 'button', children }: ButtonProps) {
	const classes = useStyles()
	const className = classNames(classes.button, {
		[classes.disabled]: disabled,
		[classes.secondary]: variant === 'secondary',
		[classes.danger]: variant === 'danger'
	})

	return (
		<div className={classes.container}>
			<button type={type} className={className} onClick={e => !disabled && onClick?.(e)}>
				{children}
			</button>
		</div>
	)
}

export default Button
