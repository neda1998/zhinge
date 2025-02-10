import RouteChevron from "../../../components/common/RouteChevron"
import Search from "../../../components/common/Search";
import { pagePhoneBook, phoneBookTable } from "../../../utils/data"
import InitialLayout from "../../dashboard/initialLayoutAdmin"
import { BsTelephone } from "react-icons/bs";
import PhoneBookManagementTable from "./PhoneBookManagementTable";
import { useState } from "react";

const PhoneBookManagement = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <InitialLayout>
            <div className="flex items-center justify-between border-b border-b-gray-200 mb-10 lg:py-7 py-4 overflow-x-auto w-[330px] sm:w-full lg:overflow-x-visible gap-7">
                <div>
                    <span className="text-black font-extrabold text-lg whitespace-nowrap">مدیریت دفترچه تلفن</span>
                </div>
                <RouteChevron items={pagePhoneBook} />
            </div>
            <div className="flex items-center justify-center gap-9">
                <div className="flex flex-col items-center gap-3">
                    <div
                        className={`rounded-xl p-3 bg-white transition-colors duration-300 cursor-pointer`}
                        style={{
                            boxShadow:
                                "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                        }}
                        onClick={openModal}
                    >
                        <div className="bg-main-color rounded-full w-8 h-8 flex items-center justify-center">
                            <BsTelephone size={20} color="#fff" />
                        </div>
                    </div>
                    <span className={`text-black transition-colors duration-300 cursor-pointer`} onClick={openModal}>
                        مدیریت دفترچه تلفن
                    </span>
                </div>
            </div>
            <Search className="lg:w-1/2 w-full my-12" searchClass="w-12 h-11" />
            <PhoneBookManagementTable dataRegister={phoneBookTable} />
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-75">
                    <div className="bg-white rounded-lg lg:p-6 p-3 lg:w-1/3 w-full shadow-lg mx-4">
                        <h2 className="text-xl font-bold mb-4">افزودن مخاطب جدید</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">نام خریدار</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border rounded"
                                placeholder="نام خریدار را وارد کنید"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">شماره تماس خریدار</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border rounded"
                                placeholder="شماره تماس خریدار را وارد کنید"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">قیمت ملک</label>
                            <input
                                type="number"
                                className="w-full px-3 py-2 border rounded"
                                placeholder="قیمت ملک را وارد کنید"
                            />
                        </div>
                        <div className="flex justify-end gap-4">
                            <button
                                className="bg-main-color text-white px-4 py-2 rounded-lg"
                                onClick={closeModal}
                            >
                                افزودن
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </InitialLayout>
    )
}

export default PhoneBookManagement
