import { useMemo } from 'react'
import { createUseStyles } from 'react-jss'
import Drawer from '../../common/Drawer'
import { RouteName } from '../../common/routing/Router'
import { useSidebarVisibility } from '../../store/elementsVisibility/hooks'
import { isLoggedSelector } from '../../store/session/selectors'
import { useAppSelector } from '../../store/store'
import { useAppTheme } from '../../theme/theme'
import { defineI18n, useTranslate } from '../../utils/i18n'
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher'
import SidebarMenuItem from './SidebarMenuItem'

type SidebarI18n = {
	menu: string
	route: { [key in RouteName]: string }
}

const i18n = defineI18n<SidebarI18n>({
	en: {
		menu: 'Menu',
		route: {
			home: 'Home',
			login: 'Login',
			logout: 'Logout',
			register: 'Register'
		}
	},
	fr: {
		menu: 'Menu',
		route: {
			home: 'Accueil',
			login: 'Connexion',
			logout: 'Se déconnecter',
			register: 'Inscription'
		}
	}
})

const useStyles = createUseStyles(theme => ({
	drawer: {
		height: `calc(100vh - ${theme.size.menuHeight} * 2)`, // remove topbar and bottombar height
		top: theme.size.menuHeight,
		backgroundColor: theme.color.menu,
	},
	nav: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		paddingTop: '5rem',
		gap: '3rem'
	},
	menuItems: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		gap: '1rem'
	}
}))

interface MenuItem {
	route: RouteName
	visible?: boolean
}

function Sidebar () {
	const classes = useStyles()
	const translate = useTranslate()
	const theme = useAppTheme()
	const isLogged = useAppSelector(isLoggedSelector)

	const [isSidebarVisible, setIsSidebarVisible] = useSidebarVisibility()

	const handleClose = () => {
		setIsSidebarVisible(false)
	}

	const menuItems: MenuItem[] = useMemo(() => [
		{
			route: 'home'
		},
		{
			route: 'login',
			visible: !isLogged
		},
		{
			route: 'register',
			visible: !isLogged
		},
		{
			route: 'logout',
			visible: isLogged
		}
	], [isLogged])

	return (
		<Drawer
			open={isSidebarVisible}
			onClose={handleClose}
			className={classes.drawer}
			zIndex={theme.zIndex.sidebar}
			width={400}
			position='right'
		>
			<nav className={classes.nav}>
				<h4>{translate(i18n.menu)}</h4>

				<div className={classes.menuItems}>
					{menuItems
						.filter(({ visible }) => visible ?? true)
						.map(({ route }) => (
							<SidebarMenuItem key={route} route={route}>
								{translate(i18n.route[route])}
							</SidebarMenuItem>
						))}
				</div>

				<LanguageSwitcher />
			</nav>
		</Drawer>
	)
}

export default Sidebar
