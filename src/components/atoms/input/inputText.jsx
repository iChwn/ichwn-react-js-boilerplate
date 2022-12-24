import React from "react";
import PropTypes from "prop-types";

const TextInput = ({data, onChange}) => {
  return (
    <input 
      type={data.type}
      name={data.name ? data.name : ""} 
      placeholder={data.placeholder} 
      autoComplete="off"
      className="w-full text-black border-[1px] border-[#BBBBBB] rounded-md px-3 py-2 focus:outline-none"
      onChange={onChange} 
      value={`${data.value}`}
      disabled={data.disabled}
    />
  )
}

TextInput.propTypes = {
  data: PropTypes.object,
};

TextInput.defaultProps = {
  data: {
    title: "",
    placeholder: "",
    type: "",
    onChange: () => {},
    value: "",
    disabled: false
  }
};

export default TextInput;