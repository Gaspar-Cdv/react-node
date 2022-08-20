import { ReactNode } from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
	item: {
		display: 'flex',
		alignItems: 'center',
		minHeight: '2rem',
		padding: ['0.5rem', '1rem'],
		cursor: 'pointer',
		transition: 'background-color 0.1s',
		'&:hover': {
			backgroundColor: '#dddddd'
		}
	}
})

export interface DropdownItemProps {
	onClick: () => void
	children: ReactNode
}

function DropdownItem ({ onClick, children }: DropdownItemProps) {
	const classes = useStyles()

	return (
		<div onClick={onClick} className={classes.item}>
			{children}
		</div>
	)
}

export default DropdownItem
