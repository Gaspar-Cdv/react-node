import { FieldAttributes, useField } from 'formik'
import { ChangeEvent, HTMLProps } from 'react'
import { createUseStyles } from 'react-jss'

interface JSSProps {
	error: boolean
}

const useStyles = createUseStyles(theme => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		gap: 5
	},
	input: ({ error }: JSSProps) => ({
		padding: 5,
		...(error && { border: [1, 'solid', theme.color.danger] })
	}),
	error: {
		color: theme.color.danger,
		textAlign: 'right',
		height: '1rem'
	}
}))

interface InputProps extends HTMLProps<HTMLInputElement> {
	label?: string
}

function Input<T> ({ label, ...props }: InputProps & FieldAttributes<T>) {
	const [{ onChange, ...field }, meta, helpers] = useField(props)
	const showError = meta.touched && meta.error != null
	const classes = useStyles({ error: showError })

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
				className={classes.input}
				onChange={handleChange}
				{...field}
				{...props}
			/>

			<span className={classes.error}>
				{showError && meta.error}
			</span>
		</div>
	)
}

export default Input
