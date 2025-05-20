import React, { useState } from 'react';
import InputState from "../../../components/ui/atoms/input/inputState";
import ComboBox from '../../../components/common/Combo';


const FEATURES_OPTIONS = [
    "آسانسور", "پارکینگ", "انباری", "تراس", "حیاط", "سرویس بهداشتی", "سرویس حمام", "کمد دیواری", "کابینت", "کولر", "پکیج", "شومینه", "دوربین مداربسته", "سیستم گرمایش", "سیستم سرمایش", "سونا", "جکوزی", "استخر", "زمین بازی", "باشگاه ورزشی",
    "سالن اجتماعات", "سالن کنفرانس", "کتابخانه", "لابی", "آتش‌نشانی", "سیستم اعلام حریق", "سیستم تهویه مطبوع", "سیستم امنیتی", "سیستم کنترل دسترسی", "سیستم روشنایی هوشمند", "سیستم صوتی و تصویری", "سیستم اینترنت پرسرعت", "سیستم تلویزیون مرکزی ", "سیستم گرمایش از کف", "سیستم سرمایش از سقف", "سیستم تصفیه آب", "سیستم تصفیه هوا", "سیستم گرمایش و سرمایش مرکزی", "سیستم گرمایش و سرمایش مستقل", "سیستم گرمایش و سرمایش هوشمند", "سیستم گرمایش و سرمایش خودکار", "سیستم گرمایش و سرمایش دستی"
];

const LOCATION_OPTIONS = [
    "شمالی",
    "جنوبی",
    "شمالی دو نبش",
    "جنوبی دو نبش",
    "دوکله",
    "سه نبش"
];

