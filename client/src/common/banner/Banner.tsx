import { useState } from 'react'
import { createUseStyles } from 'react-jss'
import Button from '../button/Button'

const useStyles = createUseStyles(theme => ({
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		gap: theme.size.sm,
		minHeight: theme.size.xl,
		padding: [theme.size.xs, theme.size.sm],
		backgroundColor: theme.color.secondary,
		color: theme.color.gray[100]
	}
}))

export interface BannerProps {
	show?: boolean
	message?: string
	actionLabel?: string
	actionOnClick?: () => Promise<void>
}

function Banner ({ show = false, message, actionLabel, actionOnClick }: BannerProps) {
	const classes = useStyles()
	const [pending, setPending] = useState(false)

	if (!show) {
		return null
	}

	const handleClick = async () => {
		setPending(true)
		await actionOnClick?.()
		setPending(false)
	}

	return (
		<div className={classes.container}>
			{message}

			{actionLabel != null && actionOnClick != null && (
				<Button onClick={handleClick} small disabled={pending}>
					{actionLabel}
				</Button>
			)}
		</div>
	)
}

export default Banner
