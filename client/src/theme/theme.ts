import { useTheme } from 'react-jss'
import tailwindColors from './tailwindColors'

const theme = {
	color: {
		...tailwindColors,
		get text (): string {
			return this.gray[700]
		},
		get background (): string {
			return this.gray[50]
		},
		get primary (): string {
			return this.blue[500]
		},
		get secondary (): string {
			return this.gray[500]
		},
		get info (): string {
			return this.blue[500]
		},
		get success (): string {
			return this.green[500]
		},
		get warning (): string {
			return this.amber[500]
		},
		get danger (): string {
			return this.red[500]
		},
		get cta (): string {
			return this.amber[400]
		},
		get menu (): string {
			return this.gray[100]
		},
		get lightBorder (): string {
			return this.gray[300]
		}
	},
	size: {
		xs: '0.5rem',
		sm: '1rem',
		md: '1.5rem',
		lg: '2rem',
		xl: '3rem',
		menuHeight: '3rem'
	},
	zIndex: {
		defaultDrawer: 100,
		sidebar: 100,
		defaultBackdrop: 200,
		topbar: 200,
		popup: 300,
		dropdown: 400,
		loader: 500,
		tooltip: 999 // from react-tooltip (do not change)
	},
	duration: {
		dropdownTransition: 200,
		backdropTransition: 200,
		crossFadeTransition: 200,
		drawerTransition: 400,
	}
}

export type AppTheme = typeof theme

export const useAppTheme = () => useTheme<AppTheme>()

export default theme
