import React, { InputHTMLAttributes } from "react";

const InputText = ({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...props}
      type="text"
      className={`${className} border rounded w-full py-2 px-3`}
    />
  );
};

export default InputText;
