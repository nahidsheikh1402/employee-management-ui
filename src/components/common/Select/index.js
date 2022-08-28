import React from "react";
import Select from "react-select";
const SelectBox = ({
  id,
  name,
  labelName,
  placeholder,
  optionList,
  background,
  onChange,
  value,
  onClick,
  options,
  className,
  theme,
  defaultLable,
  defaultValue,
}) => {
  return (
    <Select
      id={id}
      name={name}
      theme={theme}
      placeholder={placeholder}
      value={value}
      className={className}
      onChange={onChange}
      // onClick={onClick}
      options={options}
      defaultValue={{label: defaultLable, value: defaultValue}}    />
  );
};
export default SelectBox;
