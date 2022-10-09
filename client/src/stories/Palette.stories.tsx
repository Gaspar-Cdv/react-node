import { ComponentStory, ComponentMeta } from '@storybook/react'
import { createUseStyles } from 'react-jss'
import tailwindColors from '../theme/tailwindColors'

export default {
	title: 'Common/Theme',
	component: Palette
} as ComponentMeta<typeof Palette>

const useStyles = createUseStyles(theme => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		gap: 20
	},
	line: {
		flex: 1,
		display: 'flex',
		borderRadius: theme.borderRadius.sm,
		overflow: 'hidden',
		boxShadow: theme.shadow.md
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
}))

function Palette () {
	const classes = useStyles()

	return (
		<div className={classes.container}>
			{Object.entries(tailwindColors).map(([colorName, colors]) => {
				return (
					<>
						<h6>{colorName}</h6>
						<div key={colorName} className={classes.line}>
							{Object.values(colors).map(color => {
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
