import { forwardRef, ReactNode } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

export interface ScrollbarProps {
	maxHeight: string | number
	className?: string
	children: ReactNode | ReactNode[]
}

const Scrollbar = forwardRef(({ maxHeight, className, children }: ScrollbarProps, ref: React.Ref<HTMLDivElement>) => {
	return (
		<div className={className} onClick={e => e.stopPropagation()} ref={ref}>
			<Scrollbars autoHeight autoHeightMax={maxHeight}>
				{children}
			</Scrollbars>
		</div>
	)
})

Scrollbar.displayName = 'Scrollbar'

export default Scrollbar
