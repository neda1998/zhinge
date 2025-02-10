import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { IoMdClose } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";

interface RequestEstateTableProps {
    dataRegister: Array<{
        ردیف: number;
        "کاربر ثبت کننده": string;
        "نام مخاطب": string;
        "شماره موبایل": number;
        "توضیحات": string;
        "تاریخ ثبت": Date;
    }>;
}

const PhoneBookManagementTable: React.FC<RequestEstateTableProps> = ({ dataRegister }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

    const itemsPerPage = 3;
    const totalPages = Math.ceil(dataRegister.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = dataRegister.slice(startIndex, startIndex + itemsPerPage);

    const openModal = (id: number) => {
        setSelectedItemId(id);
    };

    const closeModal = () => {
        setSelectedItemId(null);
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px] rounded-tr-full rounded-br-full">ردیف</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">کاربر ثبت کننده</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">نام مخاطب</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">شماره موبایل</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">توضیحات</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">تاریخ ثبت</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px] rounded-tl-full rounded-bl-full">حذف</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((item, index) => (
                        <tr key={index} className="py-2 text-center">
                            <td className="p-4 whitespace-nowrap">{item["ردیف"]}</td>
                            <td className="p-4 whitespace-nowrap">{item["کاربر ثبت کننده"]}</td>
                            <td className="p-4 whitespace-nowrap">{item["نام مخاطب"]}</td>
                            <td className="p-4 whitespace-nowrap">{item["شماره موبایل"]}</td>
                            <td className="p-4 whitespace-nowrap">{item["توضیحات"]}</td>
                            <td className="p-4 whitespace-nowrap">{new Date(item["تاریخ ثبت"]).toLocaleDateString()}</td>
                            <td className="text-center w-10 h-10 flex justify-center items-center rounded-full shadow-xl bg-white">
                                <RiDeleteBin6Line onClick={() => openModal(item.ردیف)} color='#dc2626' className='cursor-pointer' size={20} />
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
            {selectedItemId && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white lg:p-6 rounded-lg shadow-lg lg:w-1/3 w-full lg:mx-0 mx-4 p-3">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold">جزئیات بیشتر</h2>
                            <IoMdClose onClick={closeModal} size={24} color='#6b7280' className='hover-btn' />
                        </div>
                        <div className="flex flex-col gap-4 mb-6">
                            <span className="font-bold text-xl text-black">آیا از حذف خود مطمئن هستید؟</span>
                            <button
                                className="bg-red-600 px-12 text-white py-2 rounded-lg ml-0 mr-auto mt-6"
                                onClick={closeModal}
                            >
                                حذف
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PhoneBookManagementTable;
