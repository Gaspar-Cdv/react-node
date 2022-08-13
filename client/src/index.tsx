import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from 'react-jss'
import { Provider } from 'react-redux'
import App from './App'
import store from './store/store'
import theme from './theme'

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
)
root.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<Provider store={store}>
				<App />
			</Provider>
		</ThemeProvider>
	</React.StrictMode>
)
