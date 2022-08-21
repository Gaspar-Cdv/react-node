import classNames from 'classnames'
import { ReactNode, useLayoutEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import { useAppTheme } from '../theme'
import Backdrop from './Backdrop'

interface JssProps {
	width: string
	visible: boolean
	zIndex?: number
}

const useStyles = createUseStyles(theme => ({
	container: ({ width, zIndex }: JssProps) => ({
		position: 'fixed',
		top: 0,
		width: width,
		height: '100vh',
		backgroundColor: 'white',
		zIndex: zIndex || theme.zIndex.defaultDrawer
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
	position?: 'left' | 'right'
	zIndex?: number
	className?: string
	children?: ReactNode | ReactNode[]
}

function Drawer ({ open, onClose, width = '100vw', position = 'left', zIndex, className, children }: DrawerProps) {
	const theme = useAppTheme()
	const [inDOM, setInDOM] = useState(false)
	const visible = open && inDOM
	const classes = useStyles({
		width: typeof width === 'number' ? `${width}px` : width,
		visible,
		zIndex
	})

	useLayoutEffect(() => {
		if (inDOM !== open) {
			setTimeout(() => {
				setInDOM(open)
			}, open ? 0 : theme.duration.drawerTransition)
		}
	}, [open, inDOM, theme.duration.drawerTransition])

	if (!open && !inDOM) {
		return null
	}

	return (
		<>
			<Backdrop
				close={onClose}
				show={open}
				zIndex={theme.zIndex.defaultDrawer}
				transitionDuration={theme.duration.drawerTransition}
			/>
			<div className={classNames(classes.container, classes[position], className)}>
				{children}
			</div>
		</>
	)
}

export default Drawer
