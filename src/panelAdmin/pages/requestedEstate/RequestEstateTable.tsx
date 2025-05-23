import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import dot from "../../../assets/images/MenuDotsSquare.svg";
import UseGetAllRequests from "../../../hooks/queries/admin/getAllRequests/UseGetAllRequests";
import { PuffLoader } from "react-spinners";
import Swal from "sweetalert2";

const columns = [
    { key: "Uid", label: "کد ملک" },
    { key: "full_name", label: "نام و نام خانوادگی" },
    { key: "phone", label: "شماره تماس" },
    { key: "lowest_price", label: "حداقل قیمت" },
    { key: "hieghest_price", label: "حداکثر قیمت" },
    { key: "region", label: "منطقه" },
];

const RequestEstateTable: React.FC = () => {
    const { data = { users: [], number: 0 }, isLoading, isError } = UseGetAllRequests();
    console.log(data);
    
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;
    const totalPages = Math.ceil(data.users.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = data.users.slice(startIndex, startIndex + itemsPerPage);

    const handleShowDetails = (item: any) => {
        Swal.fire({
            title: "جزئیات درخواست",
            html: `
                <div style="display:flex;flex-direction:column;gap:10px;text-align:right;direction:rtl">
                    <div><b>کد ملک:</b> ${item.Uid ?? "-"}</div>
                    <div><b>نام و نام خانوادگی:</b> ${item.full_name ?? "-"}</div>
                    <div><b>شماره تماس:</b> ${item.phone ?? "-"}</div>
                    <div><b>حداقل قیمت:</b> ${item.lowest_price ?? "-"}</div>
                    <div><b>حداکثر قیمت:</b> ${item.hieghest_price ?? "-"}</div>
                    <div><b>منطقه:</b> ${item.region ?? "-"}</div>
                    <div><b>موقعیت:</b> ${item.location ?? "-"}</div>
                    <div><b>نوع:</b> ${item.type ?? "-"}</div>
                    <div><b>وضعیت:</b> ${item.status === true ? "فعال" : item.status === false ? "غیرفعال" : "-"}</div>
                    <div><b>پیام:</b> ${item.message ?? "-"}</div>
                </div>
            `,
            confirmButtonText: "بستن",
            width: 400
        });
    };

    if (isError) return (
        <div className="flex items-center justify-center h-screen">
            <PuffLoader color="#09A380" />
        </div>
    );

    return (
        <div className="overflow-x-auto">
            <div className="mb-4 text-right font-bold text-gray-700">
                تعداد کل درخواست‌ها: {data.number || data.users.length}
            </div>
            <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                    <tr>
                        {columns.map((col, idx) => (
                            <th
                                key={col.key}
                                className={`px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]${idx === 0 ? ' rounded-tr-full rounded-br-full' : ''}`}
                            >
                                {col.label}
                            </th>
                        ))}
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px] rounded-tl-full rounded-bl-full">بیشتر</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((item: any, index: number) => (
                        <tr key={item.id || index} className="py-2 text-center">
                            {columns.map(col => (
                                <td key={col.key} className="p-4 whitespace-nowrap ">
                                    {item[col.key] !== undefined && item[col.key] !== null
                                        ? item[col.key]
                                        : "-"}
                                </td>
                            ))}
                            <td className="py-2 px-4 text-center inline-block">
                                <img
                                    src={dot}
                                    alt="dot"
                                    className="text-2xl cursor-pointer w-6 h-6 mt-1"
                                    onClick={() => handleShowDetails(item)}
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
