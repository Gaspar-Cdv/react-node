import { registerValidationSchema } from '@title/common/build/services/validation'
import { RegisterRequest } from '@title/common/build/types/requests/auth'
import Form from '../../common/form/Form'
import Input from '../../common/form/Input'
import { useRegisterForm } from '../../services/auth'
import { defineI18n, useTranslate } from '../../utils/i18n'

const i18n = defineI18n({
	en: {
		form: {
			username: 'Username',
			email: 'Email',
			password: 'Password',
			confirmPassword: 'Confirm Password'
		}
	},
	fr: {
		form: {
			username: 'Nom d\'utilisateur',
			email: 'Adresse mail',
			password: 'Mot de passe',
			confirmPassword: 'Confirmation du mot de passe'
		}
	}
})

const initialValues: Omit<RegisterRequest, 'language'> = {
	username: '',
	email: '',
	password: '',
	passwordConfirmation: ''
}

interface RegisterFormProps {
	onSuccess?: () => void
}

function RegisterForm ({ onSuccess }: RegisterFormProps) {
	const translate = useTranslate()
	const registerForm = useRegisterForm(onSuccess)

	return (
		<Form
			initialValues={initialValues}
			validationSchema={registerValidationSchema}
			{...registerForm}
		>
			<Input
				label={translate(i18n.form.username)}
				name='username'
			/>

			<Input
				label={translate(i18n.form.email)}
				name='email'
			/>

			<Input
				label={translate(i18n.form.password)}
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

export default RegisterForm
