import { forwardRef, Key, ReactNode, useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import DropdownItem from './DropdownItem'
import Scrollbar from '../Scrollbar'

const maxHeight = 200
const transitionDuration = 200

interface JssProps {
	visible: boolean
	minWidth?: number
	top?: number
	left?: number
	bottom?: number
	right?: number
}

const useStyles = createUseStyles(theme => ({
	menu: ({ visible, minWidth, ...positions }: JssProps) => ({
		position: 'absolute',
		...positions,
		backgroundColor: theme.color.background,
		border: '1px solid #dddddd',
		borderRadius: 3,
		minWidth: minWidth || 100,
		transition: `all ${transitionDuration}ms`,
		transitionProperty: 'max-height, opacity',
		opacity: visible ? 1 : 0,
		maxHeight: visible ? maxHeight : 0
	})
}))

export interface DropdownItem {
	key: Key
	label: ReactNode
	onClick: () => void
}

export interface DropdownProps {
	show: boolean
	onClose: () => void
	items: DropdownItem[]
	minWidth?: number
	top?: number
	left?: number
	bottom?: number
	right?: number
}

const Dropdown = forwardRef(({ show, onClose, items, minWidth, ...positions }: DropdownProps, ref: React.Ref<HTMLDivElement>) => {
	const [inDOM, setInDOM] = useState(false)
	const visible = show && inDOM
	const classes = useStyles({ visible, minWidth, ...positions })

	useEffect(() => {
		if (inDOM !== show) {
			setTimeout(() => {
				setInDOM(show)
			}, show ? 0 : transitionDuration)
		}
	}, [show, inDOM])

	useEffect(() => {
		if (show) {
			document.addEventListener('click', onClose)
		}

		return () => {
			document.removeEventListener('click', onClose)
		}
	}, [onClose, show])

	if (!show && !inDOM) {
		return null
	}

	return (
		<Scrollbar className={classes.menu} maxHeight={maxHeight} ref={ref}>
			{items.map(({ key, label, onClick }) => {
				const handleClick = () => {
					onClick()
					onClose()
				}

				return (
					<DropdownItem key={key} onClick={handleClick}>
						{label}
					</DropdownItem>
				)
			})}
		</Scrollbar>

	)
})

Dropdown.displayName = 'Dropdown'

export default Dropdown
