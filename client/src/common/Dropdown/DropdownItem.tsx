import classNames from 'classnames'
import { ReactNode } from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles(theme => ({
	item: {
		display: 'flex',
		alignItems: 'center',
		minHeight: '2rem',
		padding: ['0.5rem', '1rem'],
		cursor: 'pointer',
		transition: 'background-color 0.1s',
		'&:hover': {
			backgroundColor: theme.color.gray[100]
		}
	},
	selected: {
		backgroundColor: theme.color.gray[200],
		'&:hover': {
			backgroundColor: theme.color.gray[200]
		}
	}
}))

export interface DropdownItemProps {
	onClick: () => void
	selected?: boolean
	children: ReactNode
}

function DropdownItem ({ onClick, selected, children }: DropdownItemProps) {
	const classes = useStyles()

	return (
		<div
			onClick={onClick}
			className={classNames(classes.item, { [classes.selected]: selected ?? false })}
		>
			{children}
		</div>
	)
}

export default DropdownItem
