import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Alert from '../../common/Alert'
import ButtonLink from '../../common/button/ButtonLink'
import Flex from '../../common/Flex'
import * as tokenService from '../../remote/token'
import HttpError from '../../types/HttpError'
import { defineI18n, useTranslate } from '../../utils/i18n'
import ResetPasswordForm from './ResetPasswordForm'

const i18n = defineI18n({
	en: {
		success: 'Your password has successfully been changed.',
		login: 'Login',
		error: 'The link does not exist or is not longer valid'
	},
	fr: {
		success: 'Votre mot de passe a été modifié avec succès.',
		login: 'Se connecter',
		error: 'Le lien n\'existe pas ou n\'est plus valide'
	}
})

function ResetPassword () {
	const translate = useTranslate()
	const { token } = useParams()
	const [success, setSuccess] = useState(false)
	const [error, setError] = useState(false)

	useEffect(() => {
		const fn = async () => {
			try {
				await tokenService.findResetPasswordToken(token)
			} catch (e) {
				if (e instanceof HttpError) {
					setError(true)
				}
			}
		}

		fn()
	}, [token])

	if (success) {
		return (
			<Flex direction='column' gap='2rem' align='center'>
				<Alert severity='success'>
					{translate(i18n.success)}
				</Alert>

				<ButtonLink to='login'>
					{translate(i18n.login)}
				</ButtonLink>
			</Flex>
		)
	}

	if (error) {
		return (
			<Alert severity='danger'>
				{translate(i18n.error)}
			</Alert>
		)
	}

	return (
		<ResetPasswordForm onSuccess={() => setSuccess(true)} />
	)
}

export default ResetPassword
