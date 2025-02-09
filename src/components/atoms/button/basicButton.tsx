import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';

const BaseButton = ({onClick, title, type, addClasses, icon, isDisabled}:any) => {
  const [buttonType, setButtonType] = useState("")
  
  useEffect(() => {
    if(type === "filled") {
      setButtonType("px-10 py-3 bg-[#EB008B] text-white rounded-full")
    } else if(type === "outlined") {
      setButtonType("px-10 py-2 bg-white border-2 border-[#EB008B] text-[#EB008B] rounded-full")
    }
  }, [type])

  return (
    <button disabled={isDisabled} onClick={onClick} className={`${buttonType} ${addClasses} disabled:opacity-[0.5]`}>
      {title}
      {icon && (
        <img src={icon} alt=""/>
      )}
    </button>
  )
}

BaseButton.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
  type: PropTypes.string,
  addClasses: PropTypes.string,
  isDisabled: PropTypes.bool,
};

BaseButton.defaultProps = {
  onClick: () => {},
  title: "",
  type: "filled",
  addClasses: "",
  isDisabled: false,
};

export default BaseButton;