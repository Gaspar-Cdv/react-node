import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Loader from '../common/Loader'

export default {
	title: 'Common',
	component: Loader
} as ComponentMeta<typeof Loader>

const Template: ComponentStory<typeof Loader> = (args) => <Loader {...args} />

export const LoaderStory = Template.bind({})
LoaderStory.storyName = 'Loader'
LoaderStory.args = {
	show: true
}
