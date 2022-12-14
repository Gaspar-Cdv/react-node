import { Language } from '@title/common/build/types/Language'
import { useMemo, useState } from 'react'
import { DropdownItem } from '../../common/dropdown/Dropdown'
import { createUseStyles } from 'react-jss'
import { defineI18n, useTranslate } from '../../utils/i18n'
import DropdownToggle from '../../common/dropdown/DropdownToggle'
import CountryFlag from './CountryFlag'
import classNames from 'classnames'
import { useAppTheme } from '../../theme/theme'
import { useLanguage } from '../../store/session/hooks'

const i18n = defineI18n({
	en: {
		'fr': 'French',
		'en': 'English'
	},
	fr: {
		'fr': 'Français',
		'en': 'Anglais'
	}
})

const useStyles = createUseStyles(theme => ({
	option: {
		display: 'flex',
		alignItems: 'center',
		gap: '1rem'
	},
	flag: {
		transition: `opacity ${theme.duration.crossFadeTransition}ms ease-in-out`,
		opacity: 1
	},
	transparent: {
		opacity: 0
	}
}))

interface LanguageSwitcherProps {
	align?: 'left' | 'right'
	onLanguageChange?: () => void
}

function LanguageSwitcher ({ align = 'left', onLanguageChange }: LanguageSwitcherProps) {
	const classes = useStyles()
	const translate = useTranslate()
	const theme = useAppTheme()

	const [currentLanguage, setCurrentLanguage] = useLanguage()
	const [isOpen, setIsOpen] = useState(false)
	const [isFlagVisible, setIsFlagVisible] = useState(true)

	const languages = useMemo(() => [
		Language.en,
		Language.fr
	], [])

	const items: DropdownItem[] = useMemo(() => {
		return languages.map(language => ({
			key: language,
			label: (
				<div className={classes.option}>
					<CountryFlag language={language} />
					{translate(i18n[language])}
				</div>
			),
			onClick: () => {
				if (language === currentLanguage) {
					return
				}

				setIsFlagVisible(false)
				onLanguageChange?.()

				setTimeout(() => {
					setCurrentLanguage(language)
					setIsFlagVisible(true)
				}, theme.duration.crossFadeTransition)
			}
		}))
	}, [
		classes.option,
		currentLanguage,
		languages,
		onLanguageChange,
		setCurrentLanguage,
		theme.duration.crossFadeTransition,
		translate
	])

	const handleClick = () => {
		setIsOpen(isOpen => !isOpen)
	}

	const handleClose = () => {
		setIsOpen(false)
	}

	return (
		<DropdownToggle
			items={items}
			show={isOpen}
			onClick={handleClick}
			onClose={handleClose}
			align={align}
		>
			<CountryFlag
				language={currentLanguage}
				className={classNames(classes.flag, { [classes.transparent]: !isFlagVisible })}
			/>
		</DropdownToggle>
	)
}

export default LanguageSwitcher
