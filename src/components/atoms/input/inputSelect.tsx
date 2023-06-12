import { IconList } from "assets/image";
import React, { useState } from "react";
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import PropTypes from "prop-types";

const Menu = props => {
  const shadow = 'hsla(218, 50%, 10%, 0.1)';
  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: 4,
        boxShadow: `0 0 0 1px ${shadow}, 0 4px 11px ${shadow}`,
        marginTop: 8,
        position: 'absolute',
        zIndex: 5,
        width: '100%',
      }}
      {...props}
    />
  );
};

const Dropdown = ({ children, isOpen, target, onClose }) => (
  <div className="relative border-[1px] border-[#BBBBBB] rounded-md">
    {target}
    {isOpen ? <Menu>{children}</Menu> : null}
    {/* {isOpen ? <div className="top-0 left0 fixed z-[1]" onClick={onClose} /> : null} */}
  </div>
); 

const selectStyles = {
  control: provided => ({ ...provided, minWidth: 240, margin: 8 }),
  menu: () => ({ boxShadow: 'inset 0 1px 0 rgba(0, 0, 0, 0.1)' }),
};

const InputSelect = ({data, onChange}) => {
  const [inputValue, setInputValue] = useState("")
  const [isOpen, setOpen] = useState(false)

  const toggleOpen = () => {
    setOpen(!isOpen)
  }

  const onSelectChange = (value) => {
    const event = {type: "select", name: data.name}
    onChange({...value, target: event})
    toggleOpen()
  };

  const [timerID, setTimerID] = useState(null);
  const handleDynamicLoad = (inputValue, callback) => {
    clearTimeout(timerID);
    const timer = setTimeout(() => data.onSelectSearch(inputValue, callback), 1000);
    setTimerID(timer)    
  }

  return (
    <Dropdown
      isOpen={isOpen}
      onClose={toggleOpen}
      target={
        <button
          onClick={toggleOpen}
          className="w-full text-left px-3 py-2 flex items-center justify-between"
        >

          <span className={data.value ? "text-black" : "text-[#AAAAAA]" }>{data.value ? data.value.label : data.placeholder}</span>
          <img src={IconList.LogoBanteng} alt="" className="w-[15px]"/>
        </button>
      }
    >
      {data.onSelectSearch ? (
        <AsyncSelect
          cacheOptions
          loadOptions={handleDynamicLoad}
          inputValue={inputValue}
          onInputChange={e => setInputValue(e)}
          onChange={onSelectChange}
          autoFocus
          value={data.value}
          placeholder={
            <div className="flex items-center">
              <img src={IconList.LogoBanteng} alt="" className="w-[15px]" />
              <span className="ml-1">Type to Search {data.title}</span>
            </div>
          }
          onBlur={toggleOpen}
        />
      ) : (
        <Select
          autoFocus
          backspaceRemovesValue={false}
          components={{ IndicatorSeparator: null, DropdownIndicator: null }}
          controlShouldRenderValue={false}
          hideSelectedOptions={false}
          isClearable={false}
          menuIsOpen
          onChange={onSelectChange}
          options={data.options}
          placeholder={
            <div className="flex items-center">
              <img src={IconList.LogoBanteng} alt="" className="w-[15px]" />
              <span className="ml-1">Search {data.title}</span>
            </div>
          }
          styles={selectStyles}
          tabSelectsValue={false}
          value={data.value}
          onBlur={toggleOpen}
        />
      )}
    </Dropdown>
  );
}

InputSelect.propTypes = {
  data: PropTypes.object,
};

InputSelect.defaultProps = {
  data: {
    title: "",
    placeholder: "",
    type: "",
    onChange: () => {},
    value: null,
    options: [
      { value: "", label: "" }
    ],
    onSelectSearch: null // for async process
  }
};

export default InputSelect;
