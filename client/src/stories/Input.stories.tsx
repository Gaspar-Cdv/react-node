import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Input, { InputProps } from '../common/form/Input'
import { Form, Formik } from 'formik'
import { ErrorMessage } from '@title/common/build/types/ErrorMessage'

export default {
	title: 'Common/Form/Input',
	component: Input
} as ComponentMeta<typeof Input>

interface FormValues {
	input: string
}

function InputWrapper ({ label }: InputProps) {
	const initialValues: FormValues = {
		input: ''
	}

	const validate = (values: FormValues) => {
		const errors: Partial<FormValues> = {}
		if (values.input.length < 4) {
			errors.input = ErrorMessage.MIN_LENGTH_4
		}
		return errors
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	const noop = () => {}

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={noop}
			validate={validate}
		>
			<Form style={{ width: 300 }}>
				<Input name='input' label={label} />
			</Form>
		</Formik>
	)
}

const Template: ComponentStory<typeof Input> = InputWrapper

export const InputStory = Template.bind({})
InputStory.storyName = 'Input'
InputStory.args = {
	label: 'Label'
}
