import { loginValidationSchema } from '@title/common/build/services/validation'
import { ErrorMessage } from '@title/common/build/types/ErrorMessage'
import { LoginRequest } from '@title/common/build/types/requests/auth'
import { Form, Formik } from 'formik'
import { useState } from 'react'
import { createUseStyles } from 'react-jss'
import Alert from '../../common/Alert'
import Button from '../../common/button/Button'
import Input from '../../common/form/Input'
import { useRouter } from '../../common/routing/hooks'
import authService from '../../services/auth'
import HttpError from '../../types/HttpError'
import { useLocalStorage } from '../../utils/hooks'
import { defineI18n, useTranslate } from '../../utils/i18n'
import { useErrorMessage } from '../../utils/useErrorMessage'

const i18n = defineI18n({
	en: {
		form: {
			username: 'Username',
			password: 'Password'
		},
		buttons: {
			login: 'Login',
			reset: 'Reset'
		},
		error: 'Error: {message}'
	},
	fr: {
		form: {
			username: 'Nom d\'utilisateur',
			password: 'Mot de passe'
		},
		buttons: {
			login: 'Se connecter',
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

const initialValues: LoginRequest = {
	username: '',
	password: ''
}

function LoginForm () {
	const classes = useStyles()
	const translate = useTranslate()
	const errorMessage = useErrorMessage()
	const [, setToken] = useLocalStorage('token')
	const { navigate } = useRouter()

	const [serverError, setServerError] = useState('')
	const [pending, setPending] = useState(false)

	const handleSubmit = async (values: LoginRequest) => {
		try {
			setPending(true)
			const { token } = await authService.login(values)
			setToken(token)
			navigate('home')
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
			onSubmit={handleSubmit}
			validationSchema={loginValidationSchema}
			validateOnChange={false}
			validateOnBlur={false}
		>
			<Form onChange={() => setServerError('')}>
				<div className={classes.container}>
					<Input
						name='username'
						label={translate(i18n.form.username)}
					/>

					<Input
						name='password'
						type='password'
						label={translate(i18n.form.password)}
					/>

					<Alert show={serverError.length > 0}>
						{translate(i18n.error, { message: errorMessage(serverError) })}
					</Alert>

					<div className={classes.buttons}>
						<Button type='reset' variant='secondary'>
							{translate(i18n.buttons.reset)}
						</Button>

						<Button type='submit' disabled={pending}>
							{translate(i18n.buttons.login)}
						</Button>
					</div>
				</div>
			</Form>
		</Formik>
	)
}

export default LoginForm
