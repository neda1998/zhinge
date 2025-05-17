import RouteChevron from "../../../components/common/RouteChevron"
import InputState from "../../../components/ui/atoms/input/inputState"
import { pageSearchForEstate } from "../../../utils/data"
import InitialLayout from "../../dashboard/initialLayoutAdmin"
import ChooseItemsOfState from "../propertyManagement/ChooseItemsOfState"
import UseSearchStateMutation from "../../../hooks/mutation/searchState/UseSearchStateMutation"
import React, { useState, useRef } from "react"

const SearchForEstate = () => {
  const [form, setForm] = useState<any>({});
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [detailsModal, setDetailsModal] = useState<{ open: boolean; data: any | null }>({ open: false, data: null });
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

  const resetForm = () => {
    setForm({});
    setResults([]);
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

  const triggerSearch = (payload: any) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const cleaned = cleanForm(payload);
      if (Object.keys(cleaned).length === 0) return;
      setIsSearching(true);
      searchMutation.mutate(cleaned);
    }, 400);
  };

  const handleSearch = () => {
    const cleaned = cleanForm(form);
    if (Object.keys(cleaned).length === 0) return;
    setIsSearching(true);
    searchMutation.mutate(cleaned);
    resetForm(); 
  };

  const DetailsModal = ({ open, data, onClose }: { open: boolean; data: any; onClose: () => void }) => {
    if (!open || !data) return null;
    const details: Array<{ label: string, value?: any }> = [
      { label: "کد ملک",        value: data.state_code || "-" },
      { label: "نام مالک",      value: data.full_name || "-" },
      { label: "شماره تماس",    value: data.userID || data.phone || "-" },
      { label: "نوع ملک",      value: data.type || "-" },
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
      { label: "قیمت",          value: data.price || "-" },
      { label: "امکانات",      value: data.features || "-" },
      { label: "موقعیت مکانی", value: data.location || "-" },
      { label: "وضعیت",        value: data.check ? "تایید شده" : data.reject ? "رد شده" : "در حال بررسی" },
    ];
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-[3px] p-4">
        <div className="bg-white/90 rounded-3xl shadow-2xl max-w-2xl w-full relative overflow-y-auto max-h-[95vh] border border-gray-200 flex flex-col animate-fadeIn">
          <button
            className="absolute top-4 left-4 text-gray-400 hover:text-red-500 transition text-3xl"
            onClick={onClose}
            aria-label="بستن"
            style={{ fontWeight: 'bold', lineHeight: 1 }}
          >
            ×
          </button>
          <div className="flex flex-col items-center justify-center pt-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-green-400 to-blue-400 flex items-center justify-center shadow-lg mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.343 17.657l-1.414 1.414m12.728 0l-1.414-1.414M6.343 6.343L4.929 4.929" />
              </svg>
            </div>
            <h2 className="font-extrabold text-3xl mb-4 text-gray-700 text-center tracking-wide">
              <span className="inline-block bg-gradient-to-l from-green-400 to-blue-400 bg-clip-text text-transparent">
                جزئیات ملک
              </span>
            </h2>
          </div>
          <div className="px-8 py-6 w-full">
            <div className="grid gap-x-8 gap-y-5 grid-cols-1 sm:grid-cols-2">
              {details.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 mb-1 border border-gray-100 shadow transition hover:shadow-lg"
                >
                  <span className="text-gray-500 text-[13px] mb-1">{item.label}</span>
                  <span className="font-bold text-gray-800 text-[16px]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center pb-6">
            <button
              onClick={onClose}
              className="mt-4 px-8 py-2 rounded-full bg-gradient-to-l from-green-400 to-blue-400 text-white font-bold shadow hover:scale-105 transition"
            >
              بستن
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderTable = () => {
    if (isSearching) {
      return <div>در حال جستجو...</div>;
    }
    if (!results || results.length === 0) {
      const isFormEmpty = Object.values(form).every(v => !v);
      if (isFormEmpty) return null;
      return <div className="text-center text-gray-500 mt-4">هیچ نتیجه‌ای یافت نشد.</div>;
    }
    return (
      <div className="overflow-x-auto my-6">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr className="whitespace-nowrap">
              <th className="px-2 py-4 text-center text-[16px]">ردیف</th>
              <th className="px-2 py-4 text-center text-[16px]">کد ملک</th>
              <th className="px-2 py-4 text-center text-[16px]">نوع ملک</th>
              <th className="px-2 py-4 text-center text-[16px]">منطقه</th>
              <th className="px-2 py-4 text-center text-[16px]">نام مالک</th>
              <th className="px-2 py-4 text-center text-[16px]">شماره تماس</th>
              <th className="px-2 py-4 text-center text-[16px]">وضعیت</th>
              <th className="px-2 py-4 text-center text-[16px]">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {results.map((item, idx) => (
              <tr key={idx} className="text-center border-b whitespace-nowrap">
                <td className="p-4">{idx + 1}</td>
                <td className="p-4">{item.state_code || "-"}</td>
                <td className="p-4">{item.type || "-"}</td>
                <td className="p-4">{item.region || "-"}</td>
                <td className="p-4">{item.full_name || "-"}</td>
                <td className="p-4">{item.userID || "-"}</td>
                <td className="p-4">{item.check ? "تایید شده" : item.reject ? "رد شده" : "در حال بررسی"}</td>
                <td className="p-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-1 rounded-full hover:bg-blue-600 transition"
                    onClick={() => setDetailsModal({ open: true, data: item })}
                  >
                    جزئیات
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <DetailsModal open={detailsModal.open} data={detailsModal.data} onClose={() => setDetailsModal({ open: false, data: null })} />
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
        <InputState label="کد ملک" value={form.state_code || ""} onChange={e => handleChange("state_code", e.target.value)} numeric />
        <InputState label="نام مالک" value={form.full_name || ""} onChange={e => handleChange("full_name", e.target.value)} />
        <InputState label="شماره موبایل" value={form.userID || ""} onChange={e => handleChange("userID", e.target.value)} numeric />
      </div>

      <div className="flex items-center justify-between md:w-1/2 w-full gap-5">
        <InputState label="آدرس ملک" value={form.address || ""} placeholder="آدرس را وارد کنید" onChange={e => handleChange("address", e.target.value)} />
      </div>

      <div className="flex justify-end items-center my-8">
        <button
          className="bg-main-color rounded-full px-10 py-2 text-white"
          onClick={handleSearch}
          disabled={searchMutation.isLoading || isSearching}
        >
          {(searchMutation.isLoading || isSearching) ? "در حال جستجو..." : "جستجو"}
        </button>
      </div>
      {renderTable()}
    </InitialLayout>
  );
};

export default SearchForEstate;
