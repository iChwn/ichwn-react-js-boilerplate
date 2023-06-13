import React from 'react'
import PropTypes from 'prop-types'

type TextInputType = {
	data: {
		placeholder: string
		type?: string
		value: string
		disabled?: boolean
		name: string,
    rightAddon?: React.ReactNode;
	}
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const TextInput = ({ data, onChange }: TextInputType) => {
	return (
		<div className='flex flex-row gap-3 w-full'>
			<input
				type={data.type}
				name={data.name ? data.name : ''}
				placeholder={data.placeholder}
				autoComplete='off'
				className='w-full text-black border-[1px] border-[#BBBBBB] rounded-md px-3 py-2 focus:outline-none disabled:bg-[#d1d1d16b]'
				onChange={onChange}
				value={`${data.value}`}
				disabled={data.disabled}
			/>
			{data.rightAddon}
		</div>
	)
}

TextInput.propTypes = {
	data: PropTypes.object,
}

TextInput.defaultProps = {
	data: {
		title: '',
		placeholder: '',
		type: '',
		onChange: () => {},
		value: '',
		disabled: false,
    rightAddon: <div/>
	},
}

export default TextInput
