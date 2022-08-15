import { ReactNode, useState } from 'react'
import { createUseStyles } from 'react-jss'
import { DropdownItem } from '../Dropdown/Dropdown'
import DropdownToggle from '../Dropdown/DropdownToggle'
import { ReactComponent as ArrowIcon } from '../../images/arrow.svg'

interface JssProps {
	isOpen: boolean
}

const useStyles = createUseStyles(theme => ({
	container: {
		backgroundColor: theme.color.background,
		display: 'flex',
		alignItems: 'center',
		borderRadius: 3,
		border: [1, 'solid', theme.color.secondary],
		minHeight: 30,
	},
	select: {
		padding: [5, 10],
	},
	arrow: ({ isOpen }: JssProps) => ({
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		transform: isOpen ? 'rotateX(-180deg)' : 'rotateX(0deg)',
		transition: 'transform 300ms',
		marginRight: 5,
	})
}))

interface SelectProps {
	options: DropdownItem[]
	children: ReactNode
}

function Select ({ options, children }: SelectProps) {
	const [isOpen, setIsOpen] = useState(false)
	const classes = useStyles({ isOpen })

	const handleClick = () => {
		setIsOpen(isOpen => !isOpen)
	}

	const handleClose = () => {
		setIsOpen(false)
	}

	return (
		<DropdownToggle items={options} show={isOpen} onClick={handleClick} onClose={handleClose}>
			<div className={classes.container}>
				<div className={classes.select}>
					{children}
				</div>
				<div className={classes.arrow}>
					<ArrowIcon />
				</div>
			</div>
		</DropdownToggle>
	)
}

export default Select
