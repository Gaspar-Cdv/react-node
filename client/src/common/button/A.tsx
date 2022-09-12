import { AnchorHTMLAttributes, DetailedHTMLProps } from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles(theme => ({
	link: {
		color: theme.color.blue[600],
		textDecoration: 'none',
		cursor: 'pointer',
		'&:hover': {
			color: theme.color.blue[500],
			textDecoration: 'underline'
		}
	}
}))

type AProps = DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>

function A ({ href, onClick, children, ...props }: AProps) {
	const classes = useStyles()

	return (
		<a
			href={href}
			onClick={onClick}
			className={classes.link}
			{...props}
		>
			{children}
		</a>
	)
}

export default A
