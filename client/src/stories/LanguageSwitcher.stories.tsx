import { ComponentStory, ComponentMeta } from '@storybook/react'
import LanguageSwitcher from '../components/LanguageSwitcher/LanguageSwitcher'

export default {
	title: 'Components',
	component: LanguageSwitcher
} as ComponentMeta<typeof LanguageSwitcher>

const Template: ComponentStory<typeof LanguageSwitcher> = () => <LanguageSwitcher />

export const LanguageSwitcherStory = Template.bind({})
LanguageSwitcherStory.storyName = 'LanguageSwitcher'
