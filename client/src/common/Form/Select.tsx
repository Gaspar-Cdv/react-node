import { Key, ReactNode, useCallback, useMemo, useState } from 'react'
import { createUseStyles } from 'react-jss'
import { DropdownItem } from '../dropdown/Dropdown'
import DropdownToggle from '../dropdown/DropdownToggle'
import { ReactComponent as ArrowIcon } from '../../images/icons/arrow.svg'
import classNames from 'classnames'

const useStyles = createUseStyles(theme => ({
	container: {
		backgroundColor: theme.color.background,
		display: 'flex',
		alignItems: 'center',
		borderRadius: 3,
		border: [1, 'solid', theme.color.secondary],
		minHeight: '2rem',
		maxWidth: '12rem'
	},
	select: {
		padding: ['0.5rem', '1rem'],
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
		overflow: 'hidden'
	},
	arrow: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		transform: 'rotateX(0deg)',
		transition: 'transform 300ms',
		marginRight: '0.5rem',
	},
	open: {
		transform: 'rotateX(-180deg)'
	}
}))

interface SelectProps {
	placeholder?: ReactNode
	options: DropdownItem[]
	selected?: Key
}

function Select ({ placeholder, options, selected }: SelectProps) {
	const classes = useStyles()
	const [isOpen, setIsOpen] = useState(false)

	const selectedLabel = useMemo(() => {
		const option = options.find(o => o.key === selected)
		return option?.label || placeholder
	}, [selected, options, placeholder])

	const handleItemSelection = useCallback((item: DropdownItem) => {
		return {
			...item,
			selected: item.key === selected
		}
	}, [selected])

	const handleClick = () => {
		setIsOpen(isOpen => !isOpen)
	}

	const handleClose = () => {
		setIsOpen(false)
	}

	return (
		<DropdownToggle
			items={options.map(handleItemSelection)}
			show={isOpen}
			onClick={handleClick}
			onClose={handleClose}
		>
			<div className={classes.container} title={selectedLabel?.toString()}>
				<div className={classes.select}>
					{selectedLabel}
				</div>

				<div className={classNames(classes.arrow, { [classes.open]: isOpen })}>
					<ArrowIcon />
				</div>
			</div>
		</DropdownToggle>
	)
}

export default Select
