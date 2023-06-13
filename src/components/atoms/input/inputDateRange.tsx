/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { range } from "lodash";
import { icon_list } from "assets/image";

type MenuType = {
  children?: React.ReactNode;
  className?: string;
}
const Menu = (props:MenuType) => {
  const shadow = 'hsla(218, 50%, 10%, 0.1)';
  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: 12,
        boxShadow: `0 0 0 1px ${shadow}, 0 4px 11px ${shadow}`,
        marginTop: 8,
        position: 'absolute',
        zIndex: 3,
        width: '365px',
        overflow: 'hidden',
        right: 0,
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
}
const Dropdown = ({ children, isOpen, target, onClose }: DropdownType) => (
  <div className="relative border-[1px] border-[#BBBBBB] rounded-md w-full">
    {target}
    {isOpen ? <Menu>{children}</Menu> : null}
    {/* {isOpen ? <div className="top-0 left0 fixed z-[1]" onClick={onClose} /> : null} */}
  </div>
); 

const years = range(1990, dayjs(new Date()).year() + 1, 1);
// const days = ["Sen", "Sel", "Rab", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type OnChangeCallbackType = {
  target: {
    type: string | undefined;
    name?: string;
    startDate: Date;
    endDate: Date;
  }
}
type InputDateRangeType = {
  data: {
    placeholder?: string;
    type?: string;
    value?: Date | null | any;
    startDate?: Date | null | any;
    endDate?: Date | null | any;
    name?: string;
    title?: string;
    hideMonthYear?: boolean;
  },
  onChange: (e:OnChangeCallbackType) => void;
}
const InputDateRange = ({ data, onChange }: InputDateRangeType) => {
  const [isOpen, setOpen] = useState(false)

  const toggleOpen = () => {
    setOpen(!isOpen)
  }

  const handleOnChange = (dates:[Date, Date]) => {
    const [start, end] = dates;
    const dateData = {
      target: {
        type: data.type,
        name: data.name,
        startDate: start,
        endDate: end
      }
    }

    onChange(dateData)
  }

  const renderDateText = () => {
    if (data.startDate && data.endDate) {
      return `${dayjs(data.startDate).format("DD/MM/YYYY")} to ${dayjs(data.endDate).format("DD/MM/YYYY")}`
    } else if(data.startDate) {
      return `${dayjs(data.startDate).format("DD/MM/YYYY")} to -`
    } else {
      return data.placeholder
    }
  }

  useEffect(() => {
    if(data.endDate === null) {
      handleOnChange([data.startDate, data.startDate])
    }
  }, [isOpen])

  return (
    <Dropdown
      isOpen={isOpen}
      onClose={toggleOpen}
      target={
        <button
          disabled={isOpen}
          onClick={toggleOpen}
          className="w-full text-left px-3 py-2 flex items-center justify-between"
        >
          <span className={data.startDate ? "text-black" : "text-[#AAAAAA]" }>
            {renderDateText()}
          </span>
          <img src={icon_list.cheveron_bottom_gray} alt="" />
        </button>
      }
    >
      <DatePicker
        className="shadow-higher"
        selected={data.startDate}
        startDate={data.startDate}
        endDate={data.endDate}
        selectsRange={true}
        onChange={handleOnChange}
        inline
        // showTimeInput={data.hideMonthYear ? false : true}
        onClickOutside={toggleOpen}
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
        }) => !data.hideMonthYear ? (
          <div
            className="flex w-full flex-row"
            style={{
              margin: 10,
            }}
          >
            <select
              className="select-date text-xl"
              value={months[dayjs(date).month()]}
              onChange={e => changeMonth(months.indexOf(e.target.value))}
            >
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <select
              className="select-date text-xl"
              value={dayjs(date).year()}
              onChange={({ target: { value } }) => changeYear(~~value)}
            >
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ): <div/>}
      />
    </Dropdown>
  );
}

InputDateRange.propTypes = {
  data: PropTypes.object,
};

InputDateRange.defaultProps = {
  data: {
    title: "",
    placeholder: "",
    type: "",
    onChange: () => {},
    value: null,
    options: [
      { value: "", label: "" }
    ],
    hideMonthYear: false,
    onSelectSearch: null // for async process
  }
};

export default InputDateRange;
