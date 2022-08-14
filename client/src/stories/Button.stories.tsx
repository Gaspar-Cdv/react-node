import { ComponentStory, ComponentMeta } from '@storybook/react'
import Button, { ButtonProps } from '../common/Button'

export default {
	title: 'Common/Button',
	component: ButtonWrapper,
	args: {
		title: 'Button',
		disabled: false
	},
	argTypes: {
		onClick: { action: 'onClick' },
		variant: { control: false }
	}
} as ComponentMeta<typeof ButtonWrapper>

interface ButtonWrapperProps extends ButtonProps {
	title: string
}

function ButtonWrapper ({ title, ...args }: ButtonWrapperProps) {
	return (
		<Button {...args}>
			{title}
		</Button>
	)
}

const Template: ComponentStory<typeof ButtonWrapper> = ButtonWrapper

export const Primary = Template.bind({})
Primary.storyName = 'Primary'

export const Secondary = Template.bind({})
Secondary.storyName = 'Secondary'
Secondary.args = {
	variant: 'secondary'
}

export const Danger = Template.bind({})
Danger.storyName = 'Danger'
Danger.args = {
	variant: 'danger'
}
