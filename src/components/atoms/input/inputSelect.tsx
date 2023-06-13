import React, { useState } from 'react';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import PropTypes from 'prop-types';
import { icon_list } from 'assets/image';
import _ from 'lodash';

type MenuType = {
  children: React.ReactNode;
  className: string;
}
const Menu = (props:MenuType) => {
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

type DropdownType = {
  children: React.ReactNode;
  isOpen: boolean;
  target: React.ReactNode;
  onClose?: () => void;
  value: any;
}
const Dropdown = ({ children, isOpen, target, onClose, value }: DropdownType) => (
  <div className='w-full relative border-[1px] border-[#BBBBBB] rounded-md'>
    {target}
    {isOpen ? <Menu className={`${_.isEmpty(value) ? 'empty-menu' : 'selected-menu'}`}>{children}</Menu> : null}
    {/* {isOpen ? <div className='top-0 left0 fixed z-[1]' onClick={onClose} /> : null} */}
  </div>
); 

// const selectStyles = {
//   control: (provided:any) => ({ ...provided, minWidth: 240, margin: 8 }),
//   menu: () => ({ boxShadow: 'inset 0 1px 0 rgba(0, 0, 0, 0.1)' }),
// };

type InputSelectType = {
  data: {
    placeholder: string;
    type?: string;
    value: {label: string};
    name: string;
    title: string;
    options?: any;
    onSelectSearch?: (inputValue: string, callback: (options: any) => void) => void;
    disabled?: boolean;
  },
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const InputSelect = ({data, onChange}: InputSelectType) => {
  const [inputValue, setInputValue] = useState('')
  const [isOpen, setOpen] = useState(false)

  const toggleOpen = () => {
    setOpen(!isOpen)
  }

  const onSelectChange = (value:any) => {
    const event = {type: 'select', name: data.name}
    onChange({...value, target: event})
    toggleOpen()
  };

  const [timerID, setTimerID] = useState(0);
  const handleDynamicLoad = (inputValue:any, callback:any) => {
    clearTimeout(timerID);
    const timer = setTimeout(() => data.onSelectSearch(inputValue, callback), 1000);
    /* @ts-ignore */
    setTimerID(timer)    
  }

  return (
    <Dropdown
      isOpen={isOpen}
      onClose={toggleOpen}
      target={
        <button
          disabled={data.disabled}
          onClick={toggleOpen}
          className='w-full text-left px-3 py-2 flex items-center justify-between disabled:bg-[#d1d1d16b]'
        >

          <span className={data.value ? 'text-black' : 'text-[#AAAAAA]' }>{data.value ? data.value.label : data.placeholder}</span>
          <img src={icon_list.cheveron_bottom_gray} alt='' />
        </button>
      }
      value={data.value}
    >
      {data.onSelectSearch ? (
        <AsyncSelect
          cacheOptions
          loadOptions={handleDynamicLoad}
          inputValue={inputValue}
          onInputChange={e => setInputValue(e)}
          onChange={onSelectChange}
          autoFocus
          menuIsOpen
          defaultOptions
          value={data.value}
          placeholder={
            <div className='flex items-center'>
              <img src={icon_list.search_gray} alt='' className='w-[15px]' />
              <span className='ml-1'>Type to Search {data.title}</span>
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
            <div className='flex items-center'>
              <img src={icon_list.search_gray} alt='' className='w-[15px]' />
              <span className='ml-1'>Search {data.title}</span>
            </div>
          }
          // styles={selectStyles}
          // className='custom-select'
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
    title: '',
    placeholder: '',
    type: '',
    onChange: () => {},
    value: null,
    options: [
      { value: '', label: '' }
    ],
    onSelectSearch: null // for async process
  }
};

export default InputSelect;
