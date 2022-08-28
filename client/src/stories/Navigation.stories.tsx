import { ComponentStory, ComponentMeta } from '@storybook/react'
import Main from '../components/Main'
import BottomBar from '../components/Nav/BottomBar'
import Sidebar from '../components/Nav/Sidebar'
import Topbar from '../components/Nav/Topbar'

export default {
	title: 'Components/Navigation',
	component: NavigationWrapper,
	parameters: {
		layout: 'fullscreen'
	}
} as ComponentMeta<typeof NavigationWrapper>

function NavigationWrapper () {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
			<Topbar />

			<Sidebar />

			<Main />

			<BottomBar />
		</div>
	)
}

const Template: ComponentStory<typeof NavigationWrapper> = NavigationWrapper

export const Navigation = Template.bind({})
Navigation.storyName = 'Navigation'
