import React, { useState } from 'react';
import { FaCaretDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import dot from "../../../assets/images/Menu Dots Square.svg";
import { MdClose } from "react-icons/md";

interface RequestEstateTableProps {
    dataRequest: Array<{
        id: number,
        "نام کاربری": string;
        "شماره موبایل": number;
        "آدرس ایمیل": string;
        "تعداد ملک های ثبت شده": number;
        "نحوه ثبت نام": string;
    }>;
}

const UserManagementTable: React.FC<RequestEstateTableProps> = ({ dataRequest }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState<number | null>(null);

    const itemsPerPage = 3;
    const totalPages = Math.ceil(dataRequest.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const openModal = (id: number) => {
        setIsModalOpen(id);
    };

    const closeModal = () => {
        setIsModalOpen(null);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = dataRequest.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px] rounded-tr-full rounded-br-full">نام کاربری</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">شماره موبایل</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">آدرس ایمیل</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">تعداد ملک های ثبت شده</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">نحوه ثبت نام</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px] rounded-tl-full rounded-bl-full">عملیات</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((item, index) => (
                        <tr key={index} className="py-2 text-center">
                            <td className="p-4 whitespace-nowrap">{item["نام کاربری"]}</td>
                            <td className="p-4 whitespace-nowrap">{item["شماره موبایل"]}</td>
                            <td className="p-4 whitespace-nowrap">{item["آدرس ایمیل"]}</td>
                            <td className="p-4 whitespace-nowrap">{item["تعداد ملک های ثبت شده"]}</td>
                            <td className="p-4 whitespace-nowrap">{item["نحوه ثبت نام"]}</td>
                            <td className="py-2 px-4 text-center inline-block">
                                <img
                                    src={dot}
                                    alt="dot"
                                    className="text-2xl cursor-pointer w-6 h-6 mt-1"
                                    onClick={() => openModal(item.id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-around my-4 mx-auto bg-white rounded-full py-3 shadow-lg items-center w-96">
                <button
                    onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                    className={`${currentPage === 1 ? 'text-gray-700' : 'text-gray-400'}`}
                    disabled={currentPage === 1}
                >
                    <FaChevronRight />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`${currentPage === page ? 'bg-main-color font-extrabold text-xl text-white rounded-full w-9 h-9' : 'bg-white text-black text-lg'
                            }`}
                    >
                        {page}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                    className={`px-3 py-1 rounded ${currentPage === totalPages ? 'text-gray-700' : 'text-gray-400'}`}
                    disabled={currentPage === totalPages}
                >
                    <FaChevronLeft />
                </button>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-75">
                    <div className="bg-white rounded-lg lg:p-6 p-3 lg:w-1/3 w-full shadow-lg   mx-4">
                        <div className="flex justify-between items-center gap-4">
                            <h2 className="text-xl font-bold">جزئیات بیشتر</h2>
                            <MdClose onClick={closeModal} size={20} className='hover-btn' />
                        </div>
                        <div className="flex items-center gap-9 mt-10">
                            <div className="flex flex-col gap-6">
                                <span className="text-black">وضعیت کاربری</span>
                                <div className="relative">
                                    <select
                                        className="appearance-none border border-gray-300 text-black font-extrabold p-2 rounded-xl lg:w-48 w-36 focus:ring-0 focus:outline-none"
                                    >
                                        <option>
                                            کاربر
                                        </option>
                                        <option>
                                            ادمین
                                        </option>
                                    </select>
                                    <div className="absolute inset-y-0 left-3 flex items-center px-2 pointer-events-none">
                                        <FaCaretDown color="#6b7280" size={24} />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-6">
                                <span className="text-black">نوع دسترسی</span>
                                <div className="relative">
                                    <select
                                        className="appearance-none border border-gray-300 text-black font-extrabold p-2 rounded-xl lg:w-48 w-36 focus:ring-0 focus:outline-none"
                                    >
                                        <option>
                                            غیر عادی
                                        </option>
                                        <option>
                                            عادی
                                        </option>
                                    </select>
                                    <div className="absolute inset-y-0 left-3 flex items-center px-2 pointer-events-none">
                                        <FaCaretDown color="#6b7280" size={24} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagementTable;
