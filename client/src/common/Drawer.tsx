import classNames from 'classnames'
import { ReactNode, useLayoutEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import theme from '../theme'

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
		zIndex: theme.zIndex.menu
	}),
	left: ({ visible, width }: JssProps) => ({
		transition: `left ${theme.duration.menuTransition}ms ease-in-out`,
		left: visible ? 0 : `-${width}`
	}),
	right: ({ visible, width }: JssProps) => ({
		transition: `right ${theme.duration.menuTransition}ms ease-in-out`,
		right: visible ? 0 : `-${width}`
	})
}))

export interface DrawerProps {
	open: boolean
	width?: number | string
	direction?: 'left' | 'right'
	className?: string
	children?: ReactNode | ReactNode[]
}

function Drawer ({ open, width = '100vw', direction = 'left', className, children }: DrawerProps) {
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
			}, open ? 0 : theme.duration.menuTransition)
		}
	}, [open, inDOM])

	if (!open && !inDOM) {
		return null
	}

	return (
		<div className={classNames(classes.container, classes[direction], className)}>
			{children}
		</div>
	)
}

export default Drawer
