import React, { useEffect, useState } from "react";
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
import UseUpdateAnnounMutation from "../../../hooks/mutation/updateAnnounAdmin/UseUpdateAnnounMutation";
import Swal from "sweetalert2";

const UnderReview = () => {
  const {
    data: inprogressData,
    isLoading: isLoadingProgress,
    isError: isErrorProgress,
    refetch: refetchInprogress,
  } = UseInprogressQuery(); // حذف پارامتر limit

  const {
    data: checkedData,
    isLoading: isLoadingChecked,
    isError: isErrorChecked,
    refetch: refetchChecked,
  } = UseGetcheckedQuery();

  const verifyAnnounceMutation = UseVerifyAnnounceMutation();
  const rejectAnnounceMutation = UseRejectannounceMutatiojn();
  const updateAnnounMutation = UseUpdateAnnounMutation();

  // state for modal
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedAnnounce, setSelectedAnnounce] = useState<any>(null);
  const [editForm, setEditForm] = useState<any>({});

  useEffect(() => {
    if (verifyAnnounceMutation.isSuccess || rejectAnnounceMutation.isSuccess || updateAnnounMutation.isSuccess) {
      refetchInprogress();
      refetchChecked();
      verifyAnnounceMutation.reset();
      rejectAnnounceMutation.reset();
      updateAnnounMutation.reset();
      setEditModalOpen(false);
      setSelectedAnnounce(null);
    }
  }, [
    verifyAnnounceMutation.isSuccess,
    rejectAnnounceMutation.isSuccess,
    updateAnnounMutation.isSuccess,
    refetchInprogress,
    refetchChecked,
    verifyAnnounceMutation,
    rejectAnnounceMutation,
    updateAnnounMutation
  ]);

  const inprogressTableData =
    inprogressData?.inprogress
      ?.filter((item: any) => !item.reject) 
      .map((item: any, idx: number) => ({
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
                setSelectedAnnounce(item);
                setEditForm(item);
                setEditModalOpen(true);
              }}
              className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded"
            >
              بررسی
            </button>
            <button
              onClick={async () => {
                const result = await Swal.fire({
                  title: "آیا مطمئن هستید؟",
                  text: "آیا از رد کردن این مورد مطمئن هستید؟",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonText: "بله، رد کن",
                  cancelButtonText: "انصراف",
                  confirmButtonColor: "#d33",
                  cancelButtonColor: "#3085d6",
                });
                if (result.isConfirmed) {
                  rejectAnnounceMutation.mutate(item);
                }
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
      "شماره تماس": item.userID,
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
          className={`px-4 py-2 rounded-t-md border-b-2 transition-all ${"border-yellow-500 bg-yellow-100 font-bold text-yellow-700"
            }`}
        >
          در حال بررسی ({inprogressTableData.length})
        </button>
      </div>

      {/* Modal for editing */}
      {editModalOpen && selectedAnnounce && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
            <button
              className="absolute left-2 top-2 text-gray-500 hover:text-gray-700"
              onClick={() => setEditModalOpen(false)}
            >
              ×
            </button>
            <h2 className="font-bold mb-4 text-lg">ویرایش ملک</h2>
            <form
              onSubmit={e => {
                e.preventDefault();
                updateAnnounMutation.mutate(editForm);
              }}
              className="space-y-3"
            >
              <div>
                <label className="block text-sm mb-1">نام مالک</label>
                <input
                  className="border rounded px-2 py-1 w-full"
                  value={editForm.full_name || ""}
                  onChange={e => setEditForm({ ...editForm, full_name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">شماره تماس</label>
                <input
                  className="border rounded px-2 py-1 w-full"
                  value={editForm.userID || ""}
                  onChange={e => setEditForm({ ...editForm, userID: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">نوع ملک</label>
                <input
                  className="border rounded px-2 py-1 w-full"
                  value={editForm.type || ""}
                  onChange={e => setEditForm({ ...editForm, type: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">منطقه</label>
                <input
                  className="border rounded px-2 py-1 w-full"
                  value={editForm.region || ""}
                  onChange={e => setEditForm({ ...editForm, region: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">قیمت</label>
                <input
                  type="number"
                  className="border rounded px-2 py-1 w-full"
                  value={editForm.price || ""}
                  onChange={e => setEditForm({ ...editForm, price: Number(e.target.value) })}
                />
              </div>

              <div>
                <label className="block text-sm mb-1">کد ملک</label>
                <input
                  type="text"
                  className="border rounded px-2 py-1 w-full"
                  value={editForm.state_code || ""}
                  onChange={e => setEditForm({ ...editForm, state_code: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">کد ملک</label>
                <input
                  type="text"
                  className="border rounded px-2 py-1 w-full"
                  value={editForm.tour3dlink || ""}
                  onChange={e => setEditForm({ ...editForm, tour3dlink: e.target.value })}
                />
              </div>
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full mt-4"
                disabled={updateAnnounMutation.isLoading}
              >
                {updateAnnounMutation.isLoading ? "در حال ذخیره..." : "ذخیره تغییرات"}
              </button>
            </form>
          </div>
        </div>
      )}

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
