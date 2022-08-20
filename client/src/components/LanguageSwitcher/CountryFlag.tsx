import classNames from 'classnames'
import { useMemo } from 'react'
import { createUseStyles } from 'react-jss'
import { ReactComponent as FrenchFlag } from '../../images/flags/fr.svg'
import { ReactComponent as EnglishFlag } from '../../images/flags/us.svg'
import { Language } from '../../types/Language'

const useStyles = createUseStyles(theme => ({
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: 30
	},
	flag: {
		borderRadius: 5,
		boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.4)',
		width: 40
	}
}))

interface CountryFlagProps {
	language: Language
	className?: string
}

function CountryFlag ({ language, className }: CountryFlagProps) {
	const classes = useStyles()

	const flags = useMemo(() => ({
		[Language.en]: EnglishFlag,
		[Language.fr]: FrenchFlag
	}), [])

	const Icon = flags[language]

	return (
		<div className={classes.container}>
			<Icon className={classNames(classes.flag, className)} />
		</div>
	)
}

export default CountryFlag
