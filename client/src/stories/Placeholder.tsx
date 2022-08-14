import { useMemo } from 'react'
import { generateLoremIpsum } from '../utils/loremIpsum'

interface PlaceholderProps {
	paragraphs?: number
}

export default function Placeholder ({ paragraphs = 1 }: PlaceholderProps) {
	const loremIpsum = useMemo(() => {
		return generateLoremIpsum(paragraphs)
	}, [paragraphs])

	return (
		<>
			{loremIpsum.map((paragraph, index) => (
				<p key={index}>{paragraph}</p>
			))}
		</>
	)
}
