import { useMemo, useState } from 'react'
import { BannerProps } from '../common/banner/Banner'
import tokenService from '../remote/token'
import { isEmailVerifiedSelector, isLoggedSelector } from '../store/session/selectors'
import { useAppSelector } from '../store/store'
import { defineI18n, useTranslate } from '../utils/i18n'

const i18n = defineI18n({
	en: {
		emailNotVerified: 'Please verify your email.',
		verificationMailSent: 'Verification mail has been sent. Don\'t forget to check your spam box.',
		resendMail: 'Resend Email'
	},
	fr: {
		emailNotVerified: 'Veuillez vérifier votre adresse email.',
		verificationMailSent: 'L\'email de vérification a bien été envoyé. N\'oubliez pas de vérifier vos spams.',
		resendMail: 'Renvoyer le mail'
	}
})

export const useBanner = (): BannerProps | undefined => {
	const translate = useTranslate()
	const isLogged = useAppSelector(isLoggedSelector)
	const isEmailVerified = useAppSelector(isEmailVerifiedSelector)
	const [verificationMailSent, setVerificationMailSent] = useState(false)

	const banners: BannerProps[] = useMemo(() => [
		{
			show: isLogged && !isEmailVerified && verificationMailSent,
			message: translate(i18n.verificationMailSent),
		},
		{
			show: isLogged && !isEmailVerified,
			message: translate(i18n.emailNotVerified),
			actionLabel: translate(i18n.resendMail),
			actionOnClick: async () => {
				await tokenService.resendVerificationMail()
				setVerificationMailSent(true)
			}
		}
	], [isEmailVerified, isLogged, translate, verificationMailSent])

	return banners.find(banner => banner.show)
}
