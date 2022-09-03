import { registerValidationSchema } from '@title/common/build/services/validation'
import { ErrorMessage } from '@title/common/build/types/ErrorMessage'
import { Form, Formik, FormikHelpers } from 'formik'
import { useState } from 'react'
import { createUseStyles } from 'react-jss'
import Alert from '../../common/Alert'
import Button from '../../common/button/Button'
import Input from '../../common/form/Input'
import authService from '../../services/auth'
import HttpError from '../../types/HttpError'
import { defineI18n, useTranslate } from '../../utils/i18n'
import { useErrorMessage } from '../../utils/useErrorMessage'

const i18n = defineI18n({
	en: {
		form: {
			username: 'Username',
			email: 'Email',
			password: 'Password',
			confirmPassword: 'Confirm Password',
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
			confirmPassword: 'Confirmation du mot de passe',
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

export interface RegisterFormValues {
	username: string
	email: string
	password: string
	passwordConfirmation: string
}

interface RegisterFormProps {
	onSuccess: () => void
}

function RegisterForm ({ onSuccess }: RegisterFormProps) {
	const classes = useStyles()
	const translate = useTranslate()
	const errorMessage = useErrorMessage()

	const [serverError, setServerError] = useState('')
	const [pending, setPending] = useState(false)

	const initialValues: RegisterFormValues = {
		username: '',
		email: '',
		password: '',
		passwordConfirmation: ''
	}

	const handleSubmit = async (values: RegisterFormValues, formikHelpers: FormikHelpers<RegisterFormValues>) => {
		try {
			setPending(true)
			await authService.register(values)
			formikHelpers.resetForm()
			setServerError('')
			onSuccess()
		} catch (e) {
			if (e instanceof HttpError) {
				setServerError(e.message)
			} else {
				setServerError(ErrorMessage.UNKNOWN_ERROR)
				console.error(e)
			}
		} finally {
			setPending(false)
		}
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={registerValidationSchema}
			onSubmit={handleSubmit}
			validateOnChange={false}
			validateOnBlur={false}
		>
			<Form onChange={() => setServerError('')}>
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

					<Alert show={serverError.length > 0}>
						{translate(i18n.error, { message: errorMessage(serverError) })}
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
