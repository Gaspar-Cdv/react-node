import { createUseStyles } from 'react-jss'
import Drawer from '../../common/Drawer'
import { RouteName } from '../../common/routing/Router'
import { useSidebarVisibility } from '../../store/elementsVisibility/hooks'
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
			login: 'Login'
		}
	},
	fr: {
		menu: 'Menu',
		route: {
			home: 'Accueil',
			login: 'Connexion'
		}
	}
})

const useStyles = createUseStyles(theme => ({
	drawer: {
		height: `calc(100vh - ${theme.size.menuHeight})`,
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

function Sidebar () {
	const classes = useStyles()
	const translate = useTranslate()
	const theme = useAppTheme()

	const { isSidebarVisible, setIsSidebarVisible } = useSidebarVisibility()

	const handleClose = () => {
		setIsSidebarVisible(false)
	}

	const menuItems: RouteName[] = ['home', 'login']

	return (
		<Drawer
			open={isSidebarVisible}
			onClose={handleClose}
			className={classes.drawer}
			zIndex={theme.zIndex.sidebar}
			position='right'
		>
			<nav className={classes.nav}>
				<h4>{translate(i18n.menu)}</h4>

				<div className={classes.menuItems}>
					{menuItems.map(route => (
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
