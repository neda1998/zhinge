import React, { useState } from "react";
import InputState from "../ui/atoms/input/inputState"
import ComboBox from "../common/Combo";
import Swal from "sweetalert2";

const FEATURES_OPTIONS = [
    "آسانسور", "پارکینگ", "انباری", "تراس", "حیاط", "سرویس بهداشتی", "سرویس حمام", "کمد دیواری", "کابینت", "کولر", "پکیج", "شومینه", "دوربین مداربسته", "سیستم گرمایش", "سیستم سرمایش", "سونا", "جکوزی", "استخر", "زمین بازی", "باشگاه ورزشی"
    , "سالن اجتماعات", "سالن کنفرانس", "کتابخانه", "لابی", "آتش‌نشانی", "سیستم اعلام حریق", "سیستم تهویه مطبوع", "سیستم امنیتی", "سیستم کنترل دسترسی", "سیستم روشنایی هوشمند", "سیستم صوتی و تصویری", "سیستم اینترنت پرسرعت", "سیستم تلویزیون مرکزی ", "سیستم گرمایش از کف", "سیستم سرمایش از سقف", "سیستم تصفیه آب", "سیستم تصفیه هوا", "سیستم گرمایش و سرمایش مرکزی", "سیستم گرمایش و سرمایش مستقل", "سیستم گرمایش و سرمایش هوشمند", "سیستم گرمایش و سرمایش خودکار", "سیستم گرمایش و سرمایش دستی"
];

interface StepThreeProps {
    showSubmitButton?: boolean;
    creatAnnouncementMutation?: { isLoading?: boolean; mutate?: (data: any) => void, mutateAsync?: (data: any) => Promise<void> };
    Unit_in_floor?: number; setUnitInFloor: (v: number) => void;
    document_type: string; setDocumentType: (v: string) => void;
    features: string; setFeatures: (v: string) => void;
    full_name: string; setFullName: (v: string) => void;
    phone: string; setPhone: (v: string) => void;
    state_code: string; setStateCode: (v: string) => void;
    useful_metrage?: number; setUsefulMetrage: (v: number) => void;
    type?: string;
    usage?: string;
    region?: string;
    address?: string;
    location?: string;
    setLocation: (v: string) => void;
    price?: number;
    loan?: number;
    year_of_build?: number;
    room_number?: number;
    land_metrage?: number;
    floor_number?: number;
    floor?: number;
    onReset?: () => void; 
}

const StepThree = ({
    showSubmitButton,
    creatAnnouncementMutation,
    Unit_in_floor, setUnitInFloor,
    document_type, setDocumentType,
    features, setFeatures,
    full_name, setFullName,
    phone, setPhone,
    state_code, setStateCode,
    useful_metrage, setUsefulMetrage,
    type, usage, region, address, location, setLocation, price,
    loan, year_of_build, room_number, land_metrage, floor_number, floor,
    onReset
}: StepThreeProps) => {
    const [submitAttempted, setSubmitAttempted] = useState(false);
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitAttempted(true);
        if (!showSubmitButton) {
            Swal.fire({
                icon: "warning",
                title: "اخطار",
                text: "لطفا اطلاعات را ثبت کنید!",
                confirmButtonText: "باشه"
            });
            return;
        }
        if (creatAnnouncementMutation?.mutateAsync) {
            try {
                await creatAnnouncementMutation.mutateAsync({
                    type, usage, region, address, location, price,
                    loan, year_of_build, room_number, land_metrage, floor_number, floor,
                    Unit_in_floor, document_type, features, full_name, phone, state_code, useful_metrage
                });
                if (onReset) onReset();
            } catch {
            }
        } else if (creatAnnouncementMutation?.mutate) {
            creatAnnouncementMutation.mutate({
                type, usage, region, address, location, price,
                loan, year_of_build, room_number, land_metrage, floor_number, floor,
                Unit_in_floor, document_type, features, full_name, phone, state_code, useful_metrage
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-x-5 lg:gap-y-10 gap-y-4">
            <InputState
                label="تعداد واحد در طبقه"
                value={Unit_in_floor !== undefined && Unit_in_floor !== null ? String(Unit_in_floor) : ""}
                onChange={e => setUnitInFloor(Number(e.target.value.replace(/,/g, "")))}
            />
            <ComboBox
                label="نوع سند"
                value={document_type}
                onChange={setDocumentType}
                options={["سند تک برگ", "سند واگذاری", "مبایعه نامه (قولنامه‌ای)", "نسق", "اوقافی", "سایر"]}
            />
            <div className="flex flex-col col-span-1">
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
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-[9999]">
                        <div className="bg-white rounded-2xl shadow-xl p-6 w-[350px] max-h-[80vh] overflow-y-auto relative">
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
                    </div>
                )}
            </div>
            <InputState
                label="نام کامل مالک"
                value={full_name}
                onChange={e => setFullName(e.target.value)}
                placeholder="علی احمدی"
            />
            <InputState
                label="شماره تماس"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="09183456789"
            />
            <InputState
                label="متراژ مفید"
                value={useful_metrage !== undefined && useful_metrage !== null ? String(useful_metrage) : ""}
                onChange={e => setUsefulMetrage(Number(e.target.value.replace(/,/g, "")))}
                placeholder="مثال: 100"
            />
            <InputState
                label="موقعیت مکانی"
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="35.6895, 51.3890" 
            />
            <div></div>
            <div></div>
            <div></div>
            {showSubmitButton && (
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="col-span-4 bg-main-color text-white px-8 py-2 rounded-full mt-4 "
                        disabled={creatAnnouncementMutation?.isLoading}
                    >
                        {creatAnnouncementMutation?.isLoading ? "در حال ثبت..." : "ثبت آگهی"}
                    </button>
                </div>
            )}
        </form>
    );
};

export default StepThree;
