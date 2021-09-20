import React, { ButtonHTMLAttributes } from "react";

const Button = ({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={`${className} text-white px-3 py-1 rounded-sm`}
    />
  );
};

export default Button;
