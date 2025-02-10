import { useState } from "react";
import { newHouseTable } from "../../../utils/data";
import { FiEdit } from "react-icons/fi";


const NewHouseTable = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<number | null>(null);

    const handleModalOpen = (id: number) => {
        setSelectedItem(id);
        setModalOpen(true);
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px] rounded-tr-full rounded-br-full">نام درخواست کننده</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">حداقل مبلغ درخواستی</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">حداکثر مبلغ درخواستی</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">شماره تماس</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px] rounded-tl-full rounded-bl-full">عملیات</th>
                    </tr>
                </thead>
                <tbody>
                    {newHouseTable.map((item, index) => (
                        <tr key={index} className="py-2 text-center">
                            <td className="p-4 whitespace-nowrap">{item["نام درخواست کننده"]}</td>
                            <td className="p-4 text-gray-500 text-sm">{item["حداقل مبلغ درخواستی"]}</td>
                            <td className="p-4 text-gray-500 text-sm truncate">{item["حداکثر مبلغ درخواستی"]}</td>
                            <td className="p-4 text-gray-500 text-sm truncate">{item["شماره تماس"]}</td>
                            <td className="py-2 px-4 text-center flex gap-2 justify-center items-center">
                                <div className="shadow-xl rounded-full p-2 flex items-center justify-center bg-white">
                                    <FiEdit color="#11a97f" onClick={() => handleModalOpen(item.id)} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default NewHouseTable;
