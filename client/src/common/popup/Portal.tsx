import { ReactNode, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
	children: ReactNode | ReactNode[]
}

function Portal ({ children }: PortalProps) {
	const portalRef = useRef(document.createElement('div'))

	useEffect(() => {
		const portal = portalRef.current
		document.body.appendChild(portal)

		return () => {
			document.body.removeChild(portal)
		}
	}, [])

	return createPortal(children, portalRef.current)
}

export default Portal
