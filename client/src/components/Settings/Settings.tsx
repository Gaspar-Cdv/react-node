import { useState } from 'react'
import { useBoolean } from '../../utils/hooks'
import ChangePasswordPopup from './ChangePasswordPopup'
import SettingsForm, { SuccessMessage } from './SettingsForm'

function Settings () {
	const [isPopupOpen, openPopup, closePopup] = useBoolean(false)
	const [successMessage, setSuccessMessage] = useState<SuccessMessage>(null)

	const handleChangePasswordSuccess = () => {
		closePopup()
		setSuccessMessage('password')
	}

	return (
		<>
			<ChangePasswordPopup
				show={isPopupOpen}
				onSuccess={handleChangePasswordSuccess}
				onClose={closePopup}
			/>

			<SettingsForm
				onSuccess={() => setSuccessMessage('settings')}
				successMessage={successMessage}
				onSuccessMessageClose={() => setSuccessMessage(null)}
				onChangePasswordClick={openPopup}
			/>
		</>
	)
}

export default Settings
