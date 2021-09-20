import React, { InputHTMLAttributes } from "react";

const InputText = ({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...props}
      type="text"
      className={`${className} border-b-2 bg-transparent`}
    />
  );
};

export default InputText;
