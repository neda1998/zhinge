import React, { useEffect, useState } from "react";
import InitialLayout from "../../dashboard/initialLayoutAdmin";
import UseInprogressQuery from "../../../hooks/queries/admin/inprogress/UseInprogressQuery";
import UseGetuncheckedQuery from "../../../hooks/queries/admin/getunchecked/UseGetuncheckedQuery";
import UseGetcheckedQuery from "../../../hooks/queries/admin/getchecked/UseGetcheckedQuery";
import Table from "../../../components/common/Table";
import RouteChevron from "../../../components/common/RouteChevron";
import { pageUnderReview } from "../../../utils/data";
import { PuffLoader } from "react-spinners";
import UseCheckRequestMutation from "../../../hooks/mutation/check/UseCheckRequestMutation";

const UnderReview = () => {
  const {
    data: uncheckedData,
    isLoading: isLoadingUnchecked,
    isError: isErrorUnchecked,
    refetch: refetchUnchecked,
  } = UseGetuncheckedQuery();

  const [localUnchecked, setLocalUnchecked] = useState<any[]>([]);
  useEffect(() => {
    if (uncheckedData?.users) {
      setLocalUnchecked(uncheckedData.users);
    }
  }, [uncheckedData]);

  const {
    data: inprogressData,
    isLoading: isLoadingProgress,
    isError: isErrorProgress,
    refetch: refetchInprogress, // اضافه کردن refetch
  } = UseInprogressQuery();

  const {
    data: checkedData,
    isLoading: isLoadingChecked,
    isError: isErrorChecked,
    refetch: refetchChecked,
  } = UseGetcheckedQuery();

  const checkMutation = UseCheckRequestMutation();

  const [activeTab, setActiveTab] = useState<"unchecked" | "inprogress" | "checked">("unchecked");

  const handleCheck = async (item: any) => {
    const requestData = {
      Uid: item.Uid ?? item.uid,
      id: item.id,
      full_name: item.full_name,
      phone: item.phone,
      lowest_price: item.lowest_price ?? item.loan ?? 0,
      highest_price: item.highest_price ?? item.hieghest_price ?? item.price ?? 0,
      location: item.location,
      region: item.region,
      type: item.type,
      message: item.message ?? "",
      status: true
    };

    try {
      await checkMutation.mutateAsync(requestData as any);
      refetchUnchecked(); // به‌روزرسانی لیست بررسی‌نشده‌ها
      refetchChecked(); // به‌روزرسانی لیست بررسی‌شده‌ها
      refetchInprogress(); // به‌روزرسانی لیست در حال بررسی
    } catch (error) {
      console.error("خطا در بررسی:", error);
    }
  };

  // دکمه تایید نهایی برای در حال بررسی
  const handleFinalApprove = async (item: any) => {
    // فرض بر این است که همان API و همان داده را باید بفرستی
    const requestData = {
      Uid: item.Uid ?? item.uid,
      id: item.id,
      full_name: item.full_name,
      phone: item.phone,
      lowest_price: item.lowest_price ?? item.loan ?? 0,
      highest_price: item.highest_price ?? item.hieghest_price ?? item.price ?? 0,
      location: item.location,
      region: item.region,
      type: item.type,
      message: item.message ?? "",
      status: true
    };

    try {
      await checkMutation.mutateAsync(requestData as any);
      refetchUnchecked();
      refetchChecked();
      refetchInprogress();
    } catch (error) {
      console.error("خطا در تایید نهایی:", error);
    }
  };

  const uncheckedTableData =
    localUnchecked?.map((item: any, idx: number) => ({
      "ردیف": idx + 1,
      "کد ملک": item.id,
      "نوع ملک": item.type,
      "منطقه": item.region,
      "نام مالک": item.full_name,
      "شماره تماس": item.phone,
      "وضعیت": "بررسی‌نشده",
      "بازه قیمت": (
        <div className="relative group cursor-default">
          {item.lowest_price.toLocaleString()} - {item.hieghest_price.toLocaleString()} تومان
          <div className="absolute w-[200px] bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded پ-2 z-10">
            بازه قیمت وارد شده توسط کاربر (کمترین تا بیشترین مقدار)
          </div>
        </div>
      ),
      "عملیات": (
        <button
          onClick={() => handleCheck(item)}
          className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded"
        >
          بررسی
        </button>
      ),
    })) || [];

  const inprogressTableData =
    inprogressData?.inprogress?.map((item: any, idx: number) => ({
      "ردیف": idx + 1,
      "کد ملک": item.id,
      "نوع ملک": item.type,
      "منطقه": item.region,
      "نام مالک": item.full_name,
      "شماره تماس": item.userID,
      "وضعیت": "در حال بررسی",
      "بازه قیمت": (
        <span>
          {item.price?.toLocaleString()} تومان
        </span>
      ),
      "عملیات": (
        <button
          onClick={() => handleFinalApprove(item)}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded"
        >
          تایید نهایی
        </button>
      ),
    })) || [];

  const checkedTableData =
    checkedData?.checked?.map((item: any, idx: number) => ({
      "ردیف": idx + 1,
      "کد ملک": item.id,
      "نوع ملک": item.type,
      "منطقه": item.region,
      "نام مالک": item.full_name,
      "شماره تماس": item.phone,
      "وضعیت": "چک‌شده",
      "بازه قیمت": (
        <span>
          {item.lowest_price?.toLocaleString()} - {item.highest_price?.toLocaleString()} تومان
        </span>
      ),
      "عملیات": (
        <span className="text-green-700 font-bold">✓</span>
      ),
    })) || [];

  let tableData: any[] = [];
  if (activeTab === "unchecked") tableData = uncheckedTableData;
  else if (activeTab === "inprogress") tableData = inprogressTableData;
  else if (activeTab === "checked") tableData = checkedTableData;

  const isLoading =
    isLoadingUnchecked || isLoadingProgress || isLoadingChecked;
  const isError =
    isErrorUnchecked || isErrorProgress || isErrorChecked;

  return (
    <InitialLayout>
      <div className="flex items-center justify-between border-b border-b-gray-200 mb-10 py-4 flex-wrap">
        <span className="font-extrabold sm:text-lg whitespace-nowrap ml-2">مدیریت درخواست‌ها</span>
        <RouteChevron items={pageUnderReview} />
      </div>

      <div className="flex gap-2 mb-6">
        <button
          className={`px-4 py-2 rounded-t-md border-b-2 transition-all ${
            activeTab === "unchecked"
              ? "border-[#09A380] bg-[#09A380]/10 font-bold text-[#09A380]"
              : "border-transparent bg-gray-100 text-gray-600"
          }`}
          onClick={() => setActiveTab("unchecked")}
        >
          بررسی‌نشده ({uncheckedTableData.length})
        </button>
        <button
          className={`px-4 py-2 rounded-t-md border-b-2 transition-all ${
            activeTab === "inprogress"
              ? "border-yellow-500 bg-yellow-100 font-bold text-yellow-700"
              : "border-transparent bg-gray-100 text-gray-600"
          }`}
          onClick={() => setActiveTab("inprogress")}
        >
          در حال بررسی ({inprogressTableData.length})
        </button>
        <button
          className={`px-4 py-2 rounded-t-md border-b-2 transition-all ${
            activeTab === "checked"
              ? "border-green-600 bg-green-50 font-bold text-green-700"
              : "border-transparent bg-gray-100 text-gray-600"
          }`}
          onClick={() => setActiveTab("checked")}
        >
          بررسی‌شده ({checkedTableData.length})
        </button>
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

export default UnderReview;
