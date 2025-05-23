import React from 'react';
import InputState from "../../../components/ui/atoms/input/inputState";
import ComboBox from '../../../components/common/Combo';
import UseGetAllregionsQuery from "../../../hooks/queries/admin/getAllregions/UseGetAllregionsQuery";

interface StepOneUserProps {
  type: string; setType: (v: string) => void;
  region: string; setRegion: (v: string) => void;
  address: string; setAddress: (v: string) => void;
  Unit_in_floor?: number; setUnitInFloor: (v: number) => void;
  document_type: string; setDocumentType: (v: string) => void;
  floor_number?: number; setFloorNumber: (v: number) => void;
  floor?: number; setFloor: (v: number) => void;
  room_number?: number; setRoomNumber: (v: number) => void;
  usage: string; setUsage: (v: string) => void;
}

const shouldHideFields = (type: string) =>
    type === "مغازه" || type === "زمین مسکونی" || type === "زمین کشاورزی";

const StepOneUser = ({
    type, setType,
    region, setRegion,
    address, setAddress,
    Unit_in_floor, setUnitInFloor,
    floor_number, setFloorNumber,
    floor, setFloor,
    document_type, setDocumentType,
    room_number, setRoomNumber,
    usage, setUsage
}: StepOneUserProps) => {
   const hideFields = shouldHideFields(usage);

   const { data: regionsData, isLoading: regionsLoading, isError: regionsError } = UseGetAllregionsQuery();
   const regionOptions = Array.isArray(regionsData) ? regionsData.map((item: any) => item.name) : [];

    return (
        <div className="w-full grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
            <ComboBox
                label="نوع ملک"
                value={usage}
                onChange={setUsage}
                options={["آپارتمان", "ویلایی", "مغازه", "زمین مسکونی", "زمین کشاورزی", "سایر"]}
            />

            <ComboBox
                label="منطقه"
                value={region}
                onChange={setRegion}
                options={regionOptions}
            />
            <InputState
                label="آدرس"
                placeholder="سنندج، خیابان پاسداران، کوچه ادب 2، پلاک 3"
                value={address}
                onChange={e => setAddress(e.target.value)}
            />

             {!hideFields && (
          <>
            {usage !== "ویلایی" && (
              <InputState
                label="طبقه مورد نظر"
                value={floor_number !== undefined && floor_number !== null ? String(floor_number) : ""}
                onChange={e => setFloorNumber(Number(e.target.value.replace(/,/g, "")))}
                placeholder="مثال: 2"
                numeric
              />
            )}
            <InputState
              label="تعداد طبقات"
              value={floor !== undefined && floor !== null ? String(floor) : ""}
              onChange={e => setFloor(Number(e.target.value.replace(/,/g, "")))}
              placeholder="مثال: 5"
              numeric
            />
            <InputState
              label="تعداد واحد در طبقه"
              value={Unit_in_floor !== undefined && Unit_in_floor !== null ? String(Unit_in_floor) : ""}
              onChange={e => setUnitInFloor(Number(e.target.value.replace(/,/g, "")))}
              placeholder="مثال: 2"
              numeric
            />
            <InputState
              label="تعداد اتاق ها"
              value={room_number !== undefined && room_number !== null ? String(room_number) : ""}
              onChange={(e) => setRoomNumber(Number(e.target.value.replace(/,/g, "")))}
              placeholder="مثال: 3"
              numeric
            />
          </>
        )}
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