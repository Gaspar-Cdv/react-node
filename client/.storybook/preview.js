import { ThemeProvider } from 'react-jss'
import { Provider } from 'react-redux'
import { I18nProvider } from '../src/utils/i18n'
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
		<Provider store={store}>
			<I18nProvider>
				<ThemeProvider theme={theme}>
					<Story />
				</ThemeProvider>
			</I18nProvider>
		</Provider>
	),
]
