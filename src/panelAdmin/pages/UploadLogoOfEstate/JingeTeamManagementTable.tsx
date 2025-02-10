import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { JingeTeamTable } from "../../../utils/data";
import { FiEdit } from "react-icons/fi";


const JingeTeamManagementTable = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<number | null>(null);

    const handleModalOpen = (id: number) => {
        setSelectedItem(id);
        setModalOpen(true);
    };

    const handleDeleteClick = (id: number) => {
        console.log(`Delete`);
    };

    return (
        <div className="overflow-x-auto mt-10">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px] rounded-tr-full rounded-br-full">ردیف</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">نام عضو</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">شغل</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">آدرس ایمیل</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">شماره موبایل</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px] rounded-tl-full rounded-bl-full">عملیات</th>
                    </tr>
                </thead>
                <tbody>
                    {JingeTeamTable.map((item, index) => (
                        <tr key={index} className="py-2 text-center">
                            <td className="p-4 whitespace-nowrap">{item["ردیف"]}</td>
                            <td className="p-4 whitespace-nowrap">
                                {item["نام عضو"]}
                            </td>
                            <td className="p-4 text-gray-500 text-sm">{item["شغل"]}</td>
                            <td className="p-4 text-gray-500 text-sm truncate">{item["آدرس ایمیل"]}</td>
                            <td className="p-4 text-gray-500 text-sm truncate">{item["شماره موبایل"]}</td>
                            <td className="py-2 px-4 text-center flex gap-2 justify-center items-center">
                                <div className="shadow-xl rounded-full w-9 h-9 flex items-center justify-center">
                                    <button
                                        onClick={() => handleDeleteClick(item.ردیف)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <AiOutlineDelete size={24} />
                                    </button>
                                </div>
                                <div className="shadow-xl rounded-full p-2 flex items-center justify-center bg-white">
                                    <FiEdit color="#11a97f" onClick={() => handleModalOpen(item.ردیف)} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default JingeTeamManagementTable;
