import { useTheme } from 'react-jss'

// see palette : https://javisperez.github.io/tailwindcolorshades/?gray=808080&scooter=0dcaf0&cardinal=dc3545&sea-green=198754&amber=ffc107

const theme = {
	color: {
		get text () {
			return this.gray[900]
		},
		get background () {
			return this.gray[50]
		},
		get primary () {
			return this.blue[500]
		},
		get secondary () {
			return this.gray[700]
		},
		get info () {
			return this.blue[500]
		},
		get success () {
			return this.green[500]
		},
		get warning () {
			return this.orange[500]
		},
		get danger () {
			return this.red[500]
		},
		get cta () {
			return this.orange[500]
		},
		get menu () {
			return this.gray[100]
		},
		get lightBorder () {
			return this.gray[300]
		},
		gray: {
			50: '#f9f9f9',
			100: '#f2f2f2',
			200: '#dfdfdf',
			300: '#cccccc',
			400: '#a6a6a6',
			500: '#808080',
			600: '#737373',
			700: '#606060',
			800: '#4d4d4d',
			900: '#3f3f3f'
		},
		blue: {
			50: '#f3fcfe',
			100: '#e7fafe',
			200: '#c3f2fb',
			300: '#9eeaf9',
			400: '#56daf5',
			500: '#0dcaf0',
			600: '#0cb6d8',
			700: '#0a98b4',
			800: '#087990',
			900: '#066376'
		},
		green: {
			50: '#f4f9f6',
			100: '#e8f3ee',
			200: '#c6e1d4',
			300: '#a3cfbb',
			400: '#5eab87',
			500: '#198754',
			600: '#177a4c',
			700: '#13653f',
			800: '#0f5132',
			900: '#0c4229'
		},
		orange: {
			50: '#fffcf3',
			100: '#fff9e6',
			200: '#fff0c1',
			300: '#ffe69c',
			400: '#ffd451',
			500: '#ffc107',
			600: '#e6ae06',
			700: '#bf9105',
			800: '#997404',
			900: '#7d5f03'
		},
		red: {
			50: '#fdf5f6',
			100: '#fcebec',
			200: '#f6cdd1',
			300: '#f1aeb5',
			400: '#e7727d',
			500: '#dc3545',
			600: '#c6303e',
			700: '#a52834',
			800: '#842029',
			900: '#6c1a22'
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
