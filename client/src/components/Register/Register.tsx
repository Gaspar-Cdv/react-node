import { useState } from 'react'
import { createUseStyles } from 'react-jss'
import Alert from '../../common/Alert'
import ButtonLink from '../../common/button/ButtonLink'
import { defineI18n, useTranslate } from '../../utils/i18n'
import RegisterForm from './RegisterForm'

const useStyles = createUseStyles({
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		gap: '2rem'
	},
	buttons: {
		display: 'flex',
		justifyContent: 'center',
		flexWrap: 'wrap-reverse',
		gap: '2rem',
	}
})

const i18n = defineI18n({
	en: {
		registred: 'You have been successfully registred.',
		login: 'Login',
		back: 'Back'
	},
	fr: {
		registred: 'Vous avez été inscrit avec succès.',
		login: 'Se connecter',
		back: 'Retour'
	}
})

function Register () {
	const classes = useStyles()
	const translate = useTranslate()

	const [registred, setRegistred] = useState(false)

	const handleRegistration = () => {
		setRegistred(true)
	}

	if (!registred) {
		return <RegisterForm onSuccess={handleRegistration} />
	}

	return (
		<div className={classes.container}>
			<Alert severity='success'>
				{translate(i18n.registred)}
			</Alert>

			<div className={classes.buttons}>
				<ButtonLink to='home' variant='secondary'>{translate(i18n.back)}</ButtonLink>
				<ButtonLink to='login'>{translate(i18n.login)}</ButtonLink>
			</div>
		</div>
	)
}

export default Register
