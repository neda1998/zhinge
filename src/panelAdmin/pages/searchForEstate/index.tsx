import RouteChevron from "../../../components/common/RouteChevron"
import InputState from "../../../components/ui/atoms/input/inputState"
import { pageSearchForEstate } from "../../../utils/data"
import InitialLayout from "../../dashboard/initialLayoutAdmin"
import ChooseItemsOfState from "../propertyManagement/ChooseItemsOfState"
import UseSearchStateMutation from "../../../hooks/mutation/searchState/UseSearchStateMutation"
import UseUpdateAnnounMutation from "../../../hooks/mutation/updateAnnounAdmin/UseUpdateAnnounMutation"
import { useState, useRef } from "react"

const SearchForEstate = () => {
  const [form, setForm] = useState<any>({});
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [detailsModal, setDetailsModal] = useState<{ open: boolean; data: any | null }>({ open: false, data: null });
  const [editModal, setEditModal] = useState<{ open: boolean; data: any | null }>({ open: false, data: null });
  const [editForm, setEditForm] = useState<any>({});
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const cleanForm = (formData: any) => {
    const cleaned: any = {};
    Object.keys(formData).forEach((key) => {
      const value = formData[key];
      if (value !== undefined && value !== null && value !== "") {
        cleaned[key] = value;
      }
    });
    return cleaned;
  };

  const handleChange = (label: string, value: any) => {
    const updatedForm = { ...form, [label]: value };
    setForm(updatedForm);
    triggerSearch(updatedForm);
  };
  
  const searchMutation = UseSearchStateMutation({
    onSuccess: (response: any) => {
      let resultArr: any[] = [];
      if (Array.isArray(response)) {
        resultArr = response;
      } else if (response?.data && Array.isArray(response.data)) {
        resultArr = response.data;
      } else if (response?.data && typeof response.data === "object") {
        resultArr = [response.data];
      } else if (typeof response === "object") {
        resultArr = [response];
      }
      setResults(resultArr);
      setIsSearching(false);
    },
    onError: () => {
      setIsSearching(false);
    }
  });

  const updateMutation = UseUpdateAnnounMutation();

  const triggerSearch = (payload: any) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const cleaned = cleanForm(payload);
      if (Object.keys(cleaned).length === 0) return;
      setIsSearching(true);
      searchMutation.mutate(cleaned);
    }, 400);
  };

  const handleEditClick = (estate: any) => {
    setEditForm({ ...estate });
    setEditModal({ open: true, data: estate });
  };

  const handleEditFormChange = (key: string, value: any) => {
    setEditForm((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleEditSave = () => {
    updateMutation.mutate(editForm, {
      onSuccess: () => { 
        setResults((prev) =>
          prev.map((item) => (item.Uid === editForm.Uid ? { ...item, ...editForm } : item))
        );
        setEditModal({ open: false, data: null });
      },
    });
  };

  const DetailsModal = ({ open, data, onClose }: { open: boolean; data: any; onClose: () => void }) => {
    if (!open || !data) return null;
    const detailIcons: Record<string, React.ReactNode> = {
      "کد ملک": <span className="text-blue-500">🏷️</span>,
      "نام مالک": <span className="text-green-600">👤</span>,
      "شماره تماس": <span className="text-purple-500">📱</span>,
      "نوع ملک": <span className="text-orange-500">🏠</span>,
      "منطقه": <span className="text-pink-500">📍</span>,
      "آدرس": <span className="text-gray-500">🗺️</span>,
      "متراژ زمین": <span className="text-blue-400">📏</span>,
      "متراژ مفید": <span className="text-blue-400">📐</span>,
      "سال ساخت": <span className="text-yellow-600">📅</span>,
      "تعداد طبقات": <span className="text-indigo-500">🏢</span>,
      "طبقه": <span className="text-indigo-400">⬆️</span>,
      "واحد در طبقه": <span className="text-indigo-300">🔢</span>,
      "تعداد اتاق": <span className="text-pink-400">🛏️</span>,
      "نوع سند": <span className="text-green-500">📄</span>,
      "قیمت": <span className="text-red-500">💰</span>,
      "امکانات": <span className="text-blue-600">✨</span>,
      "موقعیت مکانی": <span className="text-blue-700">🧭</span>,
      "وضعیت": <span className="text-gray-700">🔖</span>,
    };
    const details: Array<{ label: string, value?: any }> = [
      { label: "کد ملک",        value: data.Uid || "-" },
      { label: "نام مالک",      value: data.full_name || "-" },
      { label: "شماره تماس",    value: data.userID || data.phone || "-" },
      { label: "نوع ملک",      value: data.usage || "-" },
      { label: "منطقه",        value: data.region || "-" },
      { label: "آدرس",         value: data.address || "-" },
      { label: "متراژ زمین",    value: data.land_metrage || "-" },
      { label: "متراژ مفید",    value: data.useful_metrage || "-" },
      { label: "سال ساخت",      value: data.year_of_build || "-" },
      { label: "تعداد طبقات",   value: data.floor_number || "-" },
      { label: "طبقه",          value: data.floor || "-" },
      { label: "واحد در طبقه",  value: data.Unit_in_floor || "-" },
      { label: "تعداد اتاق",    value: data.room_number || "-" },
      { label: "نوع سند",       value: data.document_type || "-" },
      { label: "قیمت",          value: data.price ? data.price.toLocaleString() + " تومان" : "-" },
      { label: "امکانات",      value: data.features || "-" },
      { label: "موقعیت مکانی", value: data.location || "-" },
      { label: "وضعیت",        value: data.check ? "تایید شده" : data.reject ? "رد شده" : "در حال بررسی" },
    ];

    const mainPhoto =
      Array.isArray(data.photo) && data.photo.length > 0
        ? data.photo[0]
        : (typeof data.photo === "string" && data.photo)
          ? data.photo
          : "https://via.placeholder.com/400x300?text=No+Image";

    const mid = Math.ceil(details.length / 2);
    const col1 = details.slice(0, mid);
    const col2 = details.slice(mid);

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4">
        <div className="bg-gradient-to-br from-white via-blue-50 to-green-50 rounded-3xl shadow-2xl max-w-3xl w-full relative overflow-y-auto max-h-[95vh] border border-gray-200 flex flex-col animate-fadeIn">
          <button
            className="absolute top-4 left-4 text-gray-400 hover:text-red-500 transition text-3xl"
            onClick={onClose}
            aria-label="بستن"
            style={{ fontWeight: 'bold', lineHeight: 1 }}
          >
            ×
          </button>
          <div className="flex flex-col md:flex-row items-center justify-center pt-8 gap-10">
            {/* عکس ملک */}
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-tr from-green-100 to-blue-100">
                <img
                  src={mainPhoto}
                  alt="عکس ملک"
                  className="object-cover w-[340px] h-[260px] transition-transform duration-300 hover:scale-105"
                  style={{ background: "#f3f4f6" }}
                />
              </div>
              <div className="mt-4 text-center text-blue-700 font-extrabold text-xl drop-shadow">
                {data.usage || "نوع ملک"}
              </div>
            </div>
            <div className="flex-1 w-full px-2">
              <h2 className="font-extrabold text-3xl mb-6 text-gray-700 text-center tracking-wide drop-shadow">
                <span className="inline-block bg-gradient-to-l from-green-400 to-blue-400 bg-clip-text text-transparent">
                  جزئیات ملک
                </span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                <div className="flex flex-col gap-4">
                  {col1.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center bg-gradient-to-br from-white to-blue-50 rounded-2xl p-4 border border-gray-100 shadow transition hover:shadow-2xl hover:scale-[1.03]"
                    >
                      <span className="mr-2 text-2xl">{detailIcons[item.label] || "ℹ️"}</span>
                      <div className="flex flex-col">
                        <span className="text-gray-500 text-[14px] mb-1 font-semibold">{item.label}</span>
                        <span className="font-extrabold text-gray-800 text-[17px]">{item.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-4">
                  {col2.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center bg-gradient-to-br from-white to-blue-50 rounded-2xl p-4 border border-gray-100 shadow transition hover:shadow-2xl hover:scale-[1.03]"
                    >
                      <span className="mr-2 text-2xl">{detailIcons[item.label] || "ℹ️"}</span>
                      <div className="flex flex-col">
                        <span className="text-gray-500 text-[14px] mb-1 font-semibold">{item.label}</span>
                        <span className="font-extrabold text-gray-800 text-[17px]">{item.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center pb-8 mt-8">
            <button
              onClick={onClose}
              className="mt-4 px-12 py-3 rounded-full bg-gradient-to-l from-green-400 to-blue-400 text-white font-extrabold shadow-xl hover:scale-105 transition text-lg"
            >
              بستن
            </button>
          </div>
        </div>
      </div>
    );
  };

  const EditEstateModal = ({ open, data, onClose }: { open: boolean; data: any; onClose: () => void }) => {
    if (!open || !data) return null;
    const TYPE_OPTIONS = [
      "آپارتمان",
      "ویلایی",
      "مغازه",
      "زمین مسکونی",
      "زمین کشاورزی",
      "سایر"
    ];
    const REGION_OPTIONS = [
      "منطقه 1", "منطقه 2", "منطقه 3", "منطقه 4"
    ];
    const LOCATION_OPTIONS = [
      "شمالی",
      "جنوبی",
      "شمالی دو نبش",
      "جنوبی دو نبش",
      "دوکله",
      "سه نبش"
    ];
    const DOCUMENT_TYPE_OPTIONS = [
      "سند تک برگ",
      "سند واگذاری",
      "مبایعه نامه (قولنامه‌ای)",
      "نسق",
      "اوقافی",
      "سایر"
    ];
    const fields: Array<{ key: string; label: string; type?: string; options?: string[] }> = [
      { key: "Uid", label: "کد ملک" },
      { key: "full_name", label: "نام مالک" },
      { key: "userID", label: "شماره تماس" },
      { key: "usage", label: "نوع ملک", options: TYPE_OPTIONS },
      { key: "region", label: "منطقه", options: REGION_OPTIONS },
      { key: "address", label: "آدرس" },
      { key: "land_metrage", label: "متراژ زمین", type: "number" },
      { key: "useful_metrage", label: "متراژ مفید", type: "number" },
      { key: "year_of_build", label: "سال ساخت", type: "number" },
      { key: "floor_number", label: "تعداد طبقات", type: "number" },
      { key: "floor", label: "طبقه", type: "number" },
      { key: "Unit_in_floor", label: "واحد در طبقه", type: "number" },
      { key: "room_number", label: "تعداد اتاق", type: "number" },
      { key: "document_type", label: "نوع سند", options: DOCUMENT_TYPE_OPTIONS },
      { key: "price", label: "قیمت", type: "number" },
      { key: "features", label: "امکانات" },
      { key: "location", label: "موقعیت مکانی", options: LOCATION_OPTIONS },
    ];
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-[3px] p-4">
        <div className="bg-white/95 rounded-3xl shadow-2xl max-w-2xl w-full relative overflow-y-auto max-h-[95vh] border border-gray-200 flex flex-col animate-fadeIn">
          <button
            className="absolute top-4 left-4 text-gray-400 hover:text-red-500 transition text-3xl"
            onClick={onClose}
            aria-label="بستن"
            style={{ fontWeight: 'bold', lineHeight: 1 }}
          >
            ×
          </button>
          <div className="flex flex-col items-center justify-center pt-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-400 to-green-400 flex items-center justify-center shadow-lg mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.343 17.657l-1.414 1.414m12.728 0l-1.414-1.414M6.343 6.343L4.929 4.929" />
              </svg>
            </div>
            <h2 className="font-extrabold text-3xl mb-4 text-gray-700 text-center tracking-wide">
              <span className="inline-block bg-gradient-to-l from-blue-400 to-green-400 bg-clip-text text-transparent">
                ویرایش ملک
              </span>
            </h2>
          </div>
          <div className="px-8 py-6 w-full">
            <div className="grid gap-x-8 gap-y-5 grid-cols-1 sm:grid-cols-2">
              {fields.map((item, idx) => (
                <div key={idx} className="flex flex-col mb-1">
                  <label className="text-gray-500 text-[13px] mb-1">{item.label}</label>
                  {item.options ? (
                    <select
                      className="font-bold text-gray-800 text-[16px] rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                      value={editForm[item.key] ?? ""}
                      onChange={e => handleEditFormChange(item.key, e.target.value)}
                    >
                      <option value="">انتخاب کنید</option>
                      {item.options
                        .concat(
                          editForm[item.key] && !item.options.includes(editForm[item.key])
                            ? [editForm[item.key]]
                            : []
                        )
                        .filter((v, i, arr) => arr.indexOf(v) === i)
                        .map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                  ) : (
                    <input
                      className="font-bold text-gray-800 text-[16px] rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                      type={item.type || "text"}
                      value={editForm[item.key] ?? ""}
                      onChange={e => handleEditFormChange(item.key, item.type === "number" ? Number(e.target.value) : e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-4 pb-6">
            <button
              onClick={handleEditSave}
              className="mt-4 px-8 py-2 rounded-full bg-gradient-to-l from-blue-400 to-green-400 text-white font-bold shadow hover:scale-105 transition"
              disabled={updateMutation.isLoading}
            >
              {updateMutation.isLoading ? "در حال ذخیره..." : "ذخیره تغییرات"}
            </button>
            <button
              onClick={onClose}
              className="mt-4 px-8 py-2 rounded-full bg-gray-200 text-gray-700 font-bold shadow hover:scale-105 transition"
              disabled={updateMutation.isLoading}
            >
              لغو
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderTable = () => {
    if (isSearching) {
      return (
        <div className="flex justify-center items-center py-10">
          <span className="text-lg font-bold text-blue-500 animate-pulse">در حال جستجو...</span>
        </div>
      );
    }
    if (!results || results.length === 0) {
      const isFormEmpty = Object.values(form).every(v => !v);
      if (isFormEmpty) return null;
      return (
        <div className="flex justify-center items-center py-10">
          <span className="text-lg font-bold text-gray-400">هیچ نتیجه‌ای یافت نشد.</span>
        </div>
      );
    }
    return (
      <div className="overflow-x-auto my-8 rounded-3xl shadow-2xl border border-gray-200 bg-gradient-to-br from-white via-blue-50 to-green-50">
        <table className="min-w-full bg-white/80 border border-gray-200 rounded-3xl overflow-hidden">
          <thead className="bg-gradient-to-l from-green-100 to-blue-100">
            <tr className="whitespace-nowrap">
              <th className="px-2 py-4 text-center text-[16px] font-bold text-blue-700">ردیف</th>
              <th className="px-2 py-4 text-center text-[16px] font-bold text-blue-700">کد ملک</th>
              <th className="px-2 py-4 text-center text-[16px] font-bold text-blue-700">نوع ملک</th>
              <th className="px-2 py-4 text-center text-[16px] font-bold text-blue-700">منطقه</th>
              <th className="px-2 py-4 text-center text-[16px] font-bold text-blue-700">نام مالک</th>
              <th className="px-2 py-4 text-center text-[16px] font-bold text-blue-700">شماره تماس</th>
              <th className="px-2 py-4 text-center text-[16px] font-bold text-blue-700">وضعیت</th>
              <th className="px-2 py-4 text-center text-[16px] font-bold text-blue-700">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {results.map((item, idx) => (
              <tr key={idx} className="text-center border-b whitespace-nowrap hover:bg-blue-50 transition">
                <td className="p-4 font-bold text-blue-700">{idx + 1}</td>
                <td className="p-4">{item.Uid || "-"}</td>
                <td className="p-4">{item.usage || "-"}</td>
                <td className="p-4">{item.region || "-"}</td>
                <td className="p-4">{item.full_name || "-"}</td>
                <td className="p-4">{item.userID || "-"}</td>
                <td className="p-4">
                  <span className={
                    item.check ? "text-green-600 font-bold" :
                    item.reject ? "text-red-500 font-bold" :
                    "text-yellow-500 font-bold"
                  }>
                    {item.check ? "تایید شده" : item.reject ? "رد شده" : "در حال بررسی"}
                  </span>
                </td>
                <td className="p-4 flex flex-col gap-2 items-center">
                  <button
                    className="bg-gradient-to-l from-blue-400 to-green-400 text-white px-5 py-1 rounded-full font-bold shadow hover:scale-105 transition"
                    onClick={() => setDetailsModal({ open: true, data: item })}
                  >
                    جزئیات
                  </button>
                  <button
                    className="bg-gradient-to-l from-green-400 to-blue-400 text-white px-5 py-1 rounded-full font-bold shadow hover:scale-105 transition"
                    onClick={() => handleEditClick(item)}
                  >
                    ویرایش
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <DetailsModal open={detailsModal.open} data={detailsModal.data} onClose={() => setDetailsModal({ open: false, data: null })} />
        <EditEstateModal open={editModal.open} data={editModal.data} onClose={() => setEditModal({ open: false, data: null })} />
      </div>
    );
  };

  return (
    <InitialLayout>
      <div className="flex items-center justify-between border-b border-b-gray-200 mb-10 lg:py-7 py-4 overflow-x-auto w-full lg:overflow-x-visible gap-7 flex-wrap  ">
        <div>
          <span className="font-extrabold text-lg whitespace-nowrap">مدیریت املاک</span>
        </div>
        <RouteChevron items={pageSearchForEstate} />
      </div>

      <ChooseItemsOfState />

      <div className="grid lg:grid-cols-4 gap-x-5 gap-y-10 mb-9">
        <InputState label="کد ملک" value={form.Uid || ""} onChange={e => handleChange("Uid", e.target.value)} numeric />
        <InputState label="نام مالک" value={form.full_name || ""} onChange={e => handleChange("full_name", e.target.value)} />
        <InputState label="شماره موبایل" value={form.userID || ""} onChange={e => handleChange("userID", e.target.value)} numeric />
      </div>

      <div className="flex items-center justify-between md:w-1/2 w-full gap-5">
        <InputState label="آدرس ملک" value={form.address || ""} placeholder="آدرس را وارد کنید" onChange={e => handleChange("address", e.target.value)} />
      </div>
      {renderTable()}
    </InitialLayout>
  );
};

export default SearchForEstate;
