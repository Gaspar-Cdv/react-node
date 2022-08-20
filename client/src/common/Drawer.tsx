import classNames from 'classnames'
import { ReactNode, useLayoutEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import theme from '../theme'
import Backdrop from './Backdrop'

interface JssProps {
	width: string
	visible: boolean
}

const useStyles = createUseStyles(theme => ({
	container: ({ width }: JssProps) => ({
		position: 'fixed',
		top: 0,
		width: width,
		height: '100vh',
		zIndex: theme.zIndex.drawer
	}),
	left: ({ visible, width }: JssProps) => ({
		transition: `left ${theme.duration.drawerTransition}ms ease-in-out`,
		left: visible ? 0 : `-${width}`
	}),
	right: ({ visible, width }: JssProps) => ({
		transition: `right ${theme.duration.drawerTransition}ms ease-in-out`,
		right: visible ? 0 : `-${width}`
	})
}))

export interface DrawerProps {
	open: boolean
	onClose: () => void
	width?: number | string
	direction?: 'left' | 'right'
	className?: string
	children?: ReactNode | ReactNode[]
}

function Drawer ({ open, onClose, width = '100vw', direction = 'left', className, children }: DrawerProps) {
	const [inDOM, setInDOM] = useState(false)
	const visible = open && inDOM
	const classes = useStyles({
		width: typeof width === 'number' ? `${width}px` : width,
		visible
	})

	useLayoutEffect(() => {
		if (inDOM !== open) {
			setTimeout(() => {
				setInDOM(open)
			}, open ? 0 : theme.duration.drawerTransition)
		}
	}, [open, inDOM])

	if (!open && !inDOM) {
		return null
	}

	return (
		<>
			<Backdrop
				close={onClose}
				show={open}
				zIndex={theme.zIndex.drawer}
				transitionDuration={theme.duration.drawerTransition}
			/>
			<div className={classNames(classes.container, classes[direction], className)}>
				{children}
			</div>
		</>
	)
}

export default Drawer
