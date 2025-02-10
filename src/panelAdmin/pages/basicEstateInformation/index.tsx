import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";
import { FiSearch } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import InitialLayout from "../../dashboard/initialLayoutAdmin";
import RouteChevron from "../../../components/common/RouteChevron";
import { pageBasicEstateInformation, tableZone } from "../../../utils/data";
import { IoCloseSharp } from "react-icons/io5";
import { CgMathPlus } from "react-icons/cg";
import Search from "../../../components/common/Search";
import BasicEstateInformationModal from "./BasicEstateInformationModal";
import BasicEstateInformationTable from "./BasicEstateInformationTable";

const BasicEstateInformation = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<number | null>(null);

    const handleModalOpen = (id: number) => {
        setSelectedItem(id);
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setSelectedItem(null);
    };

    const handleDeleteClick = (id: number) => {
        console.log(`Delete`);
    };

    return (
        <InitialLayout>
            <div className="flex items-center justify-between border-b border-b-gray-200 mb-10 lg:py-7 py-4 overflow-x-auto w-[330px] sm:w-full lg:overflow-x-visible gap-7">
                <div>
                    <span className="text-black font-extrabold lg:text-xl text-lg whitespace-nowrap">مدیریت منطقه ملک</span>
                </div>
                <RouteChevron items={pageBasicEstateInformation} />
            </div>
            <div className="flex items-center justify-between">
                <div className={`relative ${modalOpen ? 'opacity-50' : ''}`}>
                    <select
                        className="appearance-none border border-gray-300 text-black font-extrabold p-2 rounded-lg lg:w-64 w-48 focus:ring-0 focus:outline-none"
                    >
                        <option>مدیریت منطقه</option>
                        <option>مدیریت منطقه ۱</option>
                    </select>
                    <div className="absolute inset-y-0 lg:left-3 left-0 flex items-center lg:px-2 pointer-events-none">
                        <FaCaretDown color="#d1d5db" size={24} />
                    </div>
                </div>
                <div className="flex flex-col items-center gap-3 mt-6">
                    <div
                        className={`rounded-xl p-3 bg-white transition-colors duration-300 cursor-pointer`}
                        onClick={() => handleModalOpen(0)}
                        style={{
                            boxShadow:
                                "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                        }}
                    >
                        <div className={`rounded-full p-2 bg-main-color transition-colors duration-300`}>
                            {
                                modalOpen ? <CgMathPlus size={26} color="#fff" /> : <SlLocationPin size={26} color="#fff" />
                            }
                        </div>
                    </div>
                    <span className={`text-black transition-colors duration-300`}>
                        {modalOpen ? 'اضافه کردن' : 'اضافه کردن منطقه'}
                    </span>
                </div>
            </div>
            <Search className="lg:w-1/2 w-full my-12" searchClass="w-12 h-11" />
            <BasicEstateInformationTable handleDeleteClick={handleDeleteClick} handleModalOpen={handleModalClose} />
            {modalOpen && (
                <BasicEstateInformationModal handleModalClose={handleModalClose} />
            )}
        </InitialLayout>
    );
};

export default BasicEstateInformation;
