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
  const [selected, setSelected] = useState<string>(options[0]);

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
    <div className="flex flex-col mb-4">
      <label className="mb-2 text-xs mr-5">{label}</label>
      <div className="relative">
        <select
          name={name}
          value={value !== undefined ? value : selected}
          onChange={handleChange}
          className="appearance-none w-full py-3 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          {options.map((option, idx) => (
            <option key={idx} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 left-3 flex items-center px-2 pointer-events-none">
          <FaCaretDown color="#6b7280" size={24} />
        </div>
      </div>
    </div>
  );
};

export default ComboBox;
