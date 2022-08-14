import Backdrop from './Backdrop'
import loader from '../images/loader.svg'
import theme from '../theme'

interface LoaderProps {
	show: boolean
}

function Loader ({ show }: LoaderProps) {
	return (
		<Backdrop show={show} zIndex={theme.zIndexes.loader}>
			<img src={loader} alt='loading' width={120} />
		</Backdrop>
	)
}

export default Loader
