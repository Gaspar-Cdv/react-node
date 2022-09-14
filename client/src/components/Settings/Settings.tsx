import { useState } from 'react'
import Popup from '../../common/popup/Popup'
import { defineI18n, useTranslate } from '../../utils/i18n'
import ChangePasswordForm from './ChangePasswordForm'
import SettingsForm, { SuccessMessage } from './SettingsForm'

const i18n = defineI18n({
	en: {
		changePassword: 'Change Password'
	},
	fr: {
		changePassword: 'Modifier le mot de passe'
	}
})

function Settings () {
	const translate = useTranslate()
	const [isPasswordPopupOpen, setIsPasswordPopupOpen] = useState(false)
	const [successMessage, setSuccessMessage] = useState<SuccessMessage>(null)

	const closePasswordPopup = () => {
		setIsPasswordPopupOpen(false)
	}

	const handleChangePasswordSuccess = () => {
		closePasswordPopup()
		setSuccessMessage('password')
	}


	return (
		<>
			<Popup
				title={translate(i18n.changePassword)}
				show={isPasswordPopupOpen}
				onCancel={closePasswordPopup}
			>
				<ChangePasswordForm onSuccess={handleChangePasswordSuccess} />
			</Popup>

			<SettingsForm
				onSuccess={() => setSuccessMessage('settings')}
				successMessage={successMessage}
				onSuccessMessageClose={() => setSuccessMessage(null)}
				onChangePasswordClick={() => setIsPasswordPopupOpen(true)}
			/>
		</>
	)
}

export default Settings
