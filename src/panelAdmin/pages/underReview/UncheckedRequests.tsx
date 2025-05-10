import InitialLayout from "../../dashboard/initialLayoutAdmin";
import { checkRequest } from "../../../services/admin/checkRequest";
import Table from "../../../components/common/Table";
import RouteChevron from "../../../components/common/RouteChevron";
import { pageUnderReview } from "../../../utils/data";
import { PuffLoader } from "react-spinners";
import UseGetuncheckedQuery from "../../../hooks/queries/admin/getunchecked/UseGetuncheckedQuery";

const UncheckedRequests = () => {
  const { data, isLoading, isError, refetch } = UseGetuncheckedQuery();

  const handleCheck = async (id: number) => {
    try {
      await checkRequest(id);
      refetch(); // بعد از تأیید، جدول رو بروزرسانی کن
    } catch (err) {
      console.error("خطا در بررسی درخواست", err);
    }
  };

  const tableData = data?.map((item: any, idx: number) => ({
    "ردیف": idx + 1,
    "کد": item.id,
    "نوع ملک": item.type,
    "منطقه": item.region,
    "نام مالک": item.full_name,
    "شماره تماس": item.phone,
    "بازه قیمت": `${item.lowest_price} - ${item.highest_price}`,
    "پیام": item.message,
    "عملیات": (
      <button
        onClick={() => handleCheck(item.id)}
        className="bg-green-500 text-white px-3 py-1 rounded"
      >
        بررسی
      </button>
    ),
  })) || [];

  return (
    <InitialLayout>
      <div className="flex items-center justify-between border-b border-b-gray-200 mb-10 py-4">
        <span className="font-extrabold text-lg">درخواست‌های بررسی‌نشده</span>
        <RouteChevron items={pageUnderReview} />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <PuffLoader color="#09A380" />
        </div>
      ) : isError ? (
        <div className="text-red-600 text-center">خطا در دریافت اطلاعات</div>
      ) : (
        <Table data={tableData} />
      )}
    </InitialLayout>
  );
};

export default UncheckedRequests;
