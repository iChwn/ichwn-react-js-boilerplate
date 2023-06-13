import React from 'react';
import PropTypes from 'prop-types';

type InputFileType = {
  data: {
    placeholder: string;
    type: string;
    value: string;
    disabled?: boolean;
    name: string;
  },
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputFile = ({data, onChange}: InputFileType) => {
  return (
    <input 
      type={data.type}
      name={data.name ? data.name : ''} 
      placeholder={data.placeholder} 
      autoComplete='off'
      className='w-full text-black border-[1px] border-[#BBBBBB] rounded-md px-3 py-2 focus:outline-none'
      onChange={onChange} 
      // value={data.value}
      disabled={data.disabled}
    />
  )
}

InputFile.propTypes = {
  data: PropTypes.object,
};

InputFile.defaultProps = {
  data: {
    title: '',
    placeholder: '',
    type: '',
    onChange: () => {},
    value: '',
    disabled: false
  }
};

export default InputFile;