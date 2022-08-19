import Button, { ButtonProps } from './Button'
import Link from './routing/Link'
import { RouteName } from './routing/Router'

interface ButtonLinkProps extends ButtonProps {
	to: RouteName
}

function ButtonLink ({ to, ...props }: ButtonLinkProps) {
	return (
		<Link to={to}>
			<Button {...props} />
		</Link>
	)
}

export default ButtonLink
