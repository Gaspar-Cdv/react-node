import { loginValidationSchema } from '@title/common/build/services/validation'
import { LoginRequest } from '@title/common/build/types/requests/auth'
import Form from '../../common/form/Form'
import Input from '../../common/form/Input'
import { useLoginForm } from '../../services/auth'
import { defineI18n, useTranslate } from '../../utils/i18n'

const i18n = defineI18n({
	en: {
		form: {
			username: 'Username',
			password: 'Password'
		}
	},
	fr: {
		form: {
			username: 'Nom d\'utilisateur',
			password: 'Mot de passe'
		}
	}
})

const initialValues: LoginRequest = {
	username: '',
	password: ''
}

function LoginForm () {
	const translate = useTranslate()
	const loginForm = useLoginForm()

	return (
		<Form
			initialValues={initialValues}
			validationSchema={loginValidationSchema}
			{...loginForm}
		>
			<Input
				name='username'
				label={translate(i18n.form.username)}
			/>

			<Input
				name='password'
				type='password'
				label={translate(i18n.form.password)}
			/>
		</Form>
	)
}

export default LoginForm
