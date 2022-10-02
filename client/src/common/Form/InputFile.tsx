import classNames from 'classnames'
import { FieldHookConfig, useField } from 'formik'
import { ChangeEvent, ClassAttributes, InputHTMLAttributes, useMemo } from 'react'
import { createUseStyles } from 'react-jss'
import { defineI18n, useTranslate } from '../../utils/i18n'
import { useErrorMessage } from '../../utils/useErrorMessage'
import Button from '../button/Button'

interface JssProps {
	hasLabel: boolean
}

const useStyles = createUseStyles(theme => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		gap: 5
	},
	fieldSet: ({ hasLabel }: JssProps) => ({
		padding: hasLabel ? [7, 12, 12, 12] : 12,
		backgroundColor: 'white',
		borderRadius: theme.borderRadius.xs,
		border: [1, 'solid', theme.color.lightBorder],
		display: 'flex',
		alignItems: 'center',
		gap: '1rem',
		minWidth: 0 // hack to allow ellipsis on child
	}),
	legend: {
		cursor: 'default',
		lineHeight: '0.75rem',
		fontSize: '0.75rem',
		padding: [0, 5]
	},
	placeholder: {
		fontSize: '0.875rem',
		display: 'block',
		overflow: 'hidden',
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis'
	},
	errorInput: () => ({ // arrow function: hack to increase specificity
		border: [1, 'solid', theme.color.danger]
	}),
	errorMessage: {
		color: theme.color.danger,
		textAlign: 'right',
		fontSize: '0.875rem',
		lineHeight: '0.875rem'
	},
	labelButton: {
		margin: [`-${theme.size.xs}`, `-${theme.size.sm}`],
		padding: [theme.size.xs, theme.size.sm],
		cursor: 'pointer'
	},
	invisible: {
		display: 'none'
	}
}))

const i18n = defineI18n({
	en: {
		browse: 'Browse...',
		noFile: 'No file selected',
		multipleFiles: '{count} files selected'
	},
	fr: {
		browse: 'Parcourir...',
		noFile: 'Aucun fichier selectionné',
		multipleFiles: '{count} fichiers selectionnés'
	}
})

export type InputFileProps = InputHTMLAttributes<HTMLInputElement> & ClassAttributes<HTMLInputElement> & FieldHookConfig<FileList | null> & {
	label?: string
}

function InputFile ({ label, type, ...props }: InputFileProps) {
	const hasLabel = label != null && label.length > 0
	const classes = useStyles({ hasLabel })

	const translate = useTranslate()
	const errorMessage = useErrorMessage()

	const [{ value, onChange, ...field }, meta, helpers] = useField(props)
	const showError = meta.error != null

	const placeholder = useMemo(() => {
		const filesCount = value?.length ?? 0

		return filesCount === 0
			? translate(i18n.noFile)
			: filesCount === 1
				? value![0].name
				: translate(i18n.multipleFiles, { count: filesCount })
	}, [translate, value])

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		helpers.setError(undefined)
		helpers.setValue(e.currentTarget.files) // hack instead of calling onChange (known Formik issue)
	}

	return (
		<div className={classes.container}>
			<fieldset
				title={label}
				className={classNames(classes.fieldSet, { [classes.errorInput]: showError })}
			>
				{hasLabel && (
					<legend className={classes.legend}>
						{label}
					</legend>
				)}

				<Button small>
					<label htmlFor={props.name} className={classes.labelButton}>
						{translate(i18n.browse)}
					</label>
				</Button>

				<span className={classes.placeholder}>
					{placeholder}
				</span>

				<input
					className={classes.invisible}
					onChange={handleChange}
					type='file'
					id={props.name}
					{...field}
					{...props}
				/>

			</fieldset>

			{showError && (
				<span className={classes.errorMessage}>
					{errorMessage(meta.error!)}
				</span>
			)}
		</div>
	)
}

export default InputFile
