import React, { ButtonHTMLAttributes } from "react";

const Button = ({
  className,
  disabled,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const classNames = [
    className,
    "p-2",
    "border-2",
    "rounded",
    disabled ? "disabled:opacity-30" : "",
    disabled ? "disabled:cursor-not-allowed" : "",
  ].join(" ");

  return <button {...props} disabled={disabled} className={classNames} />;
};

export default Button;
