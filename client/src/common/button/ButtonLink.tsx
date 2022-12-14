import Button, { ButtonProps } from './Button'
import Link from '../routing/Link'
import { LinkParams, RouteName } from '../routing/Router'

interface ButtonLinkProps extends ButtonProps {
	to: RouteName
	params?: LinkParams
}

function ButtonLink ({ to, params = {}, ...props }: ButtonLinkProps) {
	return (
		<Link to={to} params={params}>
			<Button {...props} />
		</Link>
	)
}

export default ButtonLink
