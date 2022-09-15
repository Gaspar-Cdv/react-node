import { useState } from 'react'
import Popup from '../../common/popup/Popup'
import { defineI18n, useTranslate } from '../../utils/i18n'
import ForgotPassword from '../ForgotPassword/ForgotPassword'
import ChangePasswordForm from './ChangePasswordForm'
import SettingsForm, { SuccessMessage } from './SettingsForm'

const i18n = defineI18n({
	en: {
		changePassword: 'Change Password',
		forgotPassword: 'Forgot Password'
	},
	fr: {
		changePassword: 'Modifier le mot de passe',
		forgotPassword: 'Mot de passe oublié'
	}
})

function Settings () {
	const translate = useTranslate()
	const [isChangePasswordPopupOpen, setIsChangePasswordPopupOpen] = useState(false)
	const [isForgotPasswordPopupOpen, setIsForgotPasswordPopupOpen] = useState(false)
	const [successMessage, setSuccessMessage] = useState<SuccessMessage>(null)

	const handleChangePasswordClick = () => {
		setIsForgotPasswordPopupOpen(false)
		setIsChangePasswordPopupOpen(true)
	}

	const handleForgotPasswordClick = () => {
		setIsChangePasswordPopupOpen(false)
		setIsForgotPasswordPopupOpen(true)
	}

	const handleChangePasswordPopupClose = () => {
		setIsChangePasswordPopupOpen(false)
	}

	const handleForgotPasswordPopupClose = () => {
		setIsForgotPasswordPopupOpen(false)
	}

	const handleChangePasswordSuccess = () => {
		handleChangePasswordPopupClose()
		setSuccessMessage('password')
	}

	return (
		<>
			<Popup
				title={translate(i18n.changePassword)}
				show={isChangePasswordPopupOpen && !isForgotPasswordPopupOpen}
				onClose={handleChangePasswordPopupClose}
			>
				<ChangePasswordForm
					onSuccess={handleChangePasswordSuccess}
					onForgotPasswordClick={handleForgotPasswordClick}
				/>
			</Popup>

			<Popup
				title={translate(i18n.forgotPassword)}
				show={isForgotPasswordPopupOpen}
				onClose={handleForgotPasswordPopupClose}
			>
				<ForgotPassword
					onClose={handleForgotPasswordPopupClose}
					onCancel={handleChangePasswordClick}
				/>
			</Popup>

			<SettingsForm
				onSuccess={() => setSuccessMessage('settings')}
				successMessage={successMessage}
				onSuccessMessageClose={() => setSuccessMessage(null)}
				onChangePasswordClick={handleChangePasswordClick}
			/>
		</>
	)
}

export default Settings
