import { useState, useEffect } from "react";
import { FaCaretDown } from "react-icons/fa6";

interface ComboBoxProps {
  label?: string;
  options: string[];
  name?: string;
  value?: string;
  onChange?: (val: string) => void;
}

const ComboBox: React.FC<ComboBoxProps> = ({ label, options, name, value, onChange }) => {
  const [selected, setSelected] = useState<string>("");

  useEffect(() => {
    if (value !== undefined) {
      setSelected(value);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newVal = e.target.value;
    if (onChange) {
      onChange(newVal);
    } else {
      setSelected(newVal);
    }
  };

  return (
    <div className="flex flex-col w-full mb-4">
      {label && (
        <label className="mb-2 text-xs mr-5 font-bold text-main-color tracking-tight">{label}</label>
      )}
      <div className="relative">
        <select
          name={name}
          value={value !== undefined ? value : selected}
          onChange={handleChange}
          className="appearance-none w-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-main-color bg-[#f4f4f4] rounded-full text-[14px] font-medium shadow-sm transition-all duration-200 border border-gray-200 placeholder-gray-400"
        >
          <option value="" disabled>
            انتخاب کنید
          </option>
          {options.map((option, idx) => (
            <option key={idx} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 left-3 flex items-center px-2 pointer-events-none">
          <FaCaretDown color="#09A380" size={22} />
        </div>
      </div>
    </div>
  );
};

export default ComboBox;
