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


interface StepTwoUserProps {
    loan: string; setLoan: (v: string) => void;
    location: string; setLocation: (v: string) => void;
    useful_metrage: string; setUsefulMetrage: (v: string) => void;
    land_metrage: string; setLandMetrage: (v: string) => void;
    year_of_build: string; setYearOfBuild: (v: string) => void;
    features: string; setFeatures: (v: string) => void;
    price: string; setPrice: (v: string) => void;
    description: string; setDescription: (v: string) => void;
}
const StepTwoUser = ({
    loan, setLoan,
    features, setFeatures,
    location, setLocation,
    useful_metrage, setUsefulMetrage,
    land_metrage, setLandMetrage,
    year_of_build, setYearOfBuild,
    price, setPrice,
    description, setDescription
}: StepTwoUserProps) => {
    const [showFeaturePanel, setShowFeaturePanel] = useState(false);
    const selectedFeatures: string[] = features ? features.split(",").map(f => f.trim()).filter(f => f) : [];

    const handleFeatureSelect = (feature: string) => {
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
                    setLandMetrage(formatted.replace(/,/g, ""));
                }}
                numeric
            />
            <InputState
                label="متراژ مفید"
                value={useful_metrage !== undefined && useful_metrage !== null ? formatInputNumber(String(useful_metrage)) : ""}
                onChange={e => {
                    const formatted = formatInputNumber(e.target.value);
                    e.target.value = formatted;
                    setUsefulMetrage(formatted);
                }}
                placeholder="مثال: 100"
                numeric
            />
            <ComboBox
                label="موقعیت ملک"
                options={LOCATION_OPTIONS}
                value={location}
                onChange={setLocation}
            />
            <InputState
                label="سال ساخت"
                placeholder="مثال: 1395"
                value={year_of_build}
                onChange={e => setYearOfBuild(e.target.value.replace(/,/g, ""))}
                numeric
            />
            <div className="flex flex-col items-start">
                <InputState
                    label="وام"
                    value={loan !== undefined && loan !== null ? formatInputNumber(String(loan)) : ""}
                    onChange={(e) => {
                        const formatted = formatInputNumber(e.target.value);
                        e.target.value = formatted;
                        setLoan(formatted);
                    }}
                    numeric
                />
                <span className="text-xs text-red-600 my-1">اگر وام ندارید، عدد 0 رو وارد کنید</span>
                <span className="text-xs text-gray-500 my-1">به تومان</span>
            </div>
            <InputState
                label="قیمت"
                placeholder="مثال: 50000000"
                value={price !== undefined && price !== null ? formatInputNumber(String(price)) : ""}
                onChange={(e) => {
                    const formatted = formatInputNumber(e.target.value);
                    e.target.value = formatted;
                    setPrice(formatted);
                }}
                numeric
            />
            <div className="flex flex-col col-span-1 relative">
                <label className="mb-1 text-sm font-medium">امکانات</label>
                <div className="flex overflow-x-auto gap-1 mb-2 pb-1 max-w-full">
                    {selectedFeatures.map((feature) => (
                        <span
                            key={feature}
                            className="bg-main-color text-white px-2 py-1 rounded-full text-xs flex items-center whitespace-nowrap"
                        >
                            {feature}
                            <button
                                type="button"
                                className="ml-1 text-white"
                                onClick={() => handleFeatureSelect(feature)}
                            >
                                ×
                            </button>
                        </span>
                    ))}
                </div>
                <button
                    type="button"
                    className="border border-main-color text-main-color px-2 py-1 rounded-full text-xs w-fit mt-2"
                    onClick={() => setShowFeaturePanel(true)}
                >
                    انتخاب امکانات
                </button>
                {showFeaturePanel && (
                    <>
                        <div className="fixed inset-0 flex items-center justify-center bg-[#302b2b66] bg-opacity-40"></div>
                        <div className="bg-white rounded-2xl shadow-xl p-6 w-[260px] sm:w-[320px] max-h-[80vh] overflow-y-auto absolute top-[80px] z-[9999]">
                            <button
                                type="button"
                                className="absolute top-2 left-2 text-gray-500 hover:text-red-500 text-xl font-bold"
                                onClick={() => setShowFeaturePanel(false)}
                                aria-label="بستن"
                            >
                                ×
                            </button>
                            <div className="flex flex-wrap gap-2">
                                {FEATURES_OPTIONS.map((feature) => (
                                    <button
                                        type="button"
                                        key={feature}
                                        className={`border px-2 py-1 rounded-full text-xs transition
                      ${selectedFeatures.includes(feature)
                                                ? "bg-main-color text-white border-main-color"
                                                : "border-main-color text-main-color hover:bg-main-color hover:text-white"}`}
                                        onClick={() => handleFeatureSelect(feature)}
                                    >
                                        {feature}
                                    </button>
                                ))}
                            </div>
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
                            <div className="flex justify-end mt-4">
                                <button
                                    type="button"
                                    className="bg-main-color text-white px-4 py-1 rounded-full"
                                    onClick={() => setShowFeaturePanel(false)}
                                >
                                    تایید
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default StepTwoUser;