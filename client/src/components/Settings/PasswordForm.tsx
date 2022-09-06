import { changePasswordValidationSchema } from '@title/common/build/services/validation'
import { ChangePasswordRequest } from '@title/common/build/types/requests/user'
import Form from '../../common/form/Form'
import Input from '../../common/form/Input'
import { useChangePasswordForm } from '../../services/user'
import { defineI18n, useTranslate } from '../../utils/i18n'

const i18n = defineI18n({
	en: {
		form: {
			oldPassword: 'Old Password',
			newPassword: 'New Password',
			confirmPassword: 'Confirm Password'
		}
	},
	fr: {
		form: {
			oldPassword: 'Ancien mot de passe',
			newPassword: 'Nouveau mot de passe',
			confirmPassword: 'Confirmation du mot de passe'
		}
	}
})

interface PasswordFormProps {
	onClose: () => void
}

function PasswordForm ({ onClose }: PasswordFormProps) {
	const translate = useTranslate()

	const initialValues: ChangePasswordRequest = {
		oldPassword: '',
		password: '',
		passwordConfirmation: ''
	}

	const changePasswordForm = useChangePasswordForm(onClose)

	return (
		<Form
			initialValues={initialValues}
			validationSchema={changePasswordValidationSchema}
			{...changePasswordForm}
		>
			<Input
				label={translate(i18n.form.oldPassword)}
				name='oldPassword'
				type='password'
			/>

			<Input
				label={translate(i18n.form.newPassword)}
				name='password'
				type='password'
			/>

			<Input
				label={translate(i18n.form.confirmPassword)}
				name='passwordConfirmation'
				type='password'
			/>
		</Form>
	)
}

export default PasswordForm
