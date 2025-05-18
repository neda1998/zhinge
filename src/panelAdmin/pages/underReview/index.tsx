import { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import UseConfirmedAnnounceQuery from "../../../hooks/queries/admin/confirmedAnnounce/UseConfirmedAnnounceQuery";

const UnderReview = () => {
  const navigate = useNavigate();
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
  const updateAnnounMutation = UseUpdateAnnounMutation();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedAnnounce, setSelectedAnnounce] = useState<any>(null);
  const [editForm, setEditForm] = useState<any>({});
  const [activeTab, setActiveTab] = useState<"inprogress" | "confirmed">("inprogress");

  const {
    data: confirmedData,
    isLoading: isLoadingConfirmed,
    isError: isErrorConfirmed,
    refetch: refetchConfirmed,
  } = UseConfirmedAnnounceQuery();

  const handleOpenEditModal = (item: any) => {
    setSelectedAnnounce(item);
    setEditForm({
      ...item,
      price: item.price ?? "",
      loan: item.loan ?? "",
      metrage: item.land_metrage ?? "",
    });
    setEditModalOpen(true);
  };

  useEffect(() => {
    if (updateAnnounMutation.isSuccess && selectedAnnounce?.Uid) {
      navigate(`/house-details/${selectedAnnounce.Uid}`);
      updateAnnounMutation.reset();
      setEditModalOpen(false);
      setSelectedAnnounce(null);
      return;
    }
    if (verifyAnnounceMutation.isSuccess || rejectAnnounceMutation.isSuccess) {
      refetchInprogress().then(res => {
        console.log("inprogress after update:", res?.data);
      });
      refetchChecked().then(res => {
        console.log("checked after update:", res?.data);
      });
      verifyAnnounceMutation.reset();
      rejectAnnounceMutation.reset();
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
    updateAnnounMutation,
    navigate,
    selectedAnnounce
  ]);

  const inprogressTableData =
    inprogressData?.inprogress
      ?.filter((item: any) => !item.reject)
      .slice()
      .reverse()
      .map((item: any, idx: number) => ({
        "ردیف": idx + 1,
        "کد ملک": item.id,
        "نوع ملک": item.type,
        "منطقه": item.region,
        "نام مالک": item.full_name,
        "شماره تماس": item.userID,
        "وضعیت": (
          <span className="text-yellow-600 font-bold whitespace-nowrap">در حال بررسی</span>
        ),
        "بازه قیمت": (
          <span>
            {item.price?.toLocaleString()} تومان
          </span>
        ),
        "عملیات": (
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => handleOpenEditModal(item)}
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

  const confirmedTableData =
    confirmedData?.confirmed
      ?.slice()
      .reverse()
      .map((item: any, idx: number) => ({
        "ردیف": idx + 1,
        "کد ملک": item.id,
        "نوع ملک": item.type,
        "منطقه": item.region,
        "نام مالک": item.full_name,
        "شماره تماس": item.userID,
        "وضعیت": (
          <span className="text-green-600 font-bold whitespace-nowrap">بررسی شده</span>
        ),
        "بازه قیمت": (
          <span>
            {item.price?.toLocaleString()} تومان
          </span>
        ),
        "عملیات": (
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => handleOpenEditModal(item)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded"
            >
              مشاهده/ویرایش
            </button>
          </div>
        ),
      })) || [];

  let tableData: any[] = activeTab === "inprogress" ? inprogressTableData : confirmedTableData;
  const isLoading =
    (activeTab === "inprogress" ? (isLoadingProgress || isLoadingChecked) : isLoadingConfirmed);
  const isError =
    (activeTab === "inprogress" ? (isErrorProgress || isErrorChecked) : isErrorConfirmed);

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
            activeTab === "confirmed"
              ? "border-green-500 bg-green-100 font-bold text-green-700"
              : "border-transparent bg-gray-100 text-gray-600"
          }`}
          onClick={() => setActiveTab("confirmed")}
        >
          بررسی شده‌ها ({confirmedTableData.length})
        </button>
      </div>
      <div className="mb-2 text-sm text-gray-600">
        تعداد کل: <span className="font-bold">{tableData.length}</span>
      </div>
      {editModalOpen && selectedAnnounce && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-full sm:max-w-2xl lg:max-w-4xl mx-2 sm:mx-8 relative z-[9999] overflow-y-auto max-h-[90vh]">
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
                if (!selectedAnnounce?.Uid) {
                  Swal.fire({
                    icon: "error",
                    title: "خطا",
                    text: "شناسه ملک (Uid) یافت نشد!",
                  });
                  return;
                }
                updateAnnounMutation.mutate({
                  Uid: selectedAnnounce.Uid,
                  type: editForm.type,
                  address: editForm.address,
                  location: editForm.location,
                  usage: editForm.usage,
                  document_type: editForm.document_type,
                  land_metrage: editForm.metrage,
                  useful_metrage: editForm.useful_metrage,
                  floor_number: editForm.floor_number,
                  floor: editForm.floor,
                  Unit_in_floor: editForm.Unit_in_floor,
                  year_of_build: editForm.year_of_build,
                  full_name: editForm.full_name,
                  price: editForm.price,
                  room_number: editForm.room_number,
                  features: editForm.features,
                  phone: editForm.userID,
                  description: editForm.description,
                  tour3dlink: editForm.tour3dlink,
                  tour3dRequest: editForm.tour3dRequest,
                  loan: editForm.loan,
                  region: editForm.region,
                  lowest_price: editForm.lowest_price,
                  highest_price: editForm.highest_price,
                });
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-2 lg:gap-y-7 gap-y-4">
              <div>
                <label className="block text-sm mb-1">نوع ملک</label>
                <select
                  className="border rounded px-2 py-1 w-full"
                  value={editForm.type || ""}
                  onChange={e => setEditForm({ ...editForm, type: e.target.value })}
                >
                  <option value="آپارتمان">آپارتمان</option>
                  <option value="ویلایی">ویلایی</option>
                  <option value="زمین">زمین</option>
                  <option value="مغازه">مغازه</option>
                  <option value="زمین مسکونی">زمین مسکونی</option>
                  <option value="زمین کشاورزی">زمین کشاورزی</option>
                  <option value="سایر">سایر</option>
                </select>
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
                <label className="block text-sm mb-1">آدرس ملک</label>
                <input
                  className="border rounded px-2 py-1 w-full"
                  value={editForm.address || ""}
                  onChange={e => setEditForm({ ...editForm, address: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">طبقه مورد نظر</label>
                <input
                  type="number"
                  className="border rounded px-2 py-1 w-full"
                  value={editForm.floor_number || ""}
                  onChange={e => setEditForm({ ...editForm, floor_number: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">تعداد طبقات</label>
                <input
                  type="number"
                  className="border rounded px-2 py-1 w-full"
                  value={editForm.floor || ""}
                  onChange={e => setEditForm({ ...editForm, floor: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">تعداد واحد در طبقه</label>
                <input
                  type="number"
                  className="border rounded px-2 py-1 w-full"
                  value={editForm.Unit_in_floor || ""}
                  onChange={e => setEditForm({ ...editForm, Unit_in_floor: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">تعداد اتاق‌ها</label>
                <input
                  type="number"
                  className="border rounded px-2 py-1 w-full"
                  value={editForm.room_number || ""}
                  onChange={e => setEditForm({ ...editForm, room_number: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">نوع سند</label>
                <select
                  className="border rounded px-2 py-1 w-full"
                  value={editForm.document_type || ""}
                  onChange={e => setEditForm({ ...editForm, document_type: e.target.value })}
                >
                  <option value="رسمی">رسمی</option>
                  <option value="قولنامه‌ای">قولنامه‌ای</option>
                  <option value="مشاع">مشاع</option>
                  <option value="سند تک برگ">سند تک برگ</option>
                  options={["سند تک برگ", "سند واگذاری", "مبایعه نامه (قولنامه‌ای)", "نسق", "اوقافی", "سایر"]}
                  <option value="مبایعه نامه">مبایعه نامه</option>
                  <option value="نسق">نسق</option>
                  <option value="اوقافی">اوقافی</option>
                  <option value="سایر">سایر</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1">متراژ کل زمین</label>
                <input
                  type="number"
                  className="border rounded px-2 py-1 w-full"
                  value={editForm.land_metrage || ""}
                  onChange={e => setEditForm({ ...editForm, land_metrage: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">متراژ مفید</label>
                <input
                  type="number"
                  className="border rounded px-2 py-1 w-full"
                  value={editForm.useful_metrage || ""}
                  onChange={e => setEditForm({ ...editForm, useful_metrage: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">موقعیت ملک</label>
                <select
                  className="border rounded px-2 py-1 w-full"
                  value={editForm.location || ""}
                  onChange={e => setEditForm({ ...editForm, location: e.target.value })}
                >
                  <option value="شمالی">شمالی</option>
                  <option value="جنوبی">جنوبی</option>
                  <option value="دوکله">دوکله</option>
                  <option value="شمالی دو نبش">شمالی دو نبش</option>
                  <option value="جنوبی دو نبش">جنوبی دو نبش</option>
                  <option value="سه نبش">سه نبش</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1">سال ساخت</label>
                <input
                  type="number"
                  className="border rounded px-2 py-1 w-full"
                  value={editForm.year_of_build || ""}
                  onChange={e => setEditForm({ ...editForm, year_of_build: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">وام</label>
                <input
                  type="number"
                  className="border rounded px-2 py-1 w-full"
                  value={editForm.loan !== undefined && editForm.loan !== null ? editForm.loan : ""}
                  onChange={e => setEditForm({ ...editForm, loan: Number(e.target.value) })}
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
              <div className="sm:col-span-2 lg:col-span-3">
                <label className="block text-sm mb-1">امکانات</label>
                <textarea
                  className="border rounded px-2 py-1 w-full"
                  value={editForm.features || ""}
                  onChange={e => setEditForm({ ...editForm, features: e.target.value })}
                />
              </div>
              <div className="sm:col-span-2 lg:col-span-3">
                <label className="block text-sm mb-1">توضیحات</label>
                <textarea
                  className="border rounded px-2 py-1 w-full"
                  value={editForm.description || ""}
                  onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                />
              </div>
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
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full mt-4 sm:col-span-2 lg:col-span-3"
                disabled={updateAnnounMutation.isLoading}
              >
                {updateAnnounMutation.isLoading ? "در حال ذخیره..." : "ذخیره تغییرات"}
              </button>
            </div>
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
