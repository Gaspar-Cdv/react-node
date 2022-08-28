import { ComponentStory, ComponentMeta } from '@storybook/react'
import BottomBar from '../components/Nav/BottomBar'
import BottomBarItem from '../components/Nav/BottomBarItem'
import Sidebar from '../components/Nav/Sidebar'
import Topbar from '../components/Nav/Topbar'
import { ReactComponent as InfoIcon } from '../images/icons/info.svg'
import { ReactComponent as QuestionIcon } from '../images/icons/question.svg'
import { ReactComponent as WarningIcon } from '../images/icons/warning.svg'

export default {
	title: 'Components/Navigation',
	component: NavigationWrapper,
	parameters: {
		layout: 'fullscreen'
	}
} as ComponentMeta<typeof NavigationWrapper>

function NavigationWrapper () {
	return (
		<>
			<Topbar />

			<Sidebar />

			<BottomBar>
				<BottomBarItem icon={<QuestionIcon />} />
				<BottomBarItem icon={<InfoIcon />} />
				<BottomBarItem icon={<WarningIcon />} />
			</BottomBar>
		</>
	)
}

const Template: ComponentStory<typeof NavigationWrapper> = NavigationWrapper

export const Navigation = Template.bind({})
Navigation.storyName = 'Navigation'
