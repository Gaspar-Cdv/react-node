import React, { useState } from 'react'
import Popup from '../../common/popup/Popup'
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
	const [forgotPasswordPopupVisible, setForgotPasswordPopupVisible] = useState(false)
	const closeForgotPasswordPopup = () => setForgotPasswordPopupVisible(false)

	return (
		<>
			<Popup
				title={translate(i18n.forgotPassword)}
				show={forgotPasswordPopupVisible}
				onCancel={closeForgotPasswordPopup}
			>
				<ForgotPassword onClose={closeForgotPasswordPopup} />
			</Popup>

			<LoginForm onForgotPasswordClick={() => setForgotPasswordPopupVisible(true)} />
		</>
	)
}

export default Login
