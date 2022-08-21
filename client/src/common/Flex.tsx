import classNames from 'classnames'
import { Property } from 'csstype'
import { JssValue } from 'jss'
import { DetailedHTMLProps } from 'react'
import { createUseStyles } from 'react-jss'

interface FlexCssProps {
	flex?: Property.Flex<JssValue>
	gap?: Property.Gap<JssValue>
	padding?: Property.Padding<JssValue>
	inline?: boolean
}

interface JssProps extends FlexCssProps {
	flexDirection?: Property.FlexDirection
	justifyContent?: Property.JustifyContent
	alignItems?: Property.AlignItems
	flexWrap?: Property.FlexWrap
}

const useStyles = createUseStyles({
	flex: ({ inline, ...props }: JssProps) => ({
		display: inline ? 'inline-flex' : 'flex',
		...props
	})
})

interface FlexProps extends FlexCssProps, DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	direction?: Property.FlexDirection
	justify?: Property.JustifyContent
	align?: Property.AlignItems
	wrap?: Property.FlexWrap
	className?: string
}

function Flex ({
	flex,
	gap,
	padding,
	inline = true,
	direction,
	justify,
	align,
	wrap,
	className,
	children,
	...props
}: FlexProps) {
	const classes = useStyles({
		flex,
		gap,
		padding,
		inline,
		flexDirection: direction,
		justifyContent: justify,
		alignItems: align,
		flexWrap: wrap
	})

	return (
		<div className={classNames(classes.flex, className)} {...props}>
			{children}
		</div>
	)
}

export default Flex
