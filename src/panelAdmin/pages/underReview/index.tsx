import React, { useEffect } from "react";
import InitialLayout from "../../dashboard/initialLayoutAdmin";
import UseInprogressQuery from "../../../hooks/queries/admin/inprogress/UseInprogressQuery";
import UseGetcheckedQuery from "../../../hooks/queries/admin/getchecked/UseGetcheckedQuery";
import Table from "../../../components/common/Table";
import RouteChevron from "../../../components/common/RouteChevron";
import { pageUnderReview } from "../../../utils/data";
import { PuffLoader } from "react-spinners";
import UseVerifyAnnounceMutation from "../../../hooks/mutation/verifyAnnounce/UseVerifyAnnounceMutation";
import ChooseItemsOfState from "../propertyManagement/ChooseItemsOfState";
import UseRejectannounceMutatiojn from "../../../hooks/mutation/rejectannounce/UseRejectannounceMutatiojn";

const UnderReview = () => {
  const {
    data: inprogressData,
    isLoading: isLoadingProgress,
    isError: isErrorProgress,
    refetch: refetchInprogress,
  } = UseInprogressQuery();

  const {
    data: checkedData,
    isLoading: isLoadingChecked,
    isError: isErrorChecked,
    refetch: refetchChecked,
  } = UseGetcheckedQuery();

  const verifyAnnounceMutation = UseVerifyAnnounceMutation();
  const rejectAnnounceMutation = UseRejectannounceMutatiojn();

  useEffect(() => {
    if (verifyAnnounceMutation.isSuccess || rejectAnnounceMutation.isSuccess) {
      refetchInprogress();
      refetchChecked();
      verifyAnnounceMutation.reset();
      rejectAnnounceMutation.reset();
    }
  }, [verifyAnnounceMutation.isSuccess, rejectAnnounceMutation.isSuccess]);

  const inprogressTableData =
    inprogressData?.inprogress?.map((item: any, idx: number) => ({
      "ردیف": idx + 1,
      "کد ملک": item.id,
      "نوع ملک": item.type,
      "منطقه": item.region,
      "نام مالک": item.full_name,
      "شماره تماس": item.userID,
      "وضعیت": (
        <span className="text-yellow-600 font-bold">در حال بررسی</span>
      ),
      "بازه قیمت": (
        <span>
          {item.price?.toLocaleString()} تومان
        </span>
      ),
      "عملیات": (
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => {
              verifyAnnounceMutation.mutate(item);
            }}
            className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded"
          >
            بررسی
          </button>
          <button
            onClick={() => {
              rejectAnnounceMutation.mutate(item);
            }}
            className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded"
          >
            رد
          </button>
        </div>
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

  let tableData: any[] = inprogressTableData;

  const isLoading =
    isLoadingProgress || isLoadingChecked;
  const isError =
    isErrorProgress || isErrorChecked;

  return (
    <InitialLayout>
      <div className="flex items-center justify-between border-b border-b-gray-200 mb-10 py-4 flex-wrap">
        <span className="font-extrabold sm:text-lg whitespace-nowrap ml-2">مدیریت درخواست‌ها</span>
        <RouteChevron items={pageUnderReview} />
      </div>
      <ChooseItemsOfState />
      <div className="flex gap-2 mb-6">
        <button
          className={`px-4 py-2 rounded-t-md border-b-2 transition-all ${
            "border-yellow-500 bg-yellow-100 font-bold text-yellow-700"
          }`}
        >
          در حال بررسی ({inprogressTableData.length})
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <PuffLoader color="#09A380" />
        </div>
      ) : isError ? (
        <div className="text-red-600 text-center">خطا در دریافت اطلاعات</div>
      ) : (
        <div className="overflow-x-auto mt-4">
          <Table data={tableData} />
        </div>
      )}
    </InitialLayout>
  );
};

export default UnderReview;
