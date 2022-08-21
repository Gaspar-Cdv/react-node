import { ThemeProvider } from 'react-jss'
import { Provider } from 'react-redux'
import { I18nProvider } from '../src/utils/i18n'
import { useCss } from '../src/theme/useCss'
import theme from '../src/theme/theme'
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
	(Story) => {
		useCss()

		return <Story />
	},
	(Story) => (
		<Provider store={store}>
			<I18nProvider>
				<ThemeProvider theme={theme}>
					<Story />
				</ThemeProvider>
			</I18nProvider>
		</Provider>
	)
]
