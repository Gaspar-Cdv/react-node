import { createUseStyles } from 'react-jss'
import ButtonLink from '../common/button/ButtonLink'
import { defineI18n, useTranslate } from '../utils/i18n'

const useStyles = createUseStyles({
	container: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		textAlign: 'center',
		alignItems: 'center',
		gap: '2rem',
		height: '100%',
		width: '100%',
	}
})

const i18n = defineI18n({
	en: {
		title: 'Error 404 : page not found',
		description: 'The page you are looking for does not exist.',
		button: 'Go to home page'
	},
	fr: {
		title: 'Erreur 404 : page non trouvée',
		description: 'La page que vous recherchez n\'existe pas.',
		button: 'Retour à la page d\'accueil'
	}
})

function NotFound () {
	const classes = useStyles()
	const translate = useTranslate()

	return (
		<main className={classes.container}>
			<h1>{translate(i18n.title)}</h1>
			<span>{translate(i18n.description)}</span>
			<ButtonLink to='home'>{translate(i18n.button)}</ButtonLink>
		</main>
	)
}

export default NotFound
