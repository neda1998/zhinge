import React from 'react';
import InputState from "../../../components/ui/atoms/input/inputState";
import ComboBox from '../../../components/common/Combo';

interface StepTwoUserProps {
    usage: string; setUsage: (v: string) => void;
    document_type: string; setDocumentType: (v: string) => void;
    location: string; setLocation: (v: string) => void;
    land_metrage: string; setLandMetrage: (v: string) => void;
    useful_metrage: string; setUsefulMetrage: (v: string) => void;
    floor_number: string; setFloorNumber: (v: string) => void;
    floor: string; setFloor: (v: string) => void;
    Unit_in_floor: string; setUnitInFloor: (v: string) => void;
    year_of_build: string; setYearOfBuild: (v: string) => void;
}

function formatInputNumber(val: string) {
    const onlyNums = val.replace(/[^\d]/g, "");
    return onlyNums.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const StepTwoUser = ({
    usage, setUsage,
    document_type, setDocumentType,
    location, setLocation,
    land_metrage, setLandMetrage,
    useful_metrage, setUsefulMetrage,
    floor_number, setFloorNumber,
    floor, setFloor,
    Unit_in_floor, setUnitInFloor,
    year_of_build, setYearOfBuild
}: StepTwoUserProps) => {
    return (
        <div className="w-full grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5">
            <ComboBox options={["مسکونی", "اداری"]} label="کاربرد" value={usage} onChange={setUsage} />
            <ComboBox
                label="نوع سند"
                value={document_type}
                onChange={setDocumentType}
                options={["سند تک برگ", "سند واگذاری", "مبایعه نامه (قولنامه‌ای)", "نسق", "اوقافی", "سایر"]}
            />
            <InputState
                label="موقعیت ملک"
                placeholder="مثال: 35.6895, 51.3890"
                value={location}
                onChange={e => setLocation(e.target.value)}
            />
            <InputState
                label="متراژ زمین"
                placeholder="مثال: 200"
                value={land_metrage}
                onChange={e => setLandMetrage(formatInputNumber(e.target.value))}
            />
            <InputState
                label="متراژ مفید"
                placeholder="مثال: 150"
                value={useful_metrage}
                onChange={e => setUsefulMetrage(formatInputNumber(e.target.value))}
            />
            <InputState
                label="تعداد طبقات"
                placeholder="مثال: 3"
                value={floor_number}
                onChange={e => setFloorNumber(formatInputNumber(e.target.value))}
            />
            <InputState
                label="طبقه"
                placeholder="مثال: 2"
                value={floor}
                onChange={e => setFloor(formatInputNumber(e.target.value))}
            />
            <InputState
                label="تعداد واحد در طبقه"
                placeholder="مثال: 2"
                value={Unit_in_floor}
                onChange={e => setUnitInFloor(e.target.value.replace(/,/g, ""))}
            />
            <InputState
                label="سال ساخت"
                placeholder="مثال: 1395"
                value={year_of_build}
                onChange={e => setYearOfBuild(e.target.value.replace(/,/g, ""))}
            />
        </div>
    );
};

export default StepTwoUser;