function formatInputNumber(val: string) {
    const onlyNums = val.replace(/[^\d]/g, "");
    return onlyNums.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const formatNumber = (value: number | string | undefined) =>
    value !== undefined && value !== null && value !== ""
        ? Number(value).toLocaleString("en-US")
        : "";

interface StepTwoUserProps {
    loan?: number; setLoan: (v: number) => void;
    year_of_build?: number; setYearOfBuild: (v: number) => void;
    price?: number; setPrice: (v: number) => void;
    features?: string; setFeatures: (v: string) => void;
    useful_metrage?: number; setUsefulMetrage: (v: number) => void;
    location?: string; setLocation: (v: string) => void;
    land_metrage?: number; setLandMetrage: (v: number) => void; 
    description?: string; setDescription: (v: string) => void;
    type: string; 
}
const shouldHideFields = (type: string) =>
    type === "مغازه" || type === "زمین مسکونی" || type === "زمین کشاورزی";

const StepTwoUser = ({
    loan, setLoan,
    features, setFeatures,
    location, setLocation,
    useful_metrage, setUsefulMetrage,
    land_metrage, setLandMetrage,
    year_of_build, setYearOfBuild,
    price, setPrice,
    description, setDescription,
    type 
}: StepTwoUserProps) => {
    const [showFeaturePanel, setShowFeaturePanel] = useState(false);
    const selectedFeatures: string[] = features ? features.split(",").map(f => f.trim()).filter(f => f) : [];
    const hideFields = shouldHideFields(type);

    const handleFeatureSelect = (feature: string) => {
        if (!setFeatures) return;
        if (selectedFeatures.includes(feature)) {
            const newFeatures = selectedFeatures.filter(f => f !== feature);
            setFeatures(newFeatures.join(","));
        } else {
            const newFeatures = [...selectedFeatures, feature];
            setFeatures(newFeatures.join(","));
        }
    };

    return (
        <div className="w-full grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5">
            <InputState
                label="متراژ کل زمین"
                placeholder="مثال: 200"
                value={land_metrage !== undefined && land_metrage !== null ? formatInputNumber(String(land_metrage)) : ""}
                onChange={e => {
                    const formatted = formatInputNumber(e.target.value);
                    e.target.value = formatted;
                    setLandMetrage(Number(formatted.replace(/,/g, "")));
                }}
                numeric
            />
            {!hideFields && (
                           <>
                               <InputState
                                   label="متراژ مفید"
                                   value={useful_metrage !== undefined && useful_metrage !== null ? formatInputNumber(String(useful_metrage)) : ""}
                                   onChange={e => {
                                       const formatted = formatInputNumber(e.target.value);
                                       e.target.value = formatted;
                                       setUsefulMetrage(Number(e.target.value.replace(/,/g, "")))}
                                   }
                                   placeholder="مثال: 100"
                                   numeric
                               />
                           </>
                       )}
            <ComboBox
                label="موقعیت ملک"
                options={LOCATION_OPTIONS}
                value={location}
                onChange={setLocation}
            />
             {!hideFields && (
                <>
                    <InputState
                        label="سال ساخت"
                        value={year_of_build !== undefined && year_of_build !== null ? String(year_of_build) : ""}
                        onChange={(e) => setYearOfBuild(Number(e.target.value.replace(/,/g, "")))}
                        numeric 
                    />
                </>
            )}
             {!hideFields && (
                <div className="flex flex-col items-start">
                    <InputState
                        label="وام"
                        value={loan !== undefined && loan !== null ? formatInputNumber(String(loan)) : ""}
                        onChange={(e) => {
                            const formatted = formatInputNumber(e.target.value);
                            e.target.value = formatted;
                            setLoan(Number(formatted.replace(/,/g, "")));
                        }}
                        numeric
                    />
                    <span className="text-xs text-red-600 my-1">اگر وام ندارید، عدد 0 رو وارد کنید</span>
                    <span className="text-xs text-gray-500 my-1">به تومان</span>
                </div>
            )}
            <div className="flex flex-col">
                <InputState
                    label="قیمت"
                    placeholder="مثال: 2,000,000 تومان"
                    value={price !== undefined && price !== null ? formatInputNumber(String(price)) : ""}
                    onChange={(e) => {
                        const formatted = formatInputNumber(e.target.value);
                        e.target.value = formatted;
                        setPrice(Number(formatted.replace(/,/g, "")));
                    }}
                    numeric
                />
                <span className="text-xs text-gray-400 my-1">لطفا اعداد را به انگلیسی وارد کنید</span>
                <span className="text-xs text-gray-500">{formatNumber(price)} تومان</span>
            </div>
             {!hideFields && (
                <div className="flex flex-col col-span-1 relative">
                    <label className="mb-1 text-sm font-semibold text-gray-700">امکانات</label>
                    <button
                        type="button"
                        className="border border-main-color text-main-color px-4 py-2 rounded-full text-base w-fit mt-2 flex items-center gap-2 shadow-lg transition-all duration-200 hover:bg-main-color hover:text-white hover:scale-105"
                        onClick={() => setShowFeaturePanel(true)}
                    >
                        <span className="font-semibold">امکانات</span>
                        <span className="bg-gradient-to-l from-green-400 to-blue-400 text-white rounded-full px-3 py-0.5 text-sm font-bold shadow">
                            {selectedFeatures.length}
                        </span>
                    </button>
                    {/* Modal */}
                    {showFeaturePanel && (
                        <div
                            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in"
                            onClick={() => setShowFeaturePanel(false)}
                        >
                            <div
                                className="bg-white rounded-3xl shadow-2xl p-8 w-[95vw] max-w-xl max-h-[85vh] overflow-y-auto relative border border-main-color animate-fade-in-up"
                                onClick={e => e.stopPropagation()}
                            >
                                <button
                                    type="button"
                                    className="absolute top-4 left-4 text-gray-400 hover:text-red-500 text-3xl font-bold transition"
                                    onClick={() => setShowFeaturePanel(false)}
                                    aria-label="بستن"
                                >
                                    ×
                                </button>
                                <div className="mb-6 text-2xl font-extrabold text-main-color text-center tracking-tight">انتخاب امکانات</div>
                                <div className="flex flex-wrap gap-3 justify-center">
                                    {FEATURES_OPTIONS.map((feature) => {
                                        const isSelected = selectedFeatures.includes(feature);
                                        return (
                                            <button
                                                type="button"
                                                key={feature}
                                                className={`px-4 py-2 rounded-full border transition-all duration-150 text-base font-medium shadow-sm
                                                    ${isSelected
                                                        ? "bg-gradient-to-l from-green-400 to-blue-400 text-white border-main-color scale-105"
                                                        : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-main-color hover:text-white hover:border-main-color"}
                                                `}
                                                onClick={() => handleFeatureSelect(feature)}
                                            >
                                                {feature}
                                            </button>
                                        );
                                    })}
                                </div>
                                <div className="flex justify-end mt-8">
                                    <button
                                        type="button"
                                        className="bg-gradient-to-l from-green-400 to-blue-400 text-white px-8 py-2 rounded-full font-bold shadow-lg hover:scale-105 transition-all duration-200"
                                        onClick={() => setShowFeaturePanel(false)}
                                    >
                                        تایید و بستن
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
            <div className="col-span-1 lg:col-span-4 flex flex-col">
                <label className="mb-1 text-sm font-medium">توضیحات</label>
                <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="توضیحات ملک را وارد کنید"
                    className="border rounded px-2 py-1 w-full"
                    rows={4}
                />
            </div>
        </div>
    );
};

export default StepTwoUser;