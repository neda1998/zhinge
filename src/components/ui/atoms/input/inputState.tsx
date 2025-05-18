import React, { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  margin?: string;
  type?: string;
  numeric?: boolean; // new prop
}

const convertPersianNumbersToEnglish = (value: string) => {
  const persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
  const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  for (let i = 0; i < 10; i++) {
    value = value.replace(persianNumbers[i], englishNumbers[i]);
  }
  return value;
};


const InputState = ({
  label,
  placeholder,
  margin,
  name,
  onChange,
  value,
  type = "text",
  numeric,
  ...rest
}: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    if (numeric || type === "number") {
      newValue = convertPersianNumbersToEnglish(newValue);
    }
    onChange?.({ ...e, target: { ...e.target, value: newValue } });
  };

  return (
    <div className={`flex flex-col w-full ${margin}`}>
      {label && (
        <label className="mb-2 text-xs mr-5 font-bold text-main-color tracking-tight">{label}</label>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        className="appearance-none w-full py-3 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-main-color bg-[#f4f4f4] text-[14px] font-medium shadow-sm transition-all duration-200 border border-gray-200 placeholder-gray-400"
        {...((numeric || type === "number") ? { inputMode: "numeric", pattern: "[0-9]*" } : {})}
        {...rest}
      />
    </div>
  );
};

export default InputState;
