import { resetPasswordValidationSchema } from '@title/common/build/services/validation'
import { ResetPasswordRequest } from '@title/common/build/types/requests/auth'
import { useParams } from 'react-router-dom'
import Form from '../../common/form/Form'
import Input from '../../common/form/Input'
import { useResetPasswordForm } from '../../services/token'
import { defineI18n, useTranslate } from '../../utils/i18n'

const i18n = defineI18n({
	en: {
		form: {
			newPassword: 'New Password',
			confirmPassword: 'Confirm Password'
		}
	},
	fr: {
		form: {
			newPassword: 'Nouveau mot de passe',
			confirmPassword: 'Confirmation du mot de passe'
		}
	}
})

interface ResetPasswordFormProps {
	onSuccess?: () => void
}

function ResetPasswordForm ({ onSuccess }: ResetPasswordFormProps) {
	const translate = useTranslate()
	const { token } = useParams()

	const initialValues: ResetPasswordRequest = {
		token: token || '',
		password: '',
		passwordConfirmation: ''
	}

	const resetPasswordForm = useResetPasswordForm(onSuccess)

	return (
		<Form
			initialValues={initialValues}
			validationSchema={resetPasswordValidationSchema}
			{...resetPasswordForm}
		>
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

export default ResetPasswordForm
