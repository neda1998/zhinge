import React from 'react';

interface TableProps {
    data: any[] | { deleted: any[] };
    count?: number;
}

const UnverifiedEstateTable: React.FC<TableProps> = ({ data, count }) => {
    const estates = Array.isArray(data)
        ? data
        : ('deleted' in data && Array.isArray(data.deleted) ? data.deleted : []);

    const rejectedCount = estates.filter((item: any) => item.reject).length;

    if (!estates || estates.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                {typeof count === "number"
                    ? `تعداد ملک تایید نشده: ${count}`
                    : "داده‌ای وجود ندارد"}
            </div>
        );
    }

    const reversedEstates = [...estates].reverse();

    return (
        <div className="overflow-x-auto">
            <div className="flex flex-wrap gap-4 items-center justify-start my-3 text-sm text-gray-700">
                <span className='font-extrabold'>تعداد کل: {typeof count === "number" ? count : estates.length}</span>
                <span className='font-extrabold'>تعداد رد شده: {rejectedCount}</span>
            </div>
            <table className="min-w-full bg-white">
                <thead className='bg-gray-100'>
                    <tr className='rounded'>
                        <th className="px-2 py-4 text-center text-[16px] rounded-tr-full rounded-br-full">کد</th>
                        <th className="px-2 py-4 text-center text-[16px]">نام مالک</th>
                        <th className="px-2 py-4 text-center text-[16px]">شماره تماس</th>
                        <th className="px-2 py-4 text-center text-[16px]">نوع ملک</th>
                        <th className="px-2 py-4 text-center text-[16px]">منطقه</th>
                        <th className="px-2 py-4 text-center text-[16px] rounded-tl-full rounded-bl-full">وضعیت</th>
                    </tr>
                </thead>
                <tbody>
                    {reversedEstates.map((item: any, idx: number) => (
                        <tr key={idx} className="text-center">
                            <td className="p-4">{item.id}</td>
                            <td className="p-4">{item.full_name}</td>
                            <td className="p-4">{item.userID}</td>
                            <td className="p-4">{item.type}</td>
                            <td className="p-4">{item.region}</td>
                            <td className="p-4">{item.reject ? "رد شده" : "-"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UnverifiedEstateTable;
