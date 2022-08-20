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
		small: 10,
		medium: 25,
		large: 50,
		menuHeight: 50
	},
	zIndexes: {
		menu: 50,
		backdrop: 100,
		popup: 200,
		loader: 500
	},
	duration: {
		dropdownTransition: 200,
		backdropTransition: 200
	}
}

export type AppTheme = typeof theme

export default theme
