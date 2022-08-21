import Backdrop from './Backdrop'
import loader from '../images/loader.svg'
import { useAppTheme } from '../theme/theme'
import { createUseStyles } from 'react-jss'
import { defineI18n, useTranslate } from '../utils/i18n'

const useStyles = createUseStyles({
	container: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		userSelect: 'none'
	},
	loader: {
		width: '7.5rem'
	},
	message: {
		fontSize: '1.2rem',
		color: 'white',
		textShadow: '0 0 5px black'
	}
})

const i18n = defineI18n({
	en: {
		loading: 'Loading...'
	},
	fr: {
		loading: 'Chargement...'
	}
})

interface LoaderProps {
	show: boolean
}

function Loader ({ show }: LoaderProps) {
	const classes = useStyles()
	const translate = useTranslate()
	const theme = useAppTheme()

	return (
		<Backdrop show={show} zIndex={theme.zIndex.loader}>
			<div className={classes.container}>
				<img src={loader} alt='loading' className={classes.loader} />
				<span className={classes.message}>
					{translate(i18n.loading)}
				</span>
			</div>
		</Backdrop>
	)
}

export default Loader
