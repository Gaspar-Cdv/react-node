import { createUseStyles } from 'react-jss'
import { defineI18n, useTranslate } from '../i18n'

const useStyles = createUseStyles({
	container: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 30,
		height: '100%',
		width: '100%',
	}
})

const i18n = defineI18n({
	en: {
		title: 'Error 404 : page not found',
		description: 'The page you are looking for does not exist.'
	},
	fr: {
		title: 'Erreur 404 : page non trouvée',
		description: 'La page que vous recherchez n\'existe pas.'
	}
})

function NotFound () {
	const classes = useStyles()
	const translate = useTranslate()

	return (
		<div className={classes.container}>
			<h1>{translate(i18n.title)}</h1>
			<span>{translate(i18n.description)}</span>
		</div>
	)
}

export default NotFound
