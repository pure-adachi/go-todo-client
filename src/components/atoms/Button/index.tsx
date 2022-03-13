import React, { ButtonHTMLAttributes } from "react";

const Button = ({
  className,
  disabled,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const classNames = `${className} text-white px-3 py-1 rounded-sm ${
    disabled ? "disabled:opacity-50 disabled:cursor-not-allowed" : ""
  }`;

  return <button {...props} disabled={disabled} className={classNames} />;
};

export default Button;
