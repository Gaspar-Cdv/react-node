import { ComponentStory, ComponentMeta } from '@storybook/react'
import Drawer from '../common/Drawer'

export default {
	title: 'Common',
	component: Drawer,
	args: {
		open: true,
		width: '100vw',
		direction: 'left'
	},
	argTypes: {
		className: { control: false }
	}
} as ComponentMeta<typeof Drawer>

const Template: ComponentStory<typeof Drawer> = (props) => <Drawer {...props} />

export const DrawerStory = Template.bind({})
DrawerStory.storyName = 'Drawer'
