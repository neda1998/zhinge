import { IoCloseSharp } from "react-icons/io5"

interface Props {
    handleModalClose:()=>void
}
const BasicEstateInformationModal = ({ handleModalClose }: Props) => {
    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white lg:p-8 p-4 rounded-lg shadow-lg lg:w-1/2 w-full lg:mx-0 mx-5">
                        <div className="flex items-center justify-between border-b border-dashed border-b-gray-300 mb-4 pb-4">
                            <h2 className="text-xl font-bold">افزودن منطقه جدید</h2>
                            <IoCloseSharp color='#6b7280' size={25} className="hover-btn" onClick={handleModalClose} />
                        </div>
                        <input type="text" placeholder="منطقه جدید را وارد کنید" className="border border-gray-300 rounded-lg w-full p-3" />
                        <button
                            className="mt-7 ml-0 mr-auto flex px-8 py-2 bg-main-color text-white rounded-full"
                        >
                            افزودن
                        </button>
                    </div>
                </div>
    )
}

export default BasicEstateInformationModal
