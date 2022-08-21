import classNames from 'classnames'
import { MouseEventHandler, ReactNode, useEffect } from 'react'
import { createUseStyles } from 'react-jss'
import { useAppTheme } from '../theme/theme'
import { useFadeTransition } from '../utils/hooks'

interface JSSProps {
	zIndex?: number
}

const useStyles = createUseStyles(theme => ({
	backdrop: ({ zIndex }: JSSProps) => ({
		zIndex: zIndex ?? theme.zIndex.defaultBackdrop,
		position: 'fixed',
		top: 0,
		left: 0,
		height: '100%',
		width: '100%',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backdropFilter: 'blur(1px)'
	}),
	noScroll: {
		overflow: 'hidden'
	}
}))

interface BackdropProps {
	show: boolean
	close?: MouseEventHandler
	zIndex?: number
	transitionDuration?: number
	children?: ReactNode | ReactNode[]
}

function Backdrop ({ show, close, zIndex, transitionDuration, children }: BackdropProps) {
	const classes = useStyles({ zIndex })
	const theme = useAppTheme()
	const { fadeTransition, inDOM } = useFadeTransition(show, transitionDuration || theme.duration.backdropTransition)

	useEffect(() => {
		document.body.classList.add(classes.noScroll)
		return () => {
			document.body.classList.remove(classes.noScroll)
		}
	}, [classes.noScroll])

	if (!show && !inDOM) {
		return null
	}

	return (
		<div className={classNames(classes.backdrop, fadeTransition)} onClick={close}>
			<div onClick={e => e.stopPropagation()}>
				{children}
			</div>
		</div>
	)
}

export default Backdrop
