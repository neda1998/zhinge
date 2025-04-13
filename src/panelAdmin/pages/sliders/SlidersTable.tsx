interface SliderItem {
    "ردیف": number;
    "عنوان اسلایدر": string;
    "متن کوتاه در مورد اسلایدر": string;
    "عکس‌ها": string[];
  }
  
  interface Props {
    items: SliderItem[];
  }
  
  const SlidersTable = ({ items }: Props) => {
    return (
      <div className="overflow-x-auto mt-10">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-2 py-4 text-center">عنوان اسلایدر</th>
              <th className="px-2 py-4 text-center">متن کوتاه در مورد اسلایدر</th>
              <th className="px-2 py-4 text-center">عکس‌ها</th>
              <th className="px-2 py-4 text-center">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item["ردیف"]}>
                <td className="p-4 text-center">{item["عنوان اسلایدر"]}</td>
                <td className="p-4 text-center">{item["متن کوتاه در مورد اسلایدر"]}</td>
                <td className="p-4 text-center">
                  {item["عکس‌ها"].map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Slider ${index}`}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ))}
                </td>
                <td className="p-4 text-center">
                  {/* دکمه‌های عملیات (حذف/ویرایش) */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default SlidersTable;
  