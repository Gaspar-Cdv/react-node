import { MouseEventHandler, ReactElement, useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import { backdropTransitionDuration } from '../constants'

interface JSSProps {
	visible: boolean
	zIndex?: number
}

const useStyles = createUseStyles(theme => ({
	backdrop: ({ visible, zIndex }: JSSProps) => ({
		zIndex: zIndex ?? theme.zIndexes.backdrop,
		position: 'fixed',
		top: 0,
		left: 0,
		height: '100%',
		width: '100%',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		transition: `opacity ${backdropTransitionDuration}ms`,
		opacity: visible ? 1 : 0,
		backdropFilter: 'blur(1px)'
	})
}))

interface BackdropProps {
	show: boolean
	close?: MouseEventHandler
	zIndex?: number
	children: ReactElement | ReactElement[]
}

function Backdrop ({ show, close, zIndex, children }: BackdropProps) {
	const [inDOM, setInDOM] = useState(false)
	const visible = show && inDOM
	const classes = useStyles({ visible, zIndex })

	useEffect(() => {
		if (inDOM !== show) {
			setTimeout(() => {
				setInDOM(show)
			}, show ? 0 : backdropTransitionDuration)
		}
	}, [show, inDOM])

	if (!show && !inDOM) {
		return null
	}

	return (
		<div className={classes.backdrop} onClick={close}>
			<div onClick={e => e.stopPropagation()}>
				{children}
			</div>
		</div>
	)
}

export default Backdrop
