import { ComponentStory, ComponentMeta } from '@storybook/react'
import { createUseStyles } from 'react-jss'
import tailwindColors from '../theme/tailwindColors'

export default {
	title: 'Common/Theme',
	component: Palette
} as ComponentMeta<typeof Palette>

const useStyles = createUseStyles({
	container: {
		display: 'flex',
		flexDirection: 'column',
		gap: 20
	},
	line: {
		flex: 1,
		display: 'flex',
		borderRadius: 5,
		overflow: 'hidden',
		boxShadow: '0 0 3px rgba(0, 0, 0, 0.2)'
	},
	cell: {
		flex: 1,
		height: 60,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		cursor: 'pointer',
		color: 'transparent',
		transition: 'color 200ms',
		'&:hover': {
			color: 'black'
		}
	}
})

function Palette () {
	const classes = useStyles()

	return (
		<div className={classes.container}>
			{Object.entries(tailwindColors).map(([colorName, colors]) => {
				return (
					<>
						<h6>{colorName}</h6>
						<div key={colorName} className={classes.line}>
							{Object.entries(colors).map(([index, color]) => {
								return (
									<div
										key={color}
										className={classes.cell}
										style={{
											backgroundColor: color
										}}
									>
										{color}
									</div>
								)
							})}
						</div>
					</>
				)
			})}
		</div>
	)
}

const Template: ComponentStory<typeof Palette> = Palette

export const Primary = Template.bind({})
Primary.storyName = 'Palette'
