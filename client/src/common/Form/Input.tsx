import classNames from 'classnames'
import { FieldAttributes, useField } from 'formik'
import { ChangeEvent, HTMLProps, useRef } from 'react'
import { createUseStyles } from 'react-jss'
import { useErrorMessage } from '../../utils/useErrorMessage'

const useStyles = createUseStyles(theme => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		gap: 5
	},
	fieldSet: {
		padding: [7, 12, 12, 12],
		backgroundColor: 'white',
		borderRadius: theme.borderRadius.xs,
		border: [1, 'solid', theme.color.lightBorder],
		cursor: 'text',
		'&:focus-within': {
			border: [1, 'solid', theme.color.info],
		}
	},
	legend: {
		cursor: 'default',
		lineHeight: '0.75rem',
		fontSize: '0.75rem',
		padding: [0, 5]
	},
	input: {
		width: '100%',
		backgroundColor: 'transparent',
		border: 'none',
		outline: 'none',
		fontSize: '1rem'
	},
	errorInput: {
		border: [1, 'solid', theme.color.danger]
	},
	errorMessage: {
		color: theme.color.danger,
		textAlign: 'right',
		fontSize: '0.875rem',
		lineHeight: '0.875rem'
	}
}))

export interface InputProps extends HTMLProps<HTMLInputElement> {
	label?: string
}

function Input<T> ({ label, ...props }: InputProps & FieldAttributes<T>) {
	const classes = useStyles()
	const [{ onChange, ...field }, meta, helpers] = useField(props)
	const showError = meta.touched && meta.error != null
	const errorMessage = useErrorMessage()
	const ref = useRef<HTMLInputElement>()

	const handleChange = (e: ChangeEvent) => {
		helpers.setError(undefined)
		onChange(e)
	}

	return (
		<div className={classes.container}>
			<fieldset
				title={label}
				onClick={() => ref.current?.focus()}
				className={classNames(classes.fieldSet, { [classes.errorInput]: showError })}
			>
				<legend className={classes.legend}>
					{label}
				</legend>

				<input
					className={classes.input}
					onChange={handleChange}
					ref={ref}
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

export default Input
