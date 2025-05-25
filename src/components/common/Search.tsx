import { FiSearch } from "react-icons/fi"

interface PropsSearch {
    className?: string,
    searchClass?: string,
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onSearch?: (value: string) => void
}
const Search = ({ className, searchClass, value, onChange, onSearch }: PropsSearch) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e);
        onSearch?.(e.target.value);
    };

    return (
        <div
            className={`rounded-full border border-gray-300 pr-5 p-1 flex items-center justify-between mx-auto ${className}`}
        >
            <input
                type="text"
                placeholder="جستجو برای ..."
                className="w-full bg-transparent"
                value={value}
                onChange={handleInputChange}
            />
            <div className={`bg-main-color ${searchClass} rounded-full flex justify-center items-center cursor-pointer`}>
                <FiSearch color="#fff" size={18} />
            </div>
        </div>
    )
}

export default Search
