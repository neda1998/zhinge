import React from 'react';
import InputState from "../../../components/ui/atoms/input/inputState";
import ComboBox from '../../../components/common/Combo';

interface StepOneUserProps {
    type: string; setType: (v: string) => void;
    region: string; setRegion: (v: string) => void;
    address: string; setAddress: (v: string) => void;
    Unit_in_floor: string; setUnitInFloor: (v: string) => void;
    floor_number: string; setFloorNumber: (v: string) => void;
    floor: string; setFloor: (v: string) => void;
    document_type?: string; setDocumentType?: (v: string) => void;
        room_number: string; setRoomNumber: (v: string) => void;
}

function formatInputNumber(val: string) {
    const onlyNums = val.replace(/[^\d]/g, "");
    return onlyNums.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function formatNumber(val: string) {
    if (!val) return "";
    const num = Number(val.replace(/,/g, ""));
    return isNaN(num) ? "" : num.toLocaleString("en-US");
}

const StepOneUser = ({
    room_number, setRoomNumber,
    type, setType,
    region, setRegion,
    address, setAddress,
    Unit_in_floor, setUnitInFloor,
    floor_number, setFloorNumber,
    floor, setFloor,
    document_type, setDocumentType
}: StepOneUserProps) => {
    return (
        <div className="w-full grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5">
            <ComboBox
                label="نوع ملک"
                value={type}
                onChange={setType}
                options={["آپارتمان", "ویلایی", "مغازه", "زمین مسکونی", "زمین کشاورزی", "سایر"]}
            />
            <InputState
                label="منطقه"
                placeholder="مثال: مبارک آباد"
                value={region}
                onChange={e => setRegion(e.target.value)}
            />
            <InputState
                label="آدرس ملک"
                placeholder="سنندج، خیابان پاسداران، کوچه ادب 2، پلاک 3"
                value={address}
                onChange={e => setAddress(e.target.value)}
            />
            
            <InputState
                label="طبقه مورد نظر"
                placeholder="مثال: 2"
                value={floor}
                onChange={e => setFloor(formatInputNumber(e.target.value))}
            />
            <InputState
                label="تعداد طبقات"
                placeholder="مثال: 3"
                value={floor_number}
                onChange={e => setFloorNumber(formatInputNumber(e.target.value))}
            />
            <InputState
                label="تعداد واحد در طبقه"
                placeholder="مثال: 2"
                value={Unit_in_floor}
                onChange={e => setUnitInFloor(e.target.value.replace(/,/g, ""))}
            />
             <InputState
                label="تعداد اتاق‌ها"
                placeholder="مثال: 3"
                value={room_number}
                onChange={e => setRoomNumber(formatInputNumber(e.target.value))}
            />
            <ComboBox
                label="نوع سند"
                value={document_type}
                onChange={setDocumentType}
                options={["سند تک برگ", "سند واگذاری", "مبایعه نامه (قولنامه‌ای)", "نسق", "اوقافی", "سایر"]}
            />
        </div>
    );
};

export default StepOneUser;