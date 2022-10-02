import { Form as FormikForm, Formik, FormikProps, FormikValues } from 'formik'
import { ReactNode, Ref } from 'react'
import { createUseStyles } from 'react-jss'
import Alert from '../../common/Alert'
import Button from '../../common/button/Button'
import { UseFormProps } from '../../services/createUseForm'
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
		width: '100%',
		maxWidth: 400,
		margin: '0 auto'
	},
	buttons: {
		display: 'flex',
		justifyContent: 'center',
		flexWrap: 'wrap-reverse',
		gap: '2rem',
	}
})

interface FormProps<T> extends UseFormProps<T> {
	initialValues: T
	validationSchema?: any
	onCancel?: () => void
	formRef?: Ref<HTMLFormElement> // forwardRef doesn't work with generic component
	children: ReactNode | ReactNode[] | ((formikProps: FormikProps<T>) => ReactNode)
}

function Form<T extends FormikValues> ({
	title,
	initialValues,
	validationSchema,
	onSubmit,
	onCancel,
	resetError,
	submitLabel,
	cancelLabel,
	error,
	pending,
	formRef,
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
			{formikProps => (
				<FormikForm onChange={resetError} encType='multipart/form-data' ref={formRef}>
					<div className={classes.container}>
						{title != null && (
							<h5>{title}</h5>
						)}

						{typeof children === 'function' ? children(formikProps) : children}

						<Alert
							show={error.length > 0}
							onClose={resetError}
						>
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
			)}
		</Formik>
	)
}

export default Form
