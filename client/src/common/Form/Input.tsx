import classNames from 'classnames'
import { FieldAttributes, useField } from 'formik'
import { ChangeEvent, HTMLProps } from 'react'
import { createUseStyles } from 'react-jss'
import { useErrorMessage } from '../../utils/useErrorMessage'

const useStyles = createUseStyles(theme => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		gap: 5
	},
	errorInput: {
		border: `1px solid ${theme.color.danger} !important`
	},
	errorMessage: {
		color: theme.color.danger,
		textAlign: 'right',
		marginBottom: 5,
		minHeight: '0.875rem',
		lineHeight: '0.875rem',
		fontSize: '0.875rem'
	}
}))

interface InputProps extends HTMLProps<HTMLInputElement> {
	label?: string
}

function Input<T> ({ label, ...props }: InputProps & FieldAttributes<T>) {
	const classes = useStyles()
	const [{ onChange, ...field }, meta, helpers] = useField(props)
	const showError = meta.touched && meta.error != null
	const errorMessage = useErrorMessage()

	const handleChange = (e: ChangeEvent) => {
		helpers.setTouched(false)
		onChange(e)
	}

	return (
		<div className={classes.container}>
			{label != null && (
				<label htmlFor={props.id || props.name}>{label}</label>
			)}

			<input
				className={classNames({ [classes.errorInput]: showError })}
				onChange={handleChange}
				{...field}
				{...props}
			/>

			<span className={classes.errorMessage}>
				{showError && errorMessage(meta.error!)}
			</span>
		</div>
	)
}

export default Input
