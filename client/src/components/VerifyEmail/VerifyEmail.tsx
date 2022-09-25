import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Alert from '../../common/Alert'
import ButtonLink from '../../common/button/ButtonLink'
import Flex from '../../common/Flex'
import Loader from '../../common/Loader'
import tokenService from '../../remote/token'
import HttpError from '../../types/HttpError'
import { defineI18n, useTranslate } from '../../utils/i18n'

const i18n = defineI18n({
	en: {
		success: 'Your email has successfully been verified.',
		home: 'Home',
		error: 'The link does not exist or is not longer valid'
	},
	fr: {
		success: 'Votre email a été vérifié avec succès.',
		home: 'Accueil',
		error: 'Le lien n\'existe pas ou n\'est plus valide'
	}
})

function VerifyEmail () {
	const translate = useTranslate()
	const { token } = useParams()
	const [pending, setPending] = useState(true)
	const [error, setError] = useState(false)

	useEffect(() => {
		const fn = async () => {
			try {
				await tokenService.verifyEmail(token)
			} catch (e) {
				if (e instanceof HttpError) {
					setError(true)
				}
			} finally {
				setPending(false)
			}
		}

		fn()
	}, [token])

	if (pending) {
		return <Loader show />
	}

	if (error) {
		return (
			<Alert severity='danger'>
				{translate(i18n.error)}
			</Alert>
		)
	}

	return (
		<Flex direction='column' gap='2rem' align='center'>
			<Alert severity='success'>
				{translate(i18n.success)}
			</Alert>

			<ButtonLink to='home'>
				{translate(i18n.home)}
			</ButtonLink>
		</Flex>
	)
}

export default VerifyEmail
