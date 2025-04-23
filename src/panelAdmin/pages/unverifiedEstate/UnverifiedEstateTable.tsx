import React from 'react';

interface TableProps {
    data: any[];
    count?: number;
}

const UnverifiedEstateTable: React.FC<TableProps> = ({ data, count }) => {
    if (!data || data.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                {typeof count === "number"
                    ? `تعداد ملک تایید نشده: ${count}`
                    : "داده‌ای وجود ندارد"}
            </div>
        );
    }
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className='bg-gray-100'>
                    <tr>
                        <th className="px-2 py-4 text-center text-[16px]">آیتم</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, idx) => (
                        <tr key={idx} className="text-center">
                            <td className="p-4">{JSON.stringify(item)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UnverifiedEstateTable;
