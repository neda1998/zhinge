import { FiSearch } from "react-icons/fi"

interface PropsSearch {
    className:string,
    searchClass:string
}
const Search = ({ className,searchClass }: PropsSearch) => {
    return (
        <div
            className={`rounded-full border border-gray-300 pr-5 p-1 flex items-center justify-between mx-auto ${className}`}
        >
            <input type="text" placeholder="جستجو برای ..." className="w-full bg-transparent" />
            <div className={`bg-main-color ${searchClass} rounded-full flex justify-center items-center cursor-pointer`}>
                <FiSearch color="#fff" size={18} />
            </div>
        </div>
    )
}

export default Search
