import React from "react";
import InputSelect from "../../atoms/input/inputSelect";
import TextInput from "../../atoms/input/inputText";
import PropTypes from "prop-types";
import PasswordInput from "../../atoms/input/inputPassword";

// sample formData
// const formData = [
//   {
//     title: "Country ID",
//     placeholder: "e.g ID",
//     type: "text",
//     value: ""
//   }
// ]

const InputForm = ({formData, onChange, containerStyle}) => {
  return (
    <div className={containerStyle}>
      {formData.map((result, index) => {
        return (
          <div key={index} className="w-full">
            <div className="font-md text-black font-normal mb-[2px]">{result.title}</div>
            {(result.type === "text" || result.type === "number") && <TextInput onChange={onChange} data={result}/>}
            {result.type === "password" && <PasswordInput onChange={onChange} data={result}/>}
            {result.type === "select" && <InputSelect onChange={onChange} data={result}/>}
            {result.error && (<label className="text-sm text-red-600">{result.error}</label>)}
          </div>
        )
      })}
    </div>
  )
}


InputForm.propTypes = {
  formData: PropTypes.array,
  onChange: PropTypes.func,
  containerStyle: PropTypes.string
};

InputForm.defaultProps = {
  onChange: () => {},
  formData: [
    {
      title: "",
      placeholder: "",
      type: "",
      value: ""
    }
  ],
  containerStyle: "flex flex-col gap-y-4 w-full"
};

export default InputForm;