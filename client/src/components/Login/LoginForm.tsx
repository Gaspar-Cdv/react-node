import { loginValidationSchema } from '@title/common/build/services/validation'
import { LoginRequest } from '@title/common/build/types/requests/auth'
import { useState } from 'react'
import Alert from '../../common/Alert'
import A from '../../common/button/A'
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
			password: 'Password',
			forgotPassword: 'Forgot Password'
		}
	},
	fr: {
		notConnected: 'Vous devez être connecté pour accéder à cette page.',
		form: {
			username: 'Nom d\'utilisateur',
			password: 'Mot de passe',
			forgotPassword: 'Mot de passe oublié'
		}
	}
})

const initialValues: LoginRequest = {
	username: '',
	password: ''
}

interface LoginFormProps {
	onForgotPasswordClick: () => void
}

function LoginForm ({ onForgotPasswordClick }: LoginFormProps) {
	const translate = useTranslate()
	const loginForm = useLoginForm()
	const { currentRoute } = useRouter()
	const [warningVisible, setWarningVisible] = useState(currentRoute.name !== 'login')

	return (
		<Form
			initialValues={initialValues}
			validationSchema={loginValidationSchema}
			{...loginForm}
		>
			<Alert
				show={warningVisible}
				severity='warning'
				onClose={() => setWarningVisible(false)}
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

			<div>
				<A onClick={onForgotPasswordClick}>
					{translate(i18n.form.forgotPassword)}
				</A>
			</div>
		</Form>
	)
}

export default LoginForm
