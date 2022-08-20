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
		menuHeight: 50
	},
	zIndex: {
		menu: 50,
		backdrop: 100,
		popup: 200,
		loader: 500
	},
	duration: {
		dropdownTransition: 200,
		backdropTransition: 200,
		menuTransition: 500,
	}
}

export type AppTheme = typeof theme

export default theme
