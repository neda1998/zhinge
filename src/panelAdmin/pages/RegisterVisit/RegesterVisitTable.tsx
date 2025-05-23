import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { PuffLoader } from "react-spinners";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import UseGetAllVisitsQuery from "../../../hooks/queries/admin/getAllVisits/UseGetAllVisitsQuery";
import UseDeleteVisitMutation from "../../../hooks/mutation/creatVisit/UseDeleteVisitMutation";
import UseUpdateVisitsutation from "../../../hooks/mutation/creatVisit/UseUpdateVisitsutation";

const RegesterVisitTable: React.FC = () => {
    const { data, isLoading, error } = UseGetAllVisitsQuery();
    const deleteVisitMutation = UseDeleteVisitMutation();
    const updateVisitMutation = UseUpdateVisitsutation();
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

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editVisitId, setEditVisitId] = useState<number | null>(null);
    const [editVisitUid, setEditVisitUid] = useState(""); 
    const [editVisitName, setEditVisitName] = useState("");
    const [editVisitAddress, setEditVisitAddress] = useState("");
    const [editVisitDate, setEditVisitDate] = useState<any>(null);
    const [editVisitPhone, setEditVisitPhone] = useState("");
    const [editVisitDescription, setEditVisitDescription] = useState("");

    const handleEdit = (visit: any) => {
        setEditVisitId(visit.id);
        setEditVisitUid(visit.Uid || "");
        setEditVisitName(visit.name);
        setEditVisitAddress(visit.address);
        setEditVisitDate(visit.date);
        setEditVisitPhone(visit.phone);
        setEditVisitDescription(visit.description);
        setIsEditModalOpen(true);
    };

    const handleUpdateVisit = () => {
        if (!editVisitName || !editVisitAddress || !editVisitDate || !editVisitPhone || !editVisitDescription) {
            Swal.fire({
                title: "خطا",
                text: "لطفاً همه فیلدها را پر کنید.",
                icon: "error",
                confirmButtonText: "باشه",
            });
            return;
        }
        const updatedData = {
            id: editVisitId,
            Uid: editVisitUid,
            name: editVisitName,
            address: editVisitAddress,
            date: editVisitDate?.format ? editVisitDate.format() : editVisitDate,
            phone: editVisitPhone,
            description: editVisitDescription,
        };
        updateVisitMutation.mutate(updatedData);
        setIsEditModalOpen(false);
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
        <div className="overflow-x-auto sm:w-full w-[315px]">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px] rounded-tr-full rounded-br-full">نام</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">شماره تماس</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">آدرس</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">توضیحات</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">تاریخ</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px] rounded-tl-full rounded-bl-full">عملیات</th>
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
                            <td className="py-2 px-4 text-center inline-flex gap-2 justify-center items-center">
                                <AiOutlineDelete
                                    size={22}
                                    className="text-red-500 hover:text-red-700 cursor-pointer"
                                    onClick={() => handleDelete(item.id)}
                                />
                                <FiEdit
                                    size={20}
                                    color="#11a97f"
                                    className="cursor-pointer hover:text-green-600"
                                    onClick={() => handleEdit(item)}
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

            {/* New update modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-75 z-[9999]">
                    <div className="bg-white rounded-lg lg:p-6 p-3 lg:w-1/3 w-full shadow-lg mx-4">
                        <h2 className="text-xl font-bold mb-4">ویرایش بازدید</h2>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">نام</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border rounded"
                                placeholder="نام را وارد کنید"
                                value={editVisitName}
                                onChange={(e) => setEditVisitName(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">آدرس</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border rounded"
                                placeholder="آدرس را وارد کنید"
                                value={editVisitAddress}
                                onChange={(e) => setEditVisitAddress(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">تاریخ</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border rounded text-right"
                                placeholder="تاریخ را وارد کنید (مثال: 1402)"
                                value={editVisitDate || ""}
                                onChange={e => setEditVisitDate(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">شماره تماس</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border rounded"
                                placeholder="شماره تماس را وارد کنید"
                                value={editVisitPhone}
                                onChange={(e) => setEditVisitPhone(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">توضیحات</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border rounded"
                                placeholder="توضیحات را وارد کنید"
                                value={editVisitDescription}
                                onChange={(e) => setEditVisitDescription(e.target.value)}
                            />
                        </div>

                        <div className="flex justify-end gap-4">
                            <button
                                className="bg-gray-300 px-4 py-2 rounded-lg"
                                onClick={() => setIsEditModalOpen(false)}
                            >
                                بستن
                            </button>
                            <button
                                className="bg-main-color text-white px-4 py-2 rounded-lg"
                                onClick={handleUpdateVisit}
                            >
                                ثبت تغییرات
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RegesterVisitTable;
