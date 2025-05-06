import React from "react";
import TitleCommon from "./TitleCommon"
import InputState from "../ui/atoms/input/inputState"
import ComboBox from "../common/Combo";

interface StepThreeProps {
    showSubmitButton?: boolean;
    creatAnnouncementMutation?: { isLoading?: boolean; mutate?: (data: any) => void };
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
     loan, year_of_build, room_number, land_metrage, floor_number, floor
}: StepThreeProps) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (creatAnnouncementMutation?.mutate) {
            creatAnnouncementMutation.mutate({
                type, usage, region, address, location, price,
                 loan, year_of_build, room_number, land_metrage, floor_number, floor,
                Unit_in_floor, document_type, features, full_name, phone, state_code, useful_metrage
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="wfull grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-x-5 lg:gap-y-10 gap-y-4">
            <InputState
                label="تعداد واحد در طبقه"
                value={Unit_in_floor !== undefined && Unit_in_floor !== null ? String(Unit_in_floor) : ""}
                onChange={e => setUnitInFloor(Number(e.target.value.replace(/,/g, "")))}
            />
            <ComboBox
                label="نوع سند"
                value={document_type}
                onChange={setDocumentType}
                options={["سند تک برگ", "سند اگذاری", "مبایعه نامه (قولنامه‌ای)", "نسق","اوقافی","سایر"]}
            />
            <InputState
                label="امکانات"
                value={features}
                onChange={e => setFeatures(e.target.value)}
            />
            <InputState
                label="نام کامل مالک"
                value={full_name}
                onChange={e => setFullName(e.target.value)}
            />
            <InputState
                label="شماره تماس"
                value={phone}
                onChange={e => setPhone(e.target.value)}
            />
            <InputState
                label="کد استان"
                value={state_code}
                onChange={e => setStateCode(e.target.value)}
            />
            <InputState
                label="متراژ مفید"
                value={useful_metrage !== undefined && useful_metrage !== null ? String(useful_metrage) : ""}
                onChange={e => setUsefulMetrage(Number(e.target.value.replace(/,/g, "")))}
            />
<InputState
  label="موقعیت مکانی"
  value={location}
  onChange={e => setLocation(e.target.value)}
/>
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
