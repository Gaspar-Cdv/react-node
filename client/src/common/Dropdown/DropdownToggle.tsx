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
	align?: 'left' | 'right'
	children: ReactNode
}

/**
 * IMPORTANT: To prevent undesirable extra space between the component and the dropdown menu, the child component should be displayed block.
 */
function DropdownToggle ({ items, show, onClick, onClose, align = 'left', children }: DropdownToggleProps) {
	const classes = useStyles()
	const anchorEl = useRef<HTMLDivElement>(null)
	const { height, width } = anchorEl.current?.getBoundingClientRect() || { height: 0, width: 0 }
	const right = align === 'right' ? 0 : undefined

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
				top={height}
				right={right}
				minWidth={width}
			/>
		</div>
	)
}

export default DropdownToggle
