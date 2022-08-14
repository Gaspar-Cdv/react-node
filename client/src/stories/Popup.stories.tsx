import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Popup, { PopupProps } from '../common/Popup'
import Placeholder from './Placeholder'

export default {
	title: 'Common',
	component: PopupWrapper,
	argTypes: {
		onCancel: { action: 'onCancel' }
	}
} as ComponentMeta<typeof PopupWrapper>

interface PopupWrapperProps extends PopupProps {
	paragraphs?: number
}

function PopupWrapper ({ paragraphs = 1, ...props }: PopupWrapperProps) {
	return (
		<Popup {...props}>
			<Placeholder paragraphs={paragraphs} />
		</Popup>
	)
}

const Template: ComponentStory<typeof PopupWrapper> = PopupWrapper

export const PopupStory = Template.bind({})
PopupStory.storyName = 'Popup'
PopupStory.args = {
	title: 'Title',
	show: true,
	paragraphs: 1
}
