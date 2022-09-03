import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Key, useState } from 'react'
import Select from '../../common/form/Select'

export default {
	title: 'Common/Form/Select',
	component: SelectWrapper,
	args: {
		itemsCount: 5
	}
} as ComponentMeta<typeof SelectWrapper>

interface SelectWrapperProps {
	itemsCount: number
}

function SelectWrapper ({ itemsCount }: SelectWrapperProps) {
	const [selected, setSelected] = useState<Key | undefined>(undefined)

	const items = [...Array(itemsCount)].map((_, i) => ({
		key: i,
		label: `Item ${i + 1}`,
		onClick: () => {
			setSelected(i)
			console.log(`Item ${i + 1} clicked`)
		}
	}))


	return (
		<Select placeholder='Click me' selected={selected} options={items} />
	)
}

const Template: ComponentStory<typeof SelectWrapper> = SelectWrapper

export const SelectStory = Template.bind({})
SelectStory.storyName = 'Select'
