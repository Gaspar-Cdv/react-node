import { registerValidationSchema } from '@title/common/build/services/validation'
import { RegisterRequest } from '@title/common/build/types/requests/auth'
import { Form, Formik } from 'formik'
import { createUseStyles } from 'react-jss'
import Alert from '../../common/Alert'
import Button from '../../common/button/Button'
import Input from '../../common/form/Input'
import { useRegister } from '../../services/auth'
import { defineI18n, useTranslate } from '../../utils/i18n'
import { useErrorMessage } from '../../utils/useErrorMessage'

const i18n = defineI18n({
	en: {
		form: {
			username: 'Username',
			email: 'Email',
			password: 'Password',
			confirmPassword: 'Confirm Password'
		},
		buttons: {
			register: 'Register',
			reset: 'Reset'
		},
		error: 'Error: {message}'
	},
	fr: {
		form: {
			username: 'Nom d\'utilisateur',
			email: 'Adresse mail',
			password: 'Mot de passe',
			confirmPassword: 'Confirmation du mot de passe'
		},
		buttons: {
			register: 'S\'inscrire',
			reset: 'Réinitialiser'
		},
		error: 'Erreur : {message}'
	}
})

const useStyles = createUseStyles({
	container: {
		display: 'flex',
		flexDirection: 'column',
		gap: '1.25rem',
		maxWidth: 400,
		width: '100%',
		margin: '0 auto'
	},
	buttons: {
		display: 'flex',
		justifyContent: 'center',
		flexWrap: 'wrap-reverse',
		gap: '2rem',
	}
})

const initialValues: RegisterRequest = {
	username: '',
	email: '',
	password: '',
	passwordConfirmation: ''
}

interface RegisterFormProps {
	onSuccess?: () => void
}

function RegisterForm ({ onSuccess }: RegisterFormProps) {
	const classes = useStyles()
	const translate = useTranslate()
	const errorMessage = useErrorMessage()

	const { register, error, resetError, pending } = useRegister(onSuccess)

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={registerValidationSchema}
			onSubmit={register}
			validateOnChange={false}
			validateOnBlur={false}
		>
			<Form onChange={resetError}>
				<div className={classes.container}>
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

					<Alert show={error.length > 0}>
						{translate(i18n.error, { message: errorMessage(error) })}
					</Alert>

					<div className={classes.buttons}>
						<Button type='reset' variant='secondary'>
							{translate(i18n.buttons.reset)}
						</Button>

						<Button type='submit' disabled={pending}>
							{translate(i18n.buttons.register)}
						</Button>
					</div>
				</div>
			</Form>
		</Formik>
	)
}

export default RegisterForm
