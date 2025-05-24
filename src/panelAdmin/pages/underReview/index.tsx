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
import UseDeletePhotosMutation from "../../../hooks/mutation/deletePhotos/UseDeletePhotosMutation";
import UseUploadFileMutation from "../../../hooks/mutation/announce/UseUploadFileMutation";
import axios from "axios";

const UnderReview = () => {
  UseDeletePhotosMutation()
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
  const deletePhotosMutation = UseDeletePhotosMutation();
  const uploadFileMutation = UseUploadFileMutation();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedAnnounce, setSelectedAnnounce] = useState<any>(null);
  const [editForm, setEditForm] = useState<any>({});
  const [activeTab, setActiveTab] = useState<"inprogress" | "confirmed">("inprogress");

  const [modalPhotos, setModalPhotos] = useState<string[]>([]);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  const {
    data: confirmedData,
    isLoading: isLoadingConfirmed,
    isError: isErrorConfirmed,
    refetch: refetchConfirmed,
  } = UseConfirmedAnnounceQuery();

  const fetchAnnouncePhotos = async (uid: string) => {
    try {
      const res = await axios.get(`http://185.231.115.236:3000/api/V1/announce/getPhotos?Uid=${uid}`);
      return Array.isArray(res.data.photos) ? res.data.photos : [];
    } catch {
      return [];
    }
  };

  const handleOpenEditModal = async (item: any) => {
    setSelectedAnnounce(item);
    setEditForm({
      ...item,
      price: item.price ?? "",
      loan: item.loan ?? "",
      metrage: item.land_metrage ?? "",
    });
    let photos: string[] = [];
    if (item.Uid) {
      photos = await fetchAnnouncePhotos(item.Uid);
    }
    setModalPhotos(photos.length > 0 ? photos : (Array.isArray(item.photo) ? item.photo : (item.photo ? [item.photo] : [])));
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
        "ردیف": (
          <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-yellow-200 text-yellow-900 font-bold flex items-center justify-center shadow">
            {idx + 1}
          </span>
        ),
        "کد ملک": (
          <span className="font-mono text-blue-700 text-base">{item.Uid}</span>
        ),
        "نوع ملک": (
          <span className="text-gray-700">{item.usage}</span>
        ),
        "محله مورد نظر": (
          <span className="text-gray-600">{item.region}</span>
        ),
        "نام مالک": (
          <span className="font-bold text-gray-800">{item.full_name}</span>
        ),
        "شماره تماس": (
          <span className="text-gray-500">{item.userID}</span>
        ),
        "وضعیت": (
          <span className="text-yellow-600 font-bold whitespace-nowrap bg-yellow-100 px-2 py-1 rounded shadow-sm border border-yellow-200">
            در حال بررسی
          </span>
        ),
        "بازه قیمت": (
          <span className="text-green-700 font-bold">
            {item.price?.toLocaleString()} <span className="text-xs text-gray-400">تومان</span>
          </span>
        ),
        "عملیات": (
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => handleOpenEditModal(item)}
              className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white text-xs px-4 py-1 rounded-full font-bold shadow transition-all duration-150"
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
              className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white text-xs px-4 py-1 rounded-full font-bold shadow transition-all duration-150"
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
        "ردیف": (
          <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-green-400 to-green-200 text-green-900 font-bold flex items-center justify-center shadow">
            {idx + 1}
          </span>
        ),
        "کد ملک": (
          <span className="font-mono text-blue-700 text-base">{item.Uid}</span>
        ),
        "نوع ملک": (
          <span className="text-gray-700">{item.usage}</span>
        ),
        "محله مورد نظر": (
          <span className="text-gray-600">{item.region}</span>
        ),
        "نام مالک": (
          <span className="font-bold text-gray-800">{item.full_name}</span>
        ),
        "شماره تماس": (
          <span className="text-gray-500">{item.userID}</span>
        ),
        "وضعیت": (
          <span className="text-green-600 font-bold whitespace-nowrap bg-green-100 px-2 py-1 rounded shadow-sm border border-green-200">
            بررسی شده
          </span>
        ),
        "بازه قیمت": (
          <span className="text-green-700 font-bold">
            {item.price?.toLocaleString()} <span className="text-xs text-gray-400">تومان</span>
          </span>
        ),
        "عملیات": (
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => handleOpenEditModal(item)}
              className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white text-xs px-4 py-1 rounded-full font-bold shadow transition-all duration-150"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-all duration-300">
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-green-200 p-4 sm:p-8 w-full max-w-full sm:max-w-2xl lg:max-w-4xl mx-2 sm:mx-8 relative z-[9999] overflow-y-auto max-h-[90vh] animate-fade-in">
            <button
              className="absolute left-4 top-4 text-gray-400 hover:text-red-500 text-3xl font-extrabold transition-all duration-200"
              onClick={() => setEditModalOpen(false)}
              aria-label="بستن"
              type="button"
            >
              ×
            </button>
            <h2 className="font-extrabold mb-6 text-2xl text-green-700 border-b-2 border-green-100 pb-2 flex items-center gap-2">
              <svg className="w-7 h-7 text-green-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13h3v3m-7.071-7.071a9 9 0 1112.728 0 9 9 0 01-12.728 0z" /></svg>
              ویرایش ملک
            </h2>
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
                  photo: modalPhotos, // اضافه کردن عکس‌های جدید به آگهی
                });
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6">
              <div>
                <label className="block text-sm mb-1 font-bold text-gray-700">نوع ملک</label>
                <select
                  className="border rounded px-2 py-1 w-full"
                  value={editForm.usage || ""}
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
                <label className="block text-sm mb-1 font-bold text-gray-700">محله مورد نظر</label>
                <input
                  className="border rounded px-2 py-1 w-full"
                  value={editForm.region || ""}
                  onChange={e => setEditForm({ ...editForm, region: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1 font-bold text-gray-700">آدرس ملک</label>
                <input
                  className="border rounded px-2 py-1 w-full"
                  value={editForm.address || ""}
                  onChange={e => setEditForm({ ...editForm, address: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1 font-bold text-gray-700">طبقه مورد نظر</label>
                <input
                  type="number"
                  className="border rounded px-2 py-1 w-full"
                  value={editForm.floor_number !== undefined && editForm.floor_number !== null ? editForm.floor_number : ""}
                  onChange={e => setEditForm({ ...editForm, floor_number: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1 font-bold text-gray-700">تعداد طبقات</label>
                <input
                  type="number"
                  className="border rounded px-2 py-1 w-full"
                  value={editForm.floor !== undefined && editForm.floor !== null ? editForm.floor : ""}
                  onChange={e => setEditForm({ ...editForm, floor: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1 font-bold text-gray-700">تعداد واحد در طبقه</label>
                <input
                  type="number"
                  className="border rounded px-2 py-1 w-full"
                  value={editForm.Unit_in_floor !== undefined && editForm.Unit_in_floor !== null ? editForm.Unit_in_floor : ""}
                  onChange={e => setEditForm({ ...editForm, Unit_in_floor: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1 font-bold text-gray-700">تعداد اتاق‌ها</label>
                <input
                  type="number"
                  className="border rounded px-2 py-1 w-full"
                  value={editForm.room_number !== undefined && editForm.room_number !== null ? editForm.room_number : ""}
                  onChange={e => setEditForm({ ...editForm, room_number: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1 font-bold text-gray-700">نوع سند</label>
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
                <label className="block text-sm mb-1 font-bold text-gray-700">متراژ کل زمین</label>
                <input
                  type="number"
                  className="border rounded px-2 py-1 w-full"
                  value={editForm.land_metrage !== undefined && editForm.land_metrage !== null ? editForm.land_metrage : ""}
                  onChange={e => setEditForm({ ...editForm, land_metrage: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1 font-bold text-gray-700">متراژ مفید</label>
                <input
                  type="number"
                  className="border rounded px-2 py-1 w-full"
                  value={editForm.useful_metrage !== undefined && editForm.useful_metrage !== null ? editForm.useful_metrage : ""}
                  onChange={e => setEditForm({ ...editForm, useful_metrage: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1 font-bold text-gray-700">موقعیت ملک</label>
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
                <label className="block text-sm mb-1 font-bold text-gray-700">سال ساخت</label>
                <input
                  type="number"
                  className="border rounded px-2 py-1 w-full"
                  value={editForm.year_of_build !== undefined && editForm.year_of_build !== null ? editForm.year_of_build : ""}
                  onChange={e => setEditForm({ ...editForm, year_of_build: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1 font-bold text-gray-700">وام</label>
                <input
                  type="number"
                  className="border rounded px-2 py-1 w-full"
                  value={editForm.loan !== undefined && editForm.loan !== null ? editForm.loan : ""}
                  onChange={e => setEditForm({ ...editForm, loan: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1 font-bold text-gray-700">قیمت</label>
                <input
                  type="number"
                  className="border rounded px-2 py-1 w-full"
                  value={editForm.price !== undefined && editForm.price !== null ? editForm.price : ""}
                  onChange={e => setEditForm({ ...editForm, price: Number(e.target.value) })}
                />
              </div>
              <div className="sm:col-span-2 lg:col-span-3">
                <label className="block text-sm mb-1 font-bold text-gray-700">امکانات</label>
                <textarea
                  className="border rounded px-2 py-1 w-full"
                  value={editForm.features || ""}
                  onChange={e => setEditForm({ ...editForm, features: e.target.value })}
                />
              </div>
              <div className="sm:col-span-2 lg:col-span-3">
                <label className="block text-sm mb-1 font-bold text-gray-700">توضیحات</label>
                <textarea
                  className="border rounded px-2 py-1 w-full"
                  value={editForm.description || ""}
                  onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                />
              </div>
              <div className="sm:col-span-2 lg:col-span-3">
                <label className="block text-sm mb-2 font-bold text-gray-700">تصاویر ملک</label>
                <div className="flex flex-wrap gap-4">
                  {modalPhotos.length > 0 ? (
                    modalPhotos.map((img: string, idx: number) => (
                      <div key={idx} className="relative w-32 h-24 border rounded overflow-hidden shadow">
                        <img
                          src={img}
                          alt={`estate-photo-${idx}`}
                          className="object-cover w-full h-full"
                        />
                        <button
                          type="button"
                          className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-700"
                          title="حذف تصویر"
                          disabled={deletePhotosMutation.isLoading}
                          onClick={async () => {
                            if (!selectedAnnounce.Uid) {
                              console.error("Uid is missing for the selected announce.");
                              return;
                            }
                            try {
                              await deletePhotosMutation.mutateAsync({ uid: selectedAnnounce.Uid });
                              setModalPhotos(prev => prev.filter((p: string) => p !== img));
                            } catch (error) {
                              console.error("Error deleting photo:", error);
                            }
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))
                  ) : (
                    <span className="text-gray-400">تصویری وجود ندارد</span>
                  )}
                </div>
                {/* آپلود عکس جدید */}
                <div className="mt-4 flex items-center gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    id="modal-photo-upload"
                    style={{ display: "none" }}
                    disabled={
                      uploadingPhoto ||
                      !selectedAnnounce?.Uid ||
                      modalPhotos.length >= 10 // فقط اگر کمتر از ۱۰ تا عکس باشد اجازه آپلود بده
                    }
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file || !selectedAnnounce?.Uid) return;
                      if (modalPhotos.length >= 10) {
                        Swal.fire({
                          title: "خطا",
                          text: "حداکثر 10 تصویر قابل آپلود است.",
                          icon: "error",
                          confirmButtonText: "باشه",
                        });
                        e.target.value = "";
                        return;
                      }
                      setUploadingPhoto(true);
                      try {
                        await uploadFileMutation.mutateAsync({ file, uid: selectedAnnounce.Uid });
                        setModalPhotos(prev => [...prev, URL.createObjectURL(file)]);
                        Swal.fire({
                          title: "موفق!",
                          text: "عکس با موفقیت آپلود شد.",
                          icon: "success",
                          confirmButtonText: "باشه",
                        });
                      } catch (err) {
                        Swal.fire({
                          title: "خطا",
                          text: "خطایی هنگام آپلود عکس رخ داد.",
                          icon: "error",
                          confirmButtonText: "باشه",
                        });
                      }
                      setUploadingPhoto(false);
                      e.target.value = "";
                    }}
                  />
                  <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow disabled:opacity-50"
                    disabled={
                      uploadingPhoto ||
                      !selectedAnnounce?.Uid ||
                      modalPhotos.length >= 10 // فقط اگر کمتر از ۱۰ تا عکس باشد اجازه آپلود بده
                    }
                    onClick={() => {
                      if (modalPhotos.length >= 10) {
                        Swal.fire({
                          title: "خطا",
                          text: "حداکثر 10 تصویر قابل آپلود است.",
                          icon: "error",
                          confirmButtonText: "باشه",
                        });
                        return;
                      }
                      document.getElementById("modal-photo-upload")?.click();
                    }}
                  >
                    {uploadingPhoto ? "در حال آپلود..." : "افزودن عکس جدید"}
                  </button>
                  <span className="text-xs text-gray-500">{modalPhotos.length}/10</span>
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1 font-bold text-gray-700">نام مالک</label>
                <input
                  className="border rounded px-2 py-1 w-full"
                  value={editForm.full_name || ""}
                  onChange={e => setEditForm({ ...editForm, full_name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm mb-1 font-bold text-gray-700">شماره تماس</label>
                <input
                  className="border rounded px-2 py-1 w-full"
                  value={editForm.userID || ""}
                  onChange={e => setEditForm({ ...editForm, userID: e.target.value })}
                />
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-6 py-3 rounded-xl w-full mt-4 sm:col-span-2 lg:col-span-3 font-extrabold text-lg shadow-lg transition-all duration-200"
                disabled={updateAnnounMutation.isLoading}
              >
                {updateAnnounMutation.isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                    در حال ذخیره...
                  </span>
                ) : "ذخیره تغییرات"}
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
