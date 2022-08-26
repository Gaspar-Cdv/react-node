import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import Link from '../../common/routing/Link'
import { ReactComponent as BurgerIcon } from '../../images/icons/burger.svg'
import { ReactComponent as CloseIcon } from '../../images/icons/close.svg'
import { useSidebarVisibility } from '../../store/elementsVisibility/hooks'
import { useAppTheme } from '../../theme/theme'
import { defineI18n, useTranslate } from '../../utils/i18n'

const i18n = defineI18n({
	en: {
		title: 'Title',
		home: 'Home',
		login: 'Login',
	},
	fr: {
		title: 'Titre',
		home: 'Accueil',
		login: 'Connexion',
	}
})

const useStyles = createUseStyles(theme => ({
	placeholder: {
		height: theme.size.menuHeight
	},
	navbar: {
		height: theme.size.menuHeight,
		width: '100%',
		position: 'fixed',
		display: 'flex',
		justifyContent: 'space-between',
		backgroundColor: theme.color.menu,
		borderBottom: `1px solid ${theme.color.lightBorder}`,
		zIndex: theme.zIndex.topbar
	},
	title: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '0 1.5rem',
		textDecoration: 'none',
		color: '#333',
		fontSize: '1.5rem',
		fontWeight: 700,
		'&:hover': {
			textDecoration: 'none'
		}
	},
	menuIcon: {
		cursor: 'pointer',
		transition: `opacity ${theme.duration.crossFadeTransition}ms ease-in-out, color 300ms`,
		opacity: 1,
		width: `calc(1.5rem + ${theme.size.menuHeight})`,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		color: '#999',
		'&:hover': {
			color: '#666'
		},
		'& svg': {
			padding: '0.5rem',
			height: theme.size.menuHeight,
			width: theme.size.menuHeight
		}
	},
	transparent: {
		opacity: 0
	}
}))

function Topbar () {
	const classes = useStyles()
	const translate = useTranslate()
	const theme = useAppTheme()

	const { isSidebarVisible, setIsSidebarVisible } = useSidebarVisibility()
	const [menuIcon, setMenuIcon] = useState(isSidebarVisible ? <CloseIcon /> : <BurgerIcon />)
	const [isMenuIconVisible, setIsMenuIconVisible] = useState(true)

	const handleClick = () => {
		setIsMenuIconVisible(false)
		setIsSidebarVisible(!isSidebarVisible)
		setTimeout(() => {
			setIsMenuIconVisible(true)
		}, theme.duration.crossFadeTransition)
	}

	useEffect(() => {
		if (isMenuIconVisible) {
			setMenuIcon(isSidebarVisible ? <CloseIcon /> : <BurgerIcon />)
		}
	}, [isMenuIconVisible, isSidebarVisible])

	return (
		<>
			<nav className={classes.navbar}>
				<Link to='home' className={classes.title} onClick={() => setIsSidebarVisible(false)}>
					{translate(i18n.title)}
				</Link>

				<div onClick={handleClick} className={classNames(classes.menuIcon, { [classes.transparent]: !isMenuIconVisible })}>
					{menuIcon}
				</div>
			</nav>

			<div className={classes.placeholder} />
		</>
	)
}

export default Topbar
