import React from 'react';
import PropTypes from 'prop-types';

type TextAreaInputType = {
  data: {
    placeholder: string;
    type: string;
    value: string;
    disabled?: boolean;
    name: string;
    rows?: number;
  },
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextAreaInput = ({data, onChange}: TextAreaInputType) => {
  return (
    <textarea 
      rows={data.rows}
      name={data.name ? data.name : ''} 
      placeholder={data.placeholder} 
      autoComplete='off'
      className='w-full text-black border-[1px] border-[#BBBBBB] rounded-md px-3 py-2 focus:outline-none disabled:bg-[#d1d1d16b]'
      onChange={onChange} 
      value={`${data.value}`}
      disabled={data.disabled}
    />
  )
}

TextAreaInput.propTypes = {
  data: PropTypes.object,
};

TextAreaInput.defaultProps = {
  data: {
    title: '',
    placeholder: '',
    type: '',
    onChange: () => {},
    value: '',
    disabled: false
  }
};

export default TextAreaInput;