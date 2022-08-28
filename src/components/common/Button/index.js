import React from "react";
import "antd/dist/antd.css";
import { Button as button } from "antd";

const Button = ({
  id,
  type,
  value,
  onChange,
  name,
  disabled,
  className,
  children,
  onClick,
}) => {
  return (
    <button
      id={id}
      className={className}
      type={type}
      value={value}
      name={name}
      onChange={onChange}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default Button;
