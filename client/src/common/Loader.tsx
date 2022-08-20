import Backdrop from './Backdrop'
import loader from '../images/loader.svg'
import theme from '../theme'

interface LoaderProps {
	show: boolean
}

function Loader ({ show }: LoaderProps) {
	return (
		<Backdrop show={show} zIndex={theme.zIndexes.loader}>
			<img src={loader} alt='loading' style={{ width: '7.5rem' }} />
		</Backdrop>
	)
}

export default Loader
