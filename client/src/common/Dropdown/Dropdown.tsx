import { forwardRef, Key, ReactNode, useEffect, useLayoutEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import DropdownItem from './DropdownItem'
import Scrollbar from '../Scrollbar'
import theme from '../../theme'

const MIN_WIDTH = '6rem'
const MAX_HEIGHT = '16rem'

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
		minWidth: minWidth || MIN_WIDTH,
		transition: `all ${theme.duration.dropdownTransition}ms linear`,
		transitionProperty: 'max-height, opacity',
		opacity: visible ? 1 : 0,
		maxHeight: visible ? MAX_HEIGHT : 0,
		overflow: 'hidden'
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

	useLayoutEffect(() => {
		if (inDOM !== show) {
			setTimeout(() => {
				setInDOM(show)
			}, show ? 0 : theme.duration.dropdownTransition)
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
		<Scrollbar className={classes.menu} maxHeight={MAX_HEIGHT} ref={ref}>
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
