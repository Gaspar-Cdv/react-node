import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Alert from '../common/Alert'

export default {
	title: 'Common',
	component: Alert
} as ComponentMeta<typeof Alert>

const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} />

export const AlertStory = Template.bind({})
AlertStory.storyName = 'Alert'
AlertStory.args = {
	show: true,
	severity: 'danger',
	children: 'message'
}
