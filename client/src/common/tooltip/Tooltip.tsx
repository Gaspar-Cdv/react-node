import { ReactNode } from 'react'
import ReactTooltip from 'react-tooltip'

export interface TooltipProps {
	children: ReactNode | ReactNode[]
	id?: string
}

function Tooltip ({ id, children }: TooltipProps) {
	return (
		<ReactTooltip
			id={id}
			effect='solid'
			place='top'
		>
			{children}
		</ReactTooltip>
	)
}

export default Tooltip
