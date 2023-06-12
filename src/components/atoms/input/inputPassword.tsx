import React from "react";
import PropTypes from "prop-types";

const PasswordInput = ({data, onChange}) => {
  // const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="w-full text-black border-[1px] border-[#BBBBBB] rounded-md px-3 py-2 focus:outline-none flex flex-row">
      <input 
        className="flex-1 focus-visible:outline-none"
        // type={showPassword ? "text" : data.type}
        name={data.name ? data.name : ""} 
        placeholder={data.placeholder} 
        autoComplete="off"
        onChange={onChange} 
        value={`${data.value}`}
      />
      {/* <button onClick={() => setShowPassword(!showPassword)}>
        <img src={IconList.PasswordHintShow} alt="" className={`${showPassword ? "opacity-[0.4]" : "opacity-1"}`}/>
      </button> */}
    </div>
  )
}

PasswordInput.propTypes = {
  data: PropTypes.object,
};

PasswordInput.defaultProps = {
  data: {
    title: "",
    placeholder: "",
    type: "",
    onChange: () => {},
    value: ""
  }
};

export default PasswordInput;