import React, { useState } from 'react';
import dot from "../../assets/images/Menu Dots Square.svg";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import ModalTable from '../modalTable';

interface TableProps {
    data: Array<{
        ردیف: number;
        "کد ملک": number;
        "نوع ملک": string;
        "منطقه": string;
        "نام مالک": string;
        "شماره تماس": number;
        "قیمت": number;
        "مساحت کل زمین": number;
        "تاریخ ثبت": Date;
    }>;
}

const Table: React.FC<TableProps> = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [modalItemId, setModalItemId] = useState<number | null>(null);

    const itemsPerPage = 3;
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleIconClick = (id: number) => {
        setModalItemId(id);
    };

    const handleCloseModal = () => {
        setModalItemId(null);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className='bg-gray-100'>
                    <tr>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px] rounded-tr-full rounded-br-full">ردیف</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">کد ملک</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">نوع ملک</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">منطقه</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">نام مالک</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">شماره تماس</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">قیمت</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">مساحت کل زمین</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px] rounded-tl-full rounded-bl-full">تاریخ ثبت</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((item, index) => (
                        <tr key={index} className="py-2 text-center">
                            <td className="p-4 whitespace-nowrap">{item["ردیف"]}</td>
                            <td className="p-4 whitespace-nowrap">{item["کد ملک"]}</td>
                            <td className="p-4 whitespace-nowrap">{item["نوع ملک"]}</td>
                            <td className="p-4 whitespace-nowrap">{item["منطقه"]}</td>
                            <td className="p-4 whitespace-nowrap">{item["نام مالک"]}</td>
                            <td className="p-4 whitespace-nowrap">{item["شماره تماس"]}</td>
                            <td className="p-4 whitespace-nowrap">{item["قیمت"]}</td>
                            <td className="p-4 whitespace-nowrap">{item["مساحت کل زمین"]}</td>
                            <td className="p-4 whitespace-nowrap">{new Date(item["تاریخ ثبت"]).toLocaleDateString()}</td>
                            <td className="py-2 px-4 text-center" onClick={() => handleIconClick(item.ردیف)}>
                                <img src={dot}
                                    alt='dot'
                                    className="text-2xl cursor-pointer w-6 h-6"
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
            {modalItemId && (
                <ModalTable handleCloseModal={handleCloseModal} />
            )}
        </div>
    );
};

export default Table;
