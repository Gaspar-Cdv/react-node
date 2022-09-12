import { ErrorMessage } from '@title/common/build/types/ErrorMessage'
import { FormikHelpers } from 'formik'
import { useState } from 'react'
import HttpError from '../types/HttpError'
import { IntlKey, useTranslate } from '../utils/i18n'

interface CreateUseFormProps<T> {
	action: (values: T) => void | Promise<void>
	titleKey?: IntlKey
	submitKey?: IntlKey
	cancelKey?: IntlKey
	resetForm?: boolean
}

export interface UseFormProps<T> {
	onSubmit: (values: T, formikHelpers: FormikHelpers<T>) => Promise<void>
	resetError: () => void
	error: string
	pending: boolean;
	title?: string
	submitLabel?: string
	cancelLabel?: string
}

export const createUseForm = <T> ({
	action,
	titleKey,
	submitKey,
	cancelKey,
	resetForm = true
}: CreateUseFormProps<T>): (onSuccess?: () => void) => UseFormProps<T> => {
	return (onSuccess?: () => void) => {
		const translate = useTranslate()
		const [error, setError] = useState('')
		const [pending, setPending] = useState(false)

		const resetError = () => setError('')

		const onSubmit = async (values: T, formikHelpers: FormikHelpers<T>) => {
			try {
				setPending(true)
				await action(values)
				if (resetForm) {
					formikHelpers.resetForm()
				}
				resetError()
				onSuccess?.()
			} catch (e) {
				if (e instanceof HttpError) {
					setError(e.message)
				} else {
					setError(ErrorMessage.UNKNOWN_ERROR)
					console.error(e)
				}
			} finally {
				setPending(false)
			}
		}

		return {
			onSubmit,
			resetError,
			error,
			pending,
			...(titleKey != null && { title: translate(titleKey) }),
			...(submitKey != null && { submitLabel: translate(submitKey) }),
			...(cancelKey != null && { cancelLabel: translate(cancelKey) })
		}
	}
}
