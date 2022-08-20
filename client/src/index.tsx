import React from 'react'
import ReactDOM from 'react-dom/client'
import { I18nProvider } from './utils/i18n'
import { ThemeProvider } from 'react-jss'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './components/App'
import store from './store/store'
import theme from './theme'
import './index.css'

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
)
root.render(
	<Provider store={store}>
		<I18nProvider>
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</ThemeProvider>
		</I18nProvider>
	</Provider>
)
