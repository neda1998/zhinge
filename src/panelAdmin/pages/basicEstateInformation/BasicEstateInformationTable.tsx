import { AiOutlineDelete } from 'react-icons/ai'
import Swal from "sweetalert2";

interface Props {
    data: Array<{ ردیف: number; "عنوان منطقه": string }>;
    handleDeleteClick:(item:any)=>void
}

const BasicEstateInformationTable = ({data, handleDeleteClick}:Props) => {
  const handleDelete = (id: number) => {
    Swal.fire({
      title: "آیا مطمئن هستید؟",
      text: "این عملیات قابل بازگشت نیست!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله، حذف کن",
      cancelButtonText: "انصراف"
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteClick(id);
      }
    });
  };

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
        {data.map((item, index) => (
          <tr key={index} className="py-2 text-center">
            <td className="p-4 whitespace-nowrap">{item["ردیف"]}</td>
            <td className="p-4 whitespace-nowrap">{item["عنوان منطقه"]}</td>
            <td className="py-2 px-4 text-center flex gap-2 justify-center items-center">
              <div className="shadow-xl rounded-full w-9 h-9 flex items-center justify-center">
                <button
                  onClick={() => handleDelete(item.ردیف)}
                  className="text-red-500 hover:text-red-700"
                >
                  <AiOutlineDelete size={24} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default BasicEstateInformationTable