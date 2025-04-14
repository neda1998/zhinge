import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { PuffLoader } from "react-spinners";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";

import UseGetAllVisitsQuery from "../../../hooks/queries/admin/getAllVisits/UseGetAllVisitsQuery";
import UseDeleteVisitMutation from "../../../hooks/mutation/creatVisit/UseDeleteVisitMutation";

const RegesterVisitTable: React.FC = () => {
    const { data, isLoading, error } = UseGetAllVisitsQuery();
    const deleteVisitMutation = UseDeleteVisitMutation();
    const visits: any[] = data || [];

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(visits.length / itemsPerPage);

    const handlePageChange = (page: number) => setCurrentPage(page);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedVisits = visits.slice(startIndex, startIndex + itemsPerPage);

    const handleDelete = (id: number) => {
        Swal.fire({
            title: "آیا مطمئنی؟",
            text: "بعد از حذف امکان بازگردانی وجود ندارد!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "بله، حذف کن",
            cancelButtonText: "انصراف",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteVisitMutation.mutate({ id });
            }
        });
    };

    if (isLoading)
        return (
            <div className="flex justify-center items-center min-h-screen">
                <PuffLoader color="#09A380" />
            </div>
        );

    if (error)
        return <div className="text-center text-red-500">خطا در دریافت بازدیدها</div>;

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">نام</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">شماره تماس</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">آدرس</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">توضیحات</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">تاریخ</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px] rounded-tl-full rounded-bl-full">حذف</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedVisits.map((item, index) => (
                        <tr key={item.id || index} className="py-2 text-center">
                            <td className="p-4 whitespace-nowrap">{item.name}</td>
                            <td className="p-4 whitespace-nowrap">{item.phone}</td>
                            <td className="p-4 whitespace-nowrap">{item.address}</td>
                            <td className="p-4 whitespace-nowrap">{item.description}</td>
                            <td className="p-4 whitespace-nowrap">{item.date}</td>
                            <td className="py-2 px-4 text-center inline-block">
                                <AiOutlineDelete
                                    size={24}
                                    className="text-red-500 hover:text-red-700 cursor-pointer"
                                    onClick={() => handleDelete(item.id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-around my-4 mx-auto bg-white rounded-full py-3 shadow-lg items-center w-96">
                <button
                    onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                    className={currentPage === 1 ? "text-gray-700" : "text-gray-400"}
                    disabled={currentPage === 1}
                >
                    <FaChevronRight />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={
                            currentPage === page
                                ? "bg-main-color font-extrabold text-xl text-white rounded-full w-9 h-9"
                                : "bg-white text-black text-lg"
                        }
                    >
                        {page}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                    className={`px-3 py-1 rounded ${currentPage === totalPages ? "text-gray-700" : "text-gray-400"}`}
                    disabled={currentPage === totalPages}
                >
                    <FaChevronLeft />
                </button>
            </div>
        </div>
    );
};

export default RegesterVisitTable;
