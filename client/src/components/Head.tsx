import { Helmet } from 'react-helmet'
import { useRouter } from '../common/routing/hooks'
import { defineI18n, useTranslate } from '../utils/i18n'
import { useCurrentLanguage } from '../store/language/hooks'

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
	const { currentLanguage } = useCurrentLanguage()
	const { currentTitle } = useRouter()

	const title = [
		translate(i18n.title),
		currentTitle
	].filter(Boolean).join(' - ')

	return (
		<Helmet htmlAttributes={{ lang: currentLanguage }}>
			<meta charSet='UTF-8' />
			<title>{title}</title>
			<meta httpEquiv='X-UA-Compatible' content='IE=edge' />
			<meta name='language' content={currentLanguage} />
			<meta name='description' content={translate(i18n.description)} />
			<meta name='viewport' content='width=device-width, initial-scale=1' />
		</Helmet>
	)
}

export default Head
