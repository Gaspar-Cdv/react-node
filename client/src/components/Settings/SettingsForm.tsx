import { updateUserValidationSchema } from '@title/common/build/services/validation'
import { UpdateUserRequest } from '@title/common/build/types/requests/user'
import { useMemo } from 'react'
import Alert from '../../common/Alert'
import A from '../../common/button/A'
import Form from '../../common/form/Form'
import Input from '../../common/form/Input'
import { useUpdateUserForm } from '../../services/user'
import { userSelector } from '../../store/session/selectors'
import { useAppSelector } from '../../store/store'
import { defineI18n, useTranslate } from '../../utils/i18n'

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

export type SuccessMessage = 'settings' | 'password' | null

interface SettingsFormProps {
	onSuccess: () => void
	successMessage: SuccessMessage
	onSuccessMessageClose: () => void
	onChangePasswordClick: () => void
}

function SettingsForm ({ onSuccess, successMessage, onSuccessMessageClose, onChangePasswordClick }: SettingsFormProps) {
	const translate = useTranslate()
	const user = useAppSelector(userSelector)

	const initialValues: UpdateUserRequest = useMemo(() => ({
		username: user?.username || '',
		email: user?.email || ''
	}), [user])

	const updateUserForm = useUpdateUserForm(onSuccess)

	return (
		<Form
			initialValues={initialValues}
			validationSchema={updateUserValidationSchema}
			{...updateUserForm}
		>
			<Alert
				severity='success'
				show={successMessage != null}
				onClose={onSuccessMessageClose}
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
				<A onClick={onChangePasswordClick}>{translate(i18n.changePassword)}</A>
			</div>
		</Form>
	)
}

export default SettingsForm
