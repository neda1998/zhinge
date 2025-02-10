import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { sliderTable } from "../../../utils/data";
import { IoCloseSharp } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";

interface Props { }

const BasicEstateInformation = ({ }: Props) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<number | null>(null);

    const handleModalOpen = (id: number) => {
        setSelectedItem(id);
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setSelectedItem(null);
    };

    const handleDeleteClick = (id: number) => {
        console.log(`Delete`);
    };

    return (
        <div className="overflow-x-auto mt-10">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px] rounded-tr-full rounded-br-full">ردیف</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">تصویر</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">عنوان اسلایدر</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">متن کوتاه در مورد اسلایدر</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px] rounded-tl-full rounded-bl-full">عملیات</th>
                    </tr>
                </thead>
                <tbody>
                    {sliderTable.map((item, index) => (
                        <tr key={index} className="py-2 text-center">
                            <td className="p-4 whitespace-nowrap">{item["ردیف"]}</td>
                            <td className="p-4 whitespace-nowrap">
                                <img src={item["تصویر"]} alt="slider img" />
                            </td>
                            <td className="p-4 text-gray-500 text-sm">{item["عنوان اسلایدر"]}</td>
                            <td className="p-4 text-gray-500 text-sm truncate">{item["متن کوتاه در مورد اسلایدر"]}</td>
                            <td className="py-2 px-4 text-center flex gap-2 justify-center items-center">
                                <div className="shadow-xl rounded-full w-9 h-9 flex items-center justify-center">
                                    <button
                                        onClick={() => handleDeleteClick(item.ردیف)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <AiOutlineDelete size={24} />
                                    </button>
                                </div>
                                <div className="shadow-xl rounded-full p-2 flex items-center justify-center bg-white">
                                    <FiEdit color="#11a97f" onClick={() => handleModalOpen(item.ردیف)} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {modalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white lg:p-8 rounded-lg shadow-lg lg:w-1/2 w-full lg:mx-0 mx-4 p-3">
                        <div className="flex items-center justify-between border-b border-dashed border-b-gray-300 mb-4 pb-4">
                            <h2 className="text-xl font-bold">افزودن منطقه جدید</h2>
                            <IoCloseSharp color='#6b7280' size={25} className="hover-btn" onClick={handleModalClose} />
                        </div>
                        <input type="text" placeholder="منطقه جدید را وارد کنید" className="border border-gray-300 rounded-lg p-3 w-full" />
                        <button
                            className="mt-7 ml-0 mr-auto flex px-8 py-2 bg-main-color text-white rounded-full"
                        >
                            افزودن
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BasicEstateInformation;
