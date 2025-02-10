import React from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import dot from "../../../assets/images/Menu Dots Square.svg";
import { tableZone } from '../../../utils/data';

interface Props {
    handleModalOpen:(item:any)=>void;
    handleDeleteClick:(item:any)=>void
}

const BasicEstateInformationTable = ({handleModalOpen,handleDeleteClick}:Props) => {
  return (
    <table className="w-1/2 bg-white mx-auto">
    <thead className="bg-gray-100">
        <tr>
            <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px] rounded-tr-full rounded-br-full">ردیف</th>
            <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">عنوان منطقه</th>
            <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px] rounded-tl-full rounded-bl-full">عملیات</th>
        </tr>
    </thead>
    <tbody>
        {tableZone.map((item, index) => (
            <tr key={index} className="py-2 text-center">
                <td className="p-4 whitespace-nowrap">{item["ردیف"]}</td>
                <td className="p-4 whitespace-nowrap">{item["عنوان منطقه"]}</td>
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
                        <img
                            src={dot}
                            alt="dot"
                            className="cursor-pointer w-6 h-6"
                            onClick={() => handleModalOpen(item.ردیف)}
                        />
                    </div>
                </td>
            </tr>
        ))}
    </tbody>
</table>
  )
}

export default BasicEstateInformationTable