import { useEffect } from 'react'
import Popup from '../../common/popup/Popup'
import { useBoolean } from '../../utils/hooks'
import { defineI18n, useTranslate } from '../../utils/i18n'
import ForgotPassword from '../ForgotPassword/ForgotPassword'
import ChangePasswordForm from './ChangePasswordForm'

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

interface ChangePasswordPopupProps {
	show: boolean
	onSuccess: () => void
	onClose: () => void
}

function ChangePasswordPopup ({ show, onSuccess, onClose }: ChangePasswordPopupProps) {
	const translate = useTranslate()
	const [hasForgotPassword, openForgotPassword, closeForgotPassword] = useBoolean(false)

	useEffect(() => {
		if (show) {
			closeForgotPassword()
		}
	}, [closeForgotPassword, show])

	return (
		<Popup
			title={translate(hasForgotPassword ? i18n.forgotPassword : i18n.changePassword)}
			show={show}
			onClose={onClose}
		>
			{hasForgotPassword
				? (
					<ForgotPassword
						onClose={onClose}
						onCancel={closeForgotPassword}
					/>
				) : (
					<ChangePasswordForm
						onSuccess={onSuccess}
						onForgotPasswordClick={openForgotPassword}
					/>
				)}
		</Popup>
	)
}

export default ChangePasswordPopup
