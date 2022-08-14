import { ComponentStory, ComponentMeta } from '@storybook/react'
import { createUseStyles } from 'react-jss'
import Tooltip, { TooltipProps } from '../common/Tooltip'

const useStyles = createUseStyles({
	verticalContainer: {
		height: 'calc(100vh - 32px)',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between'
	},
	horizontalContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		'& div:only-child': {
			margin: [0, 'auto'],
		},
		'& [data-tip]': {
			fontWeight: 'bold',
			fontSize: '1.5rem',
			cursor: 'pointer'
		}
	}
})

export default {
	title: 'Common/Tooltip',
	component: TooltipWrapper,
	args: {
		tooltipContent: 'This is a tooltip',
	}
} as ComponentMeta<typeof TooltipWrapper>

interface TooltipWrapperProps extends TooltipProps {
	tooltipContent: string
}

function TooltipWrapper ({ tooltipContent }: TooltipWrapperProps) {
	const classes = useStyles()

	return (
		<div className={classes.verticalContainer}>
			<div className={classes.horizontalContainer}>
				<div>
					<span data-tip data-for='topLeft'>Hover me !</span>
					<Tooltip id='topLeft'>{tooltipContent}</Tooltip>
				</div>

				<div>
					<span data-tip data-for='topRight'>Hover me !</span>
					<Tooltip id='topRight'>{tooltipContent}</Tooltip>
				</div>
			</div>

			<div className={classes.horizontalContainer}>
				<div>
					<span data-tip data-for='center'>Hover me !</span>
					<Tooltip id='center'>{tooltipContent}</Tooltip>
				</div>
			</div>

			<div className={classes.horizontalContainer}>
				<div>
					<span data-tip data-for='bottomLeft'>Hover me !</span>
					<Tooltip id='bottomLeft'>{tooltipContent}</Tooltip>
				</div>

				<div>
					<span data-tip data-for='bottomRight'>Hover me !</span>
					<Tooltip id='bottomRight'>{tooltipContent}</Tooltip>
				</div>
			</div>
		</div>
	)
}

const Template: ComponentStory<typeof TooltipWrapper> = TooltipWrapper

export const TooltipStory = Template.bind({})
TooltipStory.storyName = 'Tooltip'
