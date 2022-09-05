import { Form as FormikForm, Formik, FormikHelpers, FormikValues } from 'formik'
import { ReactNode } from 'react'
import { createUseStyles } from 'react-jss'
import Alert from '../../common/Alert'
import Button from '../../common/button/Button'
import { defineI18n, useTranslate } from '../../utils/i18n'
import { useErrorMessage } from '../../utils/useErrorMessage'

const i18n = defineI18n({
	en: {
		buttons: {
			reset: 'Reset'
		},
		error: 'Error: {message}'
	},
	fr: {
		buttons: {
			reset: 'Réinitialiser'
		},
		error: 'Erreur : {message}'
	}
})

const useStyles = createUseStyles({
	container: {
		display: 'flex',
		flexDirection: 'column',
		gap: '1.25rem',
		maxWidth: 400,
		width: '100%',
		margin: '0 auto'
	},
	buttons: {
		display: 'flex',
		justifyContent: 'center',
		flexWrap: 'wrap-reverse',
		gap: '2rem',
	}
})

interface FormProps<T> {
	initialValues: T
	validationSchema: any
	onSubmit: (values: T, formikHelpers: FormikHelpers<T>) => void | Promise<any>
	onChange: () => void
	submitLabel: string
	error: string
	pending: boolean
	children: ReactNode | ReactNode[]
}

function Form<T extends FormikValues> ({ initialValues, validationSchema, onSubmit, onChange, submitLabel, error, pending, children }: FormProps<T>) {
	const classes = useStyles()
	const translate = useTranslate()
	const errorMessage = useErrorMessage()

	return (
		<Formik<T>
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
			validateOnChange={false}
			validateOnBlur={false}
		>
			<FormikForm onChange={onChange}>
				<div className={classes.container}>
					{children}

					<Alert show={error.length > 0}>
						{translate(i18n.error, { message: errorMessage(error) })}
					</Alert>

					<div className={classes.buttons}>
						<Button type='reset' variant='secondary'>
							{translate(i18n.buttons.reset)}
						</Button>

						<Button type='submit' disabled={pending}>
							{submitLabel}
						</Button>
					</div>
				</div>
			</FormikForm>
		</Formik>
	)
}

export default Form
