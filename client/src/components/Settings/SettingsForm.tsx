import { updateUserValidationSchema } from '@title/common/build/services/validation'
import { UpdateUserRequest } from '@title/common/build/types/requests/user'
import { useMemo, useState } from 'react'
import Alert from '../../common/Alert'
import A from '../../common/button/A'
import Form from '../../common/form/Form'
import Input from '../../common/form/Input'
import Popup from '../../common/popup/Popup'
import { useUpdateUserForm } from '../../services/user'
import { userSelector } from '../../store/session/selectors'
import { useAppSelector } from '../../store/store'
import { defineI18n, useTranslate } from '../../utils/i18n'
import PasswordForm from './PasswordForm'

const i18n = defineI18n({
	en: {
		changePassword: 'Change Password',
		form: {
			username: 'Username',
			email: 'Email'
		},
		success: {
			settings: 'Your settings have been successfully changed.',
			password: 'Your password has been successfully changed.'
		}
	},
	fr: {
		changePassword: 'Modifier le mot de passe',
		form: {
			username: 'Nom d\'utilisateur',
			email: 'Adresse mail'
		},
		success: {
			settings: 'Vos paramètres ont été modifiés avec succès.',
			password: 'Votre mot de passe a été modifié avec succès.'
		}
	}
})

function SettingsForm () {
	const translate = useTranslate()
	const user = useAppSelector(userSelector)
	const [isPasswordPopupOpen, setIsPasswordPopupOpen] = useState(false)
	const [successMessage, setSuccessMessage] = useState<'settings' | 'password' | null>(null)

	const initialValues: UpdateUserRequest = useMemo(() => ({
		username: user?.username || '',
		email: user?.email || ''
	}), [user])

	const updateUserForm = useUpdateUserForm(() => {
		setSuccessMessage('settings')
	})

	const closePasswordPopup = () => {
		setIsPasswordPopupOpen(false)
	}

	const handleChangePassword = () => {
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
				<PasswordForm onSuccess={handleChangePassword} />
			</Popup>

			<Form
				initialValues={initialValues}
				validationSchema={updateUserValidationSchema}
				{...updateUserForm}
			>
				<Alert
					severity='success'
					show={successMessage != null}
					onClose={() => setSuccessMessage(null)}
				>
					{translate(successMessage === 'settings'
						? i18n.success.settings
						: i18n.success.password)}
				</Alert>

				<Input
					label={translate(i18n.form.username)}
					name='username'
				/>

				<Input
					label={translate(i18n.form.email)}
					name='email'
				/>

				<div>
					<A onClick={() => setIsPasswordPopupOpen(true)}>{translate(i18n.changePassword)}</A>
				</div>
			</Form>
		</>
	)
}

export default SettingsForm
