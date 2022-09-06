import { updateUserValidationSchema } from '@title/common/build/services/validation'
import { UpdateUserRequest } from '@title/common/build/types/requests/user'
import { useMemo, useState } from 'react'
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
		}
	},
	fr: {
		changePassword: 'Modifier le mot de passe',
		form: {
			username: 'Nom d\'utilisateur',
			email: 'Adresse mail'
		}
	}
})

function SettingsForm () {
	const translate = useTranslate()
	const user = useAppSelector(userSelector)
	const [isPasswordPopupOpen, setIsPasswordPopupOpen] = useState(false)

	const initialValues: UpdateUserRequest = useMemo(() => ({
		username: user?.username || '',
		email: user?.email || ''
	}), [user])

	const updateUserForm = useUpdateUserForm()

	const closePasswordPopup = () => {
		setIsPasswordPopupOpen(false)
	}

	return (
		<>
			<Popup
				title={translate(i18n.changePassword)}
				show={isPasswordPopupOpen}
				onCancel={closePasswordPopup}
			>
				<PasswordForm onClose={closePasswordPopup} />
			</Popup>

			<Form
				initialValues={initialValues}
				validationSchema={updateUserValidationSchema}
				{...updateUserForm}
			>
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
