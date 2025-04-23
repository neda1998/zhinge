import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

interface TableProps {
    data: Array<{
        ردیف: number;
        "کد ملک": number;
        "نوع ملک": string;
        "منطقه": string;
        "نام مالک": string;
        "شماره تماس"?: number;
        userID?: string | number;
        قیمت: number;
        "مساحت کل زمین": number;
    }>;
}

const Table: React.FC<TableProps> = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const getPaginationRange = () => {
        const range: (number | string)[] = [];

        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const leftSibling = Math.max(currentPage - 1, 1);
        const rightSibling = Math.min(currentPage + 1, totalPages);
        const showLeftDots = leftSibling > 2;
        const showRightDots = rightSibling < totalPages - 1;

        if (!showLeftDots && showRightDots) {
            return [1, 2, 3, '...', totalPages];
        }

        if (showLeftDots && !showRightDots) {
            return [1, '...', totalPages - 2, totalPages - 1, totalPages];
        }

        if (showLeftDots && showRightDots) {
            return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
        }

        return [];
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className='bg-gray-100'>
                    <tr>
                        <th className="px-2 py-4 text-center text-[16px] rounded-tr-full rounded-br-full">ردیف</th>
                        <th className="px-2 py-4 text-center text-[16px]">کد ملک</th>
                        <th className="px-2 py-4 text-center text-[16px]">نوع ملک</th>
                        <th className="px-2 py-4 text-center text-[16px]">منطقه</th>
                        <th className="px-2 py-4 text-center text-[16px]">نام مالک</th>
                        <th className="px-2 py-4 text-center text-[16px]">شماره تماس</th>
                        <th className="px-2 py-4 text-center text-[16px]">قیمت</th>
                        <th className="px-2 py-4 text-center text-[16px] rounded-tl-full rounded-bl-full">مساحت کل زمین</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((item, index) => (
                        <tr key={index} className="text-center">
                            <td className="p-4">{item["ردیف"]}</td>
                            <td className="p-4">{item["کد ملک"]}</td>
                            <td className="p-4">{item["نوع ملک"]}</td>
                            <td className="p-4">{item["منطقه"]}</td>
                            <td className="p-4">{item["نام مالک"]}</td>
                            <td className="p-4">
                                {
                                    item["شماره تماس"]}
                            </td>
                            <td className="p-4">{item["قیمت"]}</td>
                            <td className="p-4">{item["مساحت کل زمین"]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-center items-center gap-2 mt-6 bg-white py-3 rounded-full shadow-md w-fit px-6 mx-auto">
                {/* prev */}
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-full transition-all duration-150 ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'
                        }`}
                >
                    <FaChevronRight className="w-4 h-4" />
                </button>

                {getPaginationRange().map((page, idx) => (
                    <button
                        key={idx}
                        onClick={() => typeof page === 'number' && handlePageChange(page)}
                        disabled={page === '...'}
                        className={`w-9 h-9 flex items-center justify-center rounded-full font-bold transition-all duration-200 ${currentPage === page
                            ? 'bg-green-500 text-white shadow-md'
                            : 'text-gray-700 hover:bg-gray-100'
                            } ${page === '...' ? 'cursor-default' : ''}`}
                    >
                        {page}
                    </button>
                ))}

                {/* next */}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-full transition-all duration-150 ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'
                        }`}
                >
                    <FaChevronLeft className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default Table;
