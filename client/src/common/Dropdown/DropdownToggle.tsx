import { MouseEvent, ReactNode, useRef } from 'react'
import { createUseStyles } from 'react-jss'
import Dropdown, { DropdownItem } from './Dropdown'

const useStyles = createUseStyles({
	container: {
		position: 'relative'
	},
	button: {
		cursor: 'pointer',
		width: 'fit-content'
	}
})

export interface DropdownToggleProps {
	items: DropdownItem[]
	show: boolean
	onClick: (e: MouseEvent<HTMLDivElement>) => void
	onClose: () => void
	children: ReactNode
}

/**
 * IMPORTANT: To prevent undesirable extra space between the component and the dropdown menu, the child component should be displayed block.\
 * TODO: Add a way to prevent window overflow when the dropdown is open too far to the right.
 */
function DropdownToggle ({ items, show, onClick, onClose, children }: DropdownToggleProps) {
	const classes = useStyles()
	const anchorEl = useRef<HTMLDivElement>(null)
	const top = anchorEl.current?.getBoundingClientRect().height
	const width = anchorEl.current?.getBoundingClientRect().width

	const handleClick = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation()
		onClick(e)
	}

	return (
		<div className={classes.container}>
			<div ref={anchorEl} className={classes.button} onClick={handleClick}>
				{children}
			</div>

			<Dropdown
				show={show}
				onClose={onClose}
				items={items}
				top={top}
				minWidth={width}
			/>
		</div>
	)
}

export default DropdownToggle
