const theme = {
	color: {
		text: '#000000',
		background: '#ffffff',
		primary: '#0d6efd',
		secondary: '#6c757d',
		info: '#0dcaf0',
		success: '#198754',
		warning: '#ffc107',
		danger: '#dc3545',
		cta: '#ffc107',
		disabled: '#aaaaaa'
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
		drawerTransition: 500,
	}
}

export type AppTheme = typeof theme

export default theme
