import { createUseStyles } from 'react-jss'
import { ReactComponent as InfoIcon } from '../../images/icons/info.svg'
import { ReactComponent as QuestionIcon } from '../../images/icons/question.svg'
import { ReactComponent as WarningIcon } from '../../images/icons/warning.svg'
import theme from '../../theme/theme'
import { generateId } from '../../utils/stringUtils'
import Tooltip from './Tooltip'

interface JssProps {
	color: string
}

const useStyles = createUseStyles({
	container: ({ color }: JssProps) => ({
		cursor: 'pointer',
		color,
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center'
	})
})

const iconsList = {
	info: {
		Icon: InfoIcon,
		color: theme.color.info
	},
	question: {
		Icon: QuestionIcon,
		color: theme.color.warning
	},
	warning: {
		Icon: WarningIcon,
		color: theme.color.danger
	}
}

export interface IconTooltipProps {
	type: 'info' | 'question' | 'warning'
	children: React.ReactNode | React.ReactNode[]
}

function IconTooltip ({ type = 'info', children }: IconTooltipProps) {
	const id = generateId(`tooltip-${type}`)
	const { Icon, color } = iconsList[type]
	const classes = useStyles({ color })

	return (
		<div className={classes.container}>
			<Icon data-tip data-for={id} height={24} />
			<Tooltip id={id}>
				{children}
			</Tooltip>
		</div>
	)
}

export default IconTooltip
