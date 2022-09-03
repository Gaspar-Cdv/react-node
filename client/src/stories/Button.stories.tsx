import { ComponentStory, ComponentMeta } from '@storybook/react'
import Button, { ButtonProps } from '../common/button/Button'
import { ReactComponent as Info } from '../images/icons/info.svg'

export default {
	title: 'Common/Form/Button',
	component: ButtonWrapper,
	args: {
		title: 'Button',
		disabled: false,
		withIcon: false,
		small: false
	},
	argTypes: {
		onClick: { action: 'onClick' },
		variant: { control: false }
	}
} as ComponentMeta<typeof ButtonWrapper>

interface ButtonWrapperProps extends ButtonProps {
	title: string
	withIcon: boolean
}

function ButtonWrapper ({ title, withIcon, ...args }: ButtonWrapperProps) {
	return (
		<Button {...withIcon && { icon: Info }} {...args}>
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
