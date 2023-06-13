import React from 'react'
import PropTypes from 'prop-types'

type OnlyLabelType = {
	data: {
		placeholder: string
		type?: string
		value: string
		disabled?: boolean
		name: string,
    title: string;
	}
}

const OnlyLabel = ({ data }: OnlyLabelType) => {
	return (
		<div className='flex flex-row gap-3 w-full items-center h-full'>
      <label className='text-[14px] text-black'>{data.title}</label>
		</div>
	)
}

OnlyLabel.propTypes = {
	data: PropTypes.object,
}

OnlyLabel.defaultProps = {
	data: {
		title: '',
		placeholder: '',
		type: '',
		onChange: () => {},
		value: '',
		disabled: false,
	},
}

export default OnlyLabel
