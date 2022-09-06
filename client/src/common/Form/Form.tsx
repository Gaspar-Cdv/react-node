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
			submit: 'Submit',
			reset: 'Reset'
		},
		error: 'Error: {message}'
	},
	fr: {
		buttons: {
			submit: 'Envoyer',
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
		width: 400,
		maxWidth: '100%',
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
	title?: string
	initialValues: T
	validationSchema: any
	onSubmit: (values: T, formikHelpers: FormikHelpers<T>) => void | Promise<any>
	onCancel?: () => void
	onChange: () => void
	submitLabel: string
	cancelLabel?: string
	error: string
	pending: boolean
	children: ReactNode | ReactNode[]
}

function Form<T extends FormikValues> ({
	title,
	initialValues,
	validationSchema,
	onSubmit,
	onCancel,
	onChange,
	submitLabel,
	cancelLabel,
	error,
	pending,
	children
}: FormProps<T>) {
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
			enableReinitialize
		>
			<FormikForm onChange={onChange}>
				<div className={classes.container}>
					{title != null && (
						<h5>{title}</h5>
					)}

					{children}

					<Alert show={error.length > 0}>
						{translate(i18n.error, { message: errorMessage(error) })}
					</Alert>

					<div className={classes.buttons}>
						{onCancel != null && (
							<Button variant='secondary' onClick={onCancel}>
								{cancelLabel || translate(i18n.buttons.reset)}
							</Button>
						)}

						<Button type='submit' disabled={pending}>
							{submitLabel || translate(i18n.buttons.submit)}
						</Button>
					</div>
				</div>
			</FormikForm>
		</Formik>
	)
}

export default Form
