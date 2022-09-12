import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Alert, { AlertProps } from '../common/Alert'

export default {
	title: 'Common',
	component: Alert
} as ComponentMeta<typeof AlertWrapper>

interface AlertWrapperProps extends Omit<AlertProps, 'onClose'> {
	showCloseButton: boolean
}

function AlertWrapper ({ showCloseButton, children, ...props }: AlertWrapperProps) {
	const handleClose = showCloseButton ? () => null : undefined

	return (
		<Alert {...props} onClose={handleClose}>
			{children}
		</Alert>
	)
}

const Template: ComponentStory<typeof AlertWrapper> = AlertWrapper

export const AlertStory = Template.bind({})
AlertStory.storyName = 'Alert'
AlertStory.args = {
	show: true,
	severity: 'danger',
	showCloseButton: true,
	children: 'message'
}
