import { FormAlert, InputForm, StyledButton } from 'components'
import _ from 'lodash'
import { useState } from 'react'
import { handleChangeField, handleChangeSelect } from 'utility/helper'
import { handleValidate } from 'utility/hooks/setupHooks'
import * as yup from 'yup'

const MarketSegmentation = () => {
	const [formError, setFormError] = useState('')
	const [formToState, setFormToState] = useState([
		{
			title: 'Usia Target Market',
			placeholder: 'Type here',
			type: 'text',
			value: '',
			name: 'username',
			rules: yup.string().required('Usia Target Market is Required!'),
			error: '',
		},
		{
			title: 'Gender Target Market',
			placeholder: 'Select Status',
			value: '',
			type: 'select',
			name: 'status_order',
			error: '',
			rules: yup
				.object()
				.required('Gender Target Market is required!')
				.nullable(),
			options: [
				{ label: 'Laki-laki', value: 'laki-laki' },
				{ label: 'Perempuan', value: 'perempuan' },
			],
		},
		{
			title: 'Economic Class Target Market',
			placeholder: 'Type here',
			type: 'text',
			value: '',
			name: 'text',
			rules: yup.string().required('Economic Class is Required!'),
			error: '',
		},
		{
			title: 'Geographic Target Market',
			placeholder: 'Type here',
			type: 'text',
			value: '',
			name: 'old_password',
			rules: yup.string().required('Geographic Target is Required!'),
			error: '',
		},
		{
			title: 'Behavioral Target Market',
			placeholder: 'Type here',
			type: 'text',
			value: '',
			name: 'new_password',
			rules: yup.string().required('Behavioral Target is Required!'),
			error: '',
		},
	])

	const handleOnChange = (
		event: any,
		targetMutation: any,
		setTargetMutation: any
	) => {
		const targetType = event.target.type
		if (
			targetType === 'number' ||
			targetType === 'text' ||
			targetType === 'password' ||
			targetType === 'textarea'
		) {
			setTargetMutation(handleChangeField(event, targetMutation))
		} else if (targetType === 'select') {
			setTargetMutation(handleChangeSelect(event, targetMutation))
		}
	}

	const handleSaveData = () => {
		let clone_forms = _.cloneDeep(formToState)
		const handleResetError = () => {
			clone_forms = clone_forms.map((result) => ({ ...result, error: '' }))
		}

		handleValidate(formToState).then((callback) => {
			if (callback.status === 200) {
				handleResetError()
				setFormToState(clone_forms)

				// xhr request here
				const result = callback.data

				console.log(result)
			} else {
				const errorsObj = callback.data
				handleResetError()
				Object.keys(errorsObj).forEach((error) => {
					const filteredForm = _.filter(
						clone_forms,
						(data) => data.name === error
					)[0]
					filteredForm.error = errorsObj[error]

					setFormToState(clone_forms)
					setFormError('Please check your form again!')
				})
			}
		})
	}

	return (
		<div className='pb-5 max-w-3xl relative h-full'>
			<h1 className='text-dark-green text-2xl font-semibold mb-8'>
				Market & Segmentation
			</h1>
			{formError && <FormAlert message={formError} />}
			<h1 className='text-dark-green text-lg font-semibold my-4'>
				Target Market & Segmentation
			</h1>
			<div className='grid md:grid-cols-2 gap-4 mb-4'>
				<InputForm
					formData={formToState.slice(0, 3)}
					onChange={handleOnChange}
					targetMutation={formToState}
					setTargetMutation={setFormToState}
					containerStyle='flex flex-col gap-4 mb-4'
				/>
				<InputForm
					formData={formToState.slice(3, 5)}
					onChange={handleOnChange}
					targetMutation={formToState}
					setTargetMutation={setFormToState}
					containerStyle='flex flex-col gap-4 mb-4'
				/>
			</div>

			<StyledButton
        title='Simpan'
        className='bg-gradient-to-r from-dark-green to-soft-green rounded-xl px-8 py-2 text-white text-md h-fit disabled:bg-gray-500 absolute bottom-5 right-5'
        onClick={handleSaveData}
      />
		</div>
	)
}

export default MarketSegmentation
