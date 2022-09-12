import { useRouter } from '../common/routing/hooks'

function Header () {
	const { currentTitle } = useRouter()

	return (
		<header>
			<h3>{currentTitle}</h3>
			<hr />
		</header>
	)
}

export default Header
