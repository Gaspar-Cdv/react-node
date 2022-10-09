import { useField } from 'formik'
import { createUseStyles } from 'react-jss'
import { ReactComponent as CloseIcon } from '../../images/icons/close.svg'
import { createFileList } from '../../utils/formUtils'

const useStyles = createUseStyles(theme => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
		gap: 20
	},
	preview: {
		width: 100,
		height: 100,
		border: theme.border.light,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
		borderRadius: theme.borderRadius.xs,
		boxShadow: theme.shadow.md
	},
	image: {
		maxWidth: '100%',
		maxHeight: '100%'
	},
	close: {
		position: 'absolute',
		top: -10,
		right: -10,
		backgroundColor: theme.color.cta,
		borderRadius: '50%',
		border: theme.border.dark,
		color: theme.color.text,
		cursor: 'pointer'
	}
}))

interface ImagePreviewProps {
	file: File
	onDelete: () => void
}

function ImagePreview ({ file, onDelete }: ImagePreviewProps) {
	const classes = useStyles()

	const src = URL.createObjectURL(file)

	return (
		<div className={classes.preview} title={file.name}>
			<img src={src} className={classes.image} alt={file.name} />
			<CloseIcon className={classes.close} onClick={onDelete} />
		</div>
	)
}

interface ImagePreviewerProps {
	name: string
}

function ImagePreviewer ({ name }: ImagePreviewerProps) {
	const classes = useStyles()
	const [{ value }, meta, helpers] = useField<FileList | undefined>(name)

	const deleteFile = (index: number) => {
		if (value != null) {
			const files = Array.from(value)
			files.splice(index, 1)
			helpers.setValue(createFileList(files))
		}
	}

	return (
		<div className={classes.container}>
			{value != null && Array.from(value).map((file, i) => {
				return (
					<ImagePreview
						key={file.name}
						file={file}
						onDelete={() => deleteFile(i)}
					/>
				)
			})}
		</div>
	)
}

export default ImagePreviewer
