import { useState } from 'react'
import Button from '../../common/button/Button'
import Flex from '../../common/Flex'
import { defineI18n, useTranslate } from '../../utils/i18n'
import ForgotPasswordForm from './ForgotPasswordForm'

const i18n = defineI18n({
	en: {
		description: 'If you have forgotten your password, enter your email and check your mailbox to reset it.',
		emailSent: 'The email has successfully been sent. Don\'t forget to check your spam box.',
		close: 'Close'
	},
	fr: {
		description: 'Si vous avez oublié votre mot de passe, entrez votre adresse mail et un email vous sera envoyé afin de le réinitialiser.',
		emailSent: 'L\'email a été envoyé avec succès. N\'oubliez pas de vérifier vos spams.',
		close: 'Fermer'
	}
})

interface ForgotPasswordProps {
	onClose?: () => void
	onCancel?: () => void
}

function ForgotPassword ({ onClose, onCancel }: ForgotPasswordProps) {
	const translate = useTranslate()
	const [emailSent, setEmailSent] = useState(false)

	if (emailSent) {
		return (
			<Flex direction='column' align='center' gap='1rem'>
				<span>{translate(i18n.emailSent)}</span>
				<Button onClick={onClose}>{translate(i18n.close)}</Button>
			</Flex>
		)
	}

	return (
		<Flex direction='column' gap='1rem'>
			<span>{translate(i18n.description)}</span>

			<ForgotPasswordForm
				onSuccess={() => setEmailSent(true)}
				onCancel={onCancel}
			/>
		</Flex>
	)
}

export default ForgotPassword
