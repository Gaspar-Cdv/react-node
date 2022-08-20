import { ComponentStory, ComponentMeta } from '@storybook/react'
import IconTooltip, { IconTooltipProps } from '../common/tooltip/IconTooltip'

export default {
	title: 'Common/Tooltip/IconTooltip',
	component: IconTooltipWrapper,
	args: {
		text: 'This is a tooltip'
	},
	argTypes: {
		type: { control: false }
	}
} as ComponentMeta<typeof IconTooltipWrapper>

interface IconTooltipWrapperProps extends IconTooltipProps {
	text: string
}

function IconTooltipWrapper ({ text, ...args }: IconTooltipWrapperProps) {
	return (
		<IconTooltip {...args}>
			{text}
		</IconTooltip>
	)
}

const Template: ComponentStory<typeof IconTooltipWrapper> = IconTooltipWrapper

export const InfoTooltip = Template.bind({})
InfoTooltip.storyName = 'InfoTooltip'
InfoTooltip.args = {
	type: 'info'
}

export const QuestionTooltip = Template.bind({})
QuestionTooltip.storyName = 'QuestionTooltip'
QuestionTooltip.args = {
	type: 'question'
}

export const WarningTooltip = Template.bind({})
WarningTooltip.storyName = 'WarningTooltip'
WarningTooltip.args = {
	type: 'warning'
}
