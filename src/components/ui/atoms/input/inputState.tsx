import React, { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  margin?: string;
}

const InputState = ({ label, placeholder, margin, name, onChange, value, ...rest }: Props) => {
  return (
    <div className={`flex flex-col w-full ${margin}`}>
      <label className="mb-2 text-xs mr-5">{label}</label>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className="appearance-none w-full py-3 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400"
        {...rest}
      />
    </div>
  );
};

export default InputState;
