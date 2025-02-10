import { FaCaretDown } from "react-icons/fa6"

const ActiveSelect = () => {
    return (
        <div className="flex items-center gap-6 w-full mb-9">
            <div className="border border-gray-300 text-black p-2 rounded-xl w-36"
            >
                <span className="text-black font-extrabold">فعال</span>
            </div>
            <div className="relative">
                <select
                    className="appearance-none border border-gray-300 text-black font-extrabold p-2 rounded-xl w-36 focus:ring-0 focus:outline-none"
                >
                    <option>
                        غیر عادی
                    </option>
                    <option>
                        عادی
                    </option>
                </select>
                <div className="absolute inset-y-0 left-3 flex items-center px-2 pointer-events-none">
                    <FaCaretDown color="#d1d5db" size={24} />
                </div>
            </div>
        </div>
    )
}

export default ActiveSelect
