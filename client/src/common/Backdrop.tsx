import classNames from 'classnames'
import { MouseEventHandler, ReactElement } from 'react'
import { createUseStyles } from 'react-jss'
import { backdropTransitionDuration } from '../constants'
import { useFadeTransition } from '../utils/hooks'

interface JSSProps {
	zIndex?: number
}

const useStyles = createUseStyles(theme => ({
	backdrop: ({ zIndex }: JSSProps) => ({
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
	const classes = useStyles({ zIndex })
	const { fadeTransition, inDOM } = useFadeTransition(show, backdropTransitionDuration)

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
