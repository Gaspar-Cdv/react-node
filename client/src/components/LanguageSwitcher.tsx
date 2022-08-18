import { useSelector } from 'react-redux'
import { useSetLanguage } from '../store/language/actions'
import { languageSelector } from '../store/language/selectors'
import { Language } from '../types/Language'
import { useMemo, useState } from 'react'
import { DropdownItem } from '../common/dropdown/Dropdown'
import { createUseStyles } from 'react-jss'
import { defineI18n, useTranslate } from '../i18n'
import DropdownToggle from '../common/dropdown/DropdownToggle'
import CountryFlag from './CountryFlag'
import classNames from 'classnames'

const transitionDuration = 100

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
		gap: 15,
		padding: [5, 0]
	},
	flag: {
		transition: `opacity ${transitionDuration}ms ease-in-out`,
		opacity: 1
	},
	transparent: {
		opacity: 0
	}
}))

interface LanguageSwitcherProps {
	align?: 'left' | 'right'
}

function LanguageSwitcher ({ align = 'left' }: LanguageSwitcherProps) {
	const classes = useStyles()
	const translate = useTranslate()
	const [isOpen, setIsOpen] = useState(false)
	const currentLanguage = useSelector(languageSelector)
	const setLanguage = useSetLanguage()
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
				setTimeout(() => {
					setLanguage(language)
					setIsFlagVisible(true)
				}, transitionDuration)
			}
		}))
	}, [classes.option, currentLanguage, languages, setLanguage, translate])

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
			<CountryFlag language={currentLanguage} className={classNames(classes.flag, { [classes.transparent]: !isFlagVisible })} />
		</DropdownToggle>
	)
}

export default LanguageSwitcher
