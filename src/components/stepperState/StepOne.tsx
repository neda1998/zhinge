import InputState from "../ui/atoms/input/inputState";
import ComboBox from "../common/Combo";
// اضافه کردن ایمپورت هوک دریافت مناطق
import UseGetAllregionsQuery from "../../hooks/queries/admin/getAllregions/UseGetAllregionsQuery";

interface StepOneProps {
  usage: string; setUsage: (v: string) => void;
  region: string; setRegion: (v: string) => void;
  address: string; setAddress: (v: string) => void;
  Unit_in_floor?: number; setUnitInFloor: (v: number) => void;
  document_type: string; setDocumentType: (v: string) => void;
  floor_number?: number; setFloorNumber: (v: number) => void;
  floor?: number; setFloor: (v: number) => void;
  room_number?: number; setRoomNumber: (v: number) => void;
}

const shouldHideFields = (type: string) =>
  type === "مغازه" || type === "زمین مسکونی" || type === "زمین کشاورزی";

const StepOne = ({
  usage, setUsage,
  region, setRegion,
  address, setAddress,
  Unit_in_floor, setUnitInFloor,
  document_type, setDocumentType,
  floor_number, setFloorNumber,
  floor, setFloor,
  room_number, setRoomNumber,
}: StepOneProps) => {
  const hideFields = shouldHideFields(usage);

  const { data: regionsData, isLoading: regionsLoading, isError: regionsError } = UseGetAllregionsQuery();
  const regionOptions = Array.isArray(regionsData) ? regionsData.map((item: any) => item.name) : [];

  return (
    <div className="w-full">
      <form
        className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-x-2 lg:gap-y-7 gap-y-4"
      >
        <ComboBox
          label="نوع ملک"
          value={usage}
          onChange={setUsage}
          options={["آپارتمان", "ویلایی", "مغازه", "زمین مسکونی", "زمین کشاورزی", "سایر"]}
        />
        <ComboBox
          label="محله مورد نظر"
          value={region}
          onChange={setRegion}
          options={regionOptions}
        />
        <InputState
          label="آدرس ملک"
          placeholder="سنندج، خیابان پاسداران، کوچه ادب 2، پلاک 3"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {!hideFields && (
          <>
              <InputState
                label="طبقه مورد نظر"
                value={floor_number !== undefined && floor_number !== null ? String(floor_number) : ""}
                onChange={e => setFloorNumber(Number(e.target.value.replace(/,/g, "")))}
                placeholder="مثال: 2"
                numeric
              />
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
      </form>
    </div>
  );
};

export default StepOne;
