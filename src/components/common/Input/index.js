import React, {useState} from "react";
import "antd/dist/antd.css";
import { Input } from "antd";
const Inputs = ({
  placeholder,
  id,
  type,
  label,
  value,
  onChange,
  name,
  disabled,
  maxLength,
  validate,
  className,
}) => {
  
  return (
  
    <Input
      placeholder={placeholder}
      id={id}
      className={className}
      type={type}
      value={value}
      name={name}
      onChange={onChange}
      disabled={disabled}
      maxLength={maxLength}
      validate={validate}
    />
  );
};
export default Inputs;
