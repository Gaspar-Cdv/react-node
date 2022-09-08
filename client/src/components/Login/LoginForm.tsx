import { loginValidationSchema } from '@title/common/build/services/validation'
import { LoginRequest } from '@title/common/build/types/requests/auth'
import Alert from '../../common/Alert'
import Form from '../../common/form/Form'
import Input from '../../common/form/Input'
import { useRouter } from '../../common/routing/hooks'
import { useLoginForm } from '../../services/auth'
import { defineI18n, useTranslate } from '../../utils/i18n'

const i18n = defineI18n({
	en: {
		notConnected: 'You must be connected to access to this page.',
		form: {
			username: 'Username',
			password: 'Password'
		}
	},
	fr: {
		notConnected: 'Vous devez être connecté pour accéder à cette page.',
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
	const { currentRoute } = useRouter()

	return (
		<Form
			initialValues={initialValues}
			validationSchema={loginValidationSchema}
			{...loginForm}
		>
			<Alert
				show={currentRoute.name !== 'login'}
				severity='warning'
			>
				{translate(i18n.notConnected)}
			</Alert>

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
