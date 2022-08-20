import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { useCurrentTitle } from '../common/routing/hooks'
import { defineI18n, useTranslate } from '../utils/i18n'
import { languageSelector } from '../store/language/selectors'

const i18n = defineI18n({
	en: {
		title: 'Title',
		description: 'Description'
	},
	fr: {
		title: 'Titre',
		description: 'Description'
	}
})

function Head () {
	const translate = useTranslate()
	const language = useSelector(languageSelector)
	const pageTitle = useCurrentTitle()

	const title = [
		translate(i18n.title),
		pageTitle
	].filter(Boolean).join(' - ')

	return (
		<Helmet htmlAttributes={{ lang: language }}>
			<meta charSet='UTF-8' />
			<title>{title}</title>
			<meta httpEquiv='X-UA-Compatible' content='IE=edge' />
			<meta name='language' content={language} />
			<meta name='description' content={translate(i18n.description)} />
			<meta name='viewport' content='width=device-width, initial-scale=1' />
		</Helmet>
	)
}

export default Head
