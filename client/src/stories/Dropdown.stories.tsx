import { ComponentStory, ComponentMeta } from '@storybook/react'
import Select from '../common/Form/Select'

export default {
	title: 'Common/Select',
	component: SelectWrapper,
	args: {
		itemsCount: 5
	}
} as ComponentMeta<typeof SelectWrapper>

interface SelectWrapperProps {
	itemsCount: number
}

function SelectWrapper ({ itemsCount }: SelectWrapperProps) {
	const items = [...Array(itemsCount)].map((_, i) => ({
		key: i,
		label: `Item ${i + 1}`,
		onClick: () => console.log(`Item ${i + 1} clicked`)
	}))


	return (
		<Select options={items}>
			Click me
		</Select>
	)
}

const Template: ComponentStory<typeof SelectWrapper> = SelectWrapper

export const SelectStory = Template.bind({})
SelectStory.storyName = 'Select'
