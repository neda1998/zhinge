import React, { useState } from 'react';
import RouteChevron from "../../../components/common/RouteChevron";
import Search from "../../../components/common/Search";
import { pageRegisterVisit } from "../../../utils/data";
import InitialLayout from "../../dashboard/initialLayoutAdmin";
import { GoEye } from "react-icons/go";
import RegesterVisitTable from "./RegesterVisitTable";
import UseCreateVisitMutation from "../../../hooks/mutation/creatVisit/UseCreateVisitMutation";
import Swal from 'sweetalert2';

// تاریخ شمسی
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const RegisterVisit: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [visitName, setVisitName] = useState("");
    const [visitAddress, setVisitAddress] = useState("");
    const [visitDate, setVisitDate] = useState<any>(null); // نگه‌داری تاریخ انتخاب‌شده
    const [visitPhone, setVisitPhone] = useState("");
    const [visitDescription, setVisitDescription] = useState("");

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const createVisitMutation = UseCreateVisitMutation();

    const handleCreateVisit = async () => {
        if (!visitName || !visitAddress || !visitDate || !visitPhone || !visitDescription) {
            Swal.fire({
                title: "خطا",
                text: "لطفاً همه فیلدها را پر کنید.",
                icon: "error",
                confirmButtonText: "باشه",
            });
            return;
        }

        const visitData = {
            name: visitName,
            address: visitAddress,
            date: visitDate?.format(), // تبدیل به فرمت شمسی مثل "1404/01/26"
            phone: visitPhone,
            description: visitDescription,
        };

        try {
            await createVisitMutation.mutateAsync(visitData);
            setVisitName("");
            setVisitAddress("");
            setVisitDate(null);
            setVisitPhone("");
            setVisitDescription("");
            closeModal();
        } catch (error) {
            // مدیریت خطا
        }
    };

    return (
        <InitialLayout>
            <div className="flex items-center justify-between border-b border-b-gray-200 mb-10 lg:py-7 py-4 overflow-x-auto w-[330px] sm:w-full lg:overflow-x-visible gap-7">
                <span className="font-extrabold text-lg whitespace-nowrap">ثبت بازدید</span>
                <RouteChevron items={pageRegisterVisit} />
            </div>

            <div className="flex flex-col items-center gap-3">
                <div onClick={openModal} className="rounded-xl p-3 bg-white shadow-md cursor-pointer">
                    <div className="bg-main-color rounded-full w-8 h-8 flex items-center justify-center">
                        <GoEye size={20} color="#fff" />
                    </div>
                </div>
                <span className="text-black cursor-pointer" onClick={openModal}>
                    ثبت بازدید جدید
                </span>
            </div>

            <Search className="lg:w-1/2 w-full my-12" searchClass="w-12 h-11" />
            <RegesterVisitTable />

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-75">
                    <div className="bg-white rounded-lg lg:p-6 p-3 lg:w-1/3 w-full shadow-lg mx-4">
                        <h2 className="text-xl font-bold mb-4">ثبت بازدید جدید</h2>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">نام</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border rounded"
                                placeholder="نام را وارد کنید"
                                value={visitName}
                                onChange={(e) => setVisitName(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">آدرس</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border rounded"
                                placeholder="آدرس را وارد کنید"
                                value={visitAddress}
                                onChange={(e) => setVisitAddress(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">تاریخ</label>
                            <DatePicker
                                value={visitDate}
                                onChange={setVisitDate}
                                calendar={persian}
                                locale={persian_fa}
                                calendarPosition="bottom-right"
                                inputClass="w-full px-3 py-2 border rounded text-right"
                                placeholder="تاریخ را انتخاب کنید"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">شماره تماس</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border rounded"
                                placeholder="شماره تماس را وارد کنید"
                                value={visitPhone}
                                onChange={(e) => setVisitPhone(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">توضیحات</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border rounded"
                                placeholder="توضیحات را وارد کنید"
                                value={visitDescription}
                                onChange={(e) => setVisitDescription(e.target.value)}
                            />
                        </div>

                        <div className="flex justify-end gap-4">
                            <button
                                className="bg-gray-300 px-4 py-2 rounded-lg"
                                onClick={closeModal}
                            >
                                بستن
                            </button>
                            <button
                                className="bg-main-color text-white px-4 py-2 rounded-lg"
                                onClick={handleCreateVisit}
                            >
                                ثبت
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </InitialLayout>
    );
};

export default RegisterVisit;
