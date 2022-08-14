import { ThemeProvider } from 'react-jss'
import { Provider } from 'react-redux'
import theme from '../src/theme'
import store from '../src/store/store'

export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
}

export const decorators = [
	(Story) => (
		<ThemeProvider theme={theme}>
			<Provider store={store}>
				<Story />
			</Provider>
		</ThemeProvider>
	),
]
