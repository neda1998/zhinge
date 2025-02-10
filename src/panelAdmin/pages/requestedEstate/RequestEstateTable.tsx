import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import dot from "../../../assets/images/Menu Dots Square.svg"

interface RequestEstateTableProps {
    dataRequest: Array<{
        id: number;
        "نام و نام خانوادگی": string;
        "شماره تماس": number;
        "حداقل قیمت": number;
        "حداکثر قیمت": number;
        "منطقه": number;
        "تاریخ درخواست": Date;
    }>;
}

const RequestEstateTable: React.FC<RequestEstateTableProps> = ({ dataRequest }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 3;
    const totalPages = Math.ceil(dataRequest.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = dataRequest.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px] rounded-tr-full rounded-br-full">کد ملک</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">نام و نام خانوادگی</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">شماره تماس</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">حداقل قیمت</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">حداکثر قیمت</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">منطقه</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">تاریخ درخواست</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px] rounded-tl-full rounded-bl-full">بیشتر</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((item, index) => (
                        <tr key={index} className="py-2 text-center">
                            <td className="p-4 whitespace-nowrap">{item.id}</td>
                            <td className="p-4 whitespace-nowrap">{item["نام و نام خانوادگی"]}</td>
                            <td className="p-4 whitespace-nowrap">{item["شماره تماس"]}</td>
                            <td className="p-4 whitespace-nowrap">{item["حداقل قیمت"]}</td>
                            <td className="p-4 whitespace-nowrap">{item["حداکثر قیمت"]}</td>
                            <td className="p-4 whitespace-nowrap">{item["منطقه"]}</td>
                            <td className="p-4 whitespace-nowrap">{new Date(item["تاریخ درخواست"]).toLocaleDateString()}</td>
                            <td className="py-2 px-4 text-center inline-block">
                                    <img
                                        src={dot}
                                        alt="dot"
                                        className="text-2xl cursor-pointer w-6 h-6 mt-1"
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
        </div>
    );
};

export default RequestEstateTable;
