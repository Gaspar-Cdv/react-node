import { createUseStyles } from 'react-jss'
import './fonts.css'

export const useCss = createUseStyles(theme => ({
	'@global': {
		/* init */

		'*': {
			margin: 0,
			padding: 0,
			boxSizing: 'border-box'
		},

		html: {
			fontFamily: '\'Open Sans\', sans-serif',
			fontSize: '16px'
		},

		body: {
			display: 'flex',
			minHeight: '100vh',
			color: theme.color.text,
			backgroundColor: theme.color.background
		},

		'#root': {
			flex: 1
		},

		/* typography */

		'h1, h2, h3, h4, h5, h6': {
			fontFamily: '\'Montserrat\', sans-serif',
			fontWeight: 700
		},
		h1: {
			fontSize: '3.5rem'
		},
		h2: {
			fontSize: '3rem'
		},
		h3: {
			fontSize: '2.5rem'
		},
		h4: {
			fontSize: '2rem'
		},
		h5: {
			fontSize: '1.5rem'
		},
		h6: {
			fontSize: '1rem'
		},
		a: {
			color: theme.color.cta,
			textDecoration: 'none',
			'&:hover': {
				textDecoration: 'underline'
			}
		},

		/* layout */

		'ul, ol': {
			listStylePosition: 'inside',
			marginLeft: '1rem'
		},
		table: {
			borderCollapse: 'collapse'
		},
		'td, th': {
			border: [1, 'solid', theme.color.lightBorder],
			padding: '0.5rem',
			textAlign: 'center'
		},

		/* form */

		'input:not([type="file"], [type="button"], [type="submit"], [type="reset"]), textarea': {
			border: [1, 'solid', theme.color.lightBorder],
			borderRadius: '0.25rem',
			padding: '0.5rem',
			fontSize: '1rem'
		},

		/* misc */

		'.__react_component_tooltip': { /* Hack for progressive fade out in react-tooltip */
			transition: 'opacity 0.1s ease-in-out, visibility 0.1s ease-out !important',
			opacity: '0 !important',
			visibility: 'visible'
		},

		'.__react_component_tooltip.show': {
			visibility: 'visible',
			opacity: '1 !important'
		}
	}
}))
