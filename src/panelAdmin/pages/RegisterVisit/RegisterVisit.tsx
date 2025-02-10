import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import dot from "../../../assets/images/Menu Dots Square.svg";
import { IoMdClose } from "react-icons/io";

interface RequestEstateTableProps {
    dataRegister: Array<{
        id: number;
        "نام خریدار": string;
        "شماره تماس خریدار": number;
        "نام فروشنده": string;
        "شماره تماس فروشنده": number;
        "قیمت ملک": number;
        "کد ملک": number;
    }>;
}

const RegesterVisitTable: React.FC<RequestEstateTableProps> = ({ dataRegister }) => {
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
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px] rounded-tr-full rounded-br-full">نام  خریدار</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">شماره تماس خریدار</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">نام فروشنده</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">شماره تماس فروشنده</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">قیمت ملک</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">کد ملک</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px] rounded-tl-full rounded-bl-full">بیشتر</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((item, index) => (
                        <tr key={index} className="py-2 text-center">
                            <td className="p-4 whitespace-nowrap">{item["نام خریدار"]}</td>
                            <td className="p-4 whitespace-nowrap">{item["شماره تماس خریدار"]}</td>
                            <td className="p-4 whitespace-nowrap">{item["نام فروشنده"]}</td>
                            <td className="p-4 whitespace-nowrap">{item["شماره تماس فروشنده"]}</td>
                            <td className="p-4 whitespace-nowrap">{item["قیمت ملک"]}</td>
                            <td className="p-4 whitespace-nowrap">{item["کد ملک"]}</td>
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
            {selectedItemId && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white lg:p-6 rounded-lg shadow-lg lg:w-1/3 w-full lg:mx-0 mx-4 p-3">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold">جزئیات بیشتر</h2>
                            <IoMdClose onClick={closeModal} size={24} color='#6b7280' />
                        </div>
                        <div className="flex flex-col gap-4 mb-6">
                            <span className="font-bold text-xl text-black">آدرس ملک:</span>
                            <span className="text-gray-500 text-lg">کردستان، سنندج، بهاران</span>
                        </div>
                        <div className="flex flex-col gap-4 mb-6">
                            <span className="font-bold text-xl text-black">تاریخ و ساعت:</span>
                            <span className="text-gray-500 text-lg">۱۲ اردیبهشت ۱۴۰۳</span>
                        </div>
                        <div className="flex flex-col gap-4 mb-6">
                            <span className="font-bold text-xl text-black">وضعیت بازدید:</span>
                            <span className="text-gray-500 text-lg">اگر شما یک طراح هستین و یا با طراحی های گرافیکی سروکار دارید به متن های برخورده اید که با نام لورم ایپسوم شناخته می‌شوند. لورم ایپسوم یا طرح‌نما</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RegesterVisitTable;
