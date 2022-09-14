import { forgotPasswordValidationSchema } from '@title/common/build/services/validation'
import { ForgotPasswordRequest } from '@title/common/build/types/requests/auth'
import Form from '../../common/form/Form'
import Input from '../../common/form/Input'
import { useForgotPasswordForm } from '../../services/token'

interface ForgotPasswordFormProps {
	onSuccess: () => void
}

function ForgotPasswordForm ({ onSuccess }: ForgotPasswordFormProps) {
	const forgotPasswordForm = useForgotPasswordForm(onSuccess)

	const initialValues: ForgotPasswordRequest = {
		email: ''
	}

	return (
		<Form
			{...forgotPasswordForm}
			initialValues={initialValues}
			validationSchema={forgotPasswordValidationSchema}
		>
			<Input
				name='email'
				label='Email'
			/>
		</Form>
	)
}

export default ForgotPasswordForm
