import { FaCaretDown } from "react-icons/fa6"
import { operations } from "../../utils/data"
import { IoCloseSharp } from "react-icons/io5"
import { Link } from "react-router-dom"
import ActiveSelect from "../common/ActiveSelect"

interface Props {
    handleCloseModal?: () => void
}
const ModalTable = ({ handleCloseModal }: Props) => {
    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white py-10 px-8 rounded-3xl shadow-lg">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-2xl">وضعیت نمایش:</h2>
                    <IoCloseSharp color='#6b7280' size={25} className="cursor-pointer hover:bg-gray-200 rounded-full hover:rotate-180 transition-all duration-500" onClick={handleCloseModal} />
                </div>
               <ActiveSelect />
                <p className='text-black font-extrabold text-xl'>عملیات:</p>
                <div className="grid lg:grid-cols-5 gap-4 items-center mt-7">
                    {
                        operations.map(item => (
                            <div className="shadow-lg rounded-xl flex flex-col text-center justify-center items-center p-3 cursor-pointer" key={item.id}>
                                <Link to={item.path || "#"}>
                                    <img src={item.img} alt="img" className='text-main-color w-10 h-10' />
                                    <span className="text-main-color">{item.text}</span>
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ModalTable
