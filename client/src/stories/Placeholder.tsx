import { generateLoremIpsum } from '../utils/loremIpsum'

interface PlaceholderProps {
	paragraphs?: number
}

export default function Placeholder ({ paragraphs = 1 }: PlaceholderProps) {
	const loremIpsum = generateLoremIpsum(paragraphs)

	return (
		<>
			{loremIpsum.map((paragraph) => (
				<p key=''>{paragraph}</p>
			))}
		</>
	)
}
