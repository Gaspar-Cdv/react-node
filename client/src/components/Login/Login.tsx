import React from 'react'
import Popup from '../../common/popup/Popup'
import { useBoolean } from '../../utils/hooks'
import { defineI18n, useTranslate } from '../../utils/i18n'
import ForgotPassword from '../ForgotPassword/ForgotPassword'
import LoginForm from './LoginForm'

const i18n = defineI18n({
	en: {
		forgotPassword: 'Reset password'
	},
	fr: {
		forgotPassword: 'Réinitialiser le mot de passe'
	}
})

function Login () {
	const translate = useTranslate()
	const [isPopupVisible, openPopup, closePopup] = useBoolean(false)

	return (
		<>
			<Popup
				title={translate(i18n.forgotPassword)}
				show={isPopupVisible}
				onClose={closePopup}
			>
				<ForgotPassword onClose={closePopup} />
			</Popup>

			<LoginForm onForgotPasswordClick={openPopup} />
		</>
	)
}

export default Login
