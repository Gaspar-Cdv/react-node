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
			flex: 1,
			display: 'flex',
			flexDirection: 'column',
			maxHeight: '100vh'
		},

		/* typography */

		'h1, h2, h3, h4, h5, h6': {
			fontFamily: '\'Montserrat\', sans-serif',
			fontWeight: 700
		},
		h1: {
			fontSize: '2.5rem'
		},
		h2: {
			fontSize: '2.2rem'
		},
		h3: {
			fontSize: '1.9rem'
		},
		h4: {
			fontSize: '1.6rem'
		},
		h5: {
			fontSize: '1.3rem'
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
