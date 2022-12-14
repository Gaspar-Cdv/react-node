import classNames from 'classnames'
import { createUseStyles } from 'react-jss'
import { ReactComponent as FrenchFlag } from '../../images/flags/fr.svg'
import { ReactComponent as EnglishFlag } from '../../images/flags/us.svg'
import { Language } from '@title/common/build/types/Language'

const useStyles = createUseStyles(theme => ({
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '2rem'
	},
	flag: {
		borderRadius: theme.borderRadius.sm,
		boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.4)',
		width: '2.5rem'
	}
}))

interface CountryFlagProps {
	language: Language
	className?: string
}

function CountryFlag ({ language, className }: CountryFlagProps) {
	const classes = useStyles()

	const flags = {
		[Language.en]: EnglishFlag,
		[Language.fr]: FrenchFlag
	}

	const Icon = flags[language]

	return (
		<div className={classes.container}>
			<Icon className={classNames(classes.flag, className)} />
		</div>
	)
}

export default CountryFlag
