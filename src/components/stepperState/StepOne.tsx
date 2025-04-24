import { useState } from "react";
import InputState from "../ui/atoms/input/inputState";
import UseCreatAnnouncementMutation from "../../hooks/mutation/creatAnnouncement/UseCreatAnnouncementMutation";

const StepOne = () => {
  const [loan, setLoan] = useState<number | undefined>();
  const [usage, setUsageType] = useState<string>("");
  const [floor_number, setFloorNumber] = useState<number | undefined>();
  const [type, setEstateType] = useState<string>("");
  const [userID, setUserID] = useState<string>("");
  const [features, setFeatures] = useState<string>("");
  const [year_of_build, setYearOfBuild] = useState<number | undefined>();
  const [price, setPrice] = useState<number | undefined>();
  const [reject, setReject] = useState<boolean>(false);
  const [tour3dRequest, setTour3dRequest] = useState<boolean>(false);
  const [id, setId] = useState<string | undefined>("09185326583");
  const [floor, setFloor] = useState<number | undefined>();
  const [document_type, setDocumentType] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [useful_metrage, setUsefulMetrage] = useState<number | undefined>();
  const [Unit_in_floor, setUnitInFloor] = useState<number | undefined>();
  const [room_number, setRoomNumber] = useState<number | undefined>();
  const [photo, setPhoto] = useState<string>("");
  const [check, setCheck] = useState<boolean>(false);
  const [Uid, setUid] = useState<string>("1740490552353");
  const [full_name, setFullName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [state_code, setStateCode] = useState<string>("");
  const [tour3dlink, setTour3dlink] = useState<string>("");
  const [land_metrage, setLandMetrage] = useState<number | undefined>();

  const creatAnnouncementMutation = UseCreatAnnouncementMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const payload = {
      loan: 2199,
      usage: "مسکونی",
      floor_number: 2,
      type: "آپارتمان",
      userID: "09181711690",
      features: "آسانسور، پارکینگ",
      year_of_build: 1400,
      price: 2000000,
      reject: false,
      tour3dRequest: false,
      id: 4,
      floor: 1,
      document_type: "سند تک برگ",
      address: "تهران، خیابان آزادی، پلاک 10",
      useful_metrage: 150,
      Unit_in_floor: 2,
      room_number: 3,
      photo: "",
      check: true,
      Uid: "1740490552353", // 👈 دقیقا با حرف بزرگ طبق داکیومنت
      full_name: "علی رضایی",
      phone: "09057973389",
      location: "تهران",
      region: "مرکزی",
      state_code: "IR-23",
      tour3dlink: "https://example.com/3d-tour",
      land_metrage: 200,
    };
  
    creatAnnouncementMutation.mutate(payload);
  };
  return (
    <div className=" w-full">
    <form
      className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-x-5 lg:gap-y-10 gap-y-4"
      onSubmit={handleSubmit}
    >
      <InputState 
        label="نوع ملک" 
        value={type} 
        onChange={(e) => setEstateType(e.target.value)} 
      />
      <InputState label="نوع کاربری" value={usage} onChange={(e) => setUsageType(e.target.value)} />

      <InputState label="استان" value={state_code} onChange={e => setStateCode(e.target.value)} />
      <InputState label="منطقه" value={region} onChange={e => setRegion(e.target.value)} />
      <InputState label="آدرس" placeholder="آدرس ملک" value={address} onChange={e => setAddress(e.target.value)} />
      <InputState label="قیمت (تومان)" placeholder="مثال: 2000000" value={price} onChange={e => setPrice(Number(e.target.value))} />
      <InputState label="سال ساخت" placeholder="مثال: 1400" value={year_of_build} onChange={e => setYearOfBuild(Number(e.target.value))} />
      <InputState label="تعداد اتاق" placeholder="مثال: 2" value={room_number} onChange={e => setRoomNumber(Number(e.target.value))} />
      <InputState label="متراژ زمین" placeholder="مثال: 200" value={land_metrage} onChange={e => setLandMetrage(Number(e.target.value))} />
      <InputState label="متراژ مفید" placeholder="مثال: 150" value={useful_metrage} onChange={e => setUsefulMetrage(Number(e.target.value))} />
      <InputState label="شماره طبقه" placeholder="مثال: 1" value={floor_number} onChange={e => setFloorNumber(Number(e.target.value))} />
      <InputState label="تعداد واحد در طبقه" placeholder="مثال: 1" value={Unit_in_floor} onChange={e => setUnitInFloor(Number(e.target.value))} />
      <InputState label="طبقه" placeholder="مثال: 1" value={floor} onChange={e => setFloor(Number(e.target.value))} />
      <InputState label="امکانات" placeholder="مثال: آسانسور، پارکینگ" value={features} onChange={e => setFeatures(e.target.value)} />
      <InputState label="نوع سند" placeholder="مثال: سند تک برگ" value={document_type} onChange={e => setDocumentType(e.target.value)} />
      <InputState label="نام کامل مالک" placeholder="مثال: علی رضایی" value={full_name} onChange={e => setFullName(e.target.value)} />
      <InputState label="شماره تماس" placeholder="مثال: 09120000000" value={phone} onChange={e => setPhone(e.target.value)} />
      <InputState label="مکان" placeholder="مثال: تهران" value={location} onChange={e => setLocation(e.target.value)} />
      <InputState label="لینک تور سه‌بعدی" placeholder="مثال: https://example.com" value={tour3dlink} onChange={e => setTour3dlink(e.target.value)} />
      <InputState label="لینک تور سه‌بعدی" placeholder="مثال: https://example.com" value={tour3dlink} onChange={e => setTour3dlink(e.target.value)} />
      <InputState label="لینک تور سه‌بعدی" placeholder="مثال: https://example.com" value={tour3dlink} onChange={e => setTour3dlink(e.target.value)} />
      <InputState label="لینک تور سه‌بعدی" placeholder="مثال: https://example.com" value={tour3dlink} onChange={e => setTour3dlink(e.target.value)} />
      <div className="flex items-center gap-2">
        <label>تور سه‌بعدی</label>
        <input type="checkbox" checked={tour3dRequest} onChange={e => setTour3dRequest(e.target.checked)} />
      </div>
      <div className="flex items-center gap-2">
        <label>تایید شده</label>
        <input type="checkbox" checked={check} onChange={e => setCheck(e.target.checked)} />
      </div>
      <div className="flex items-center gap-2">
        <label>رد شده</label>
        <input type="checkbox" checked={reject} onChange={e => setReject(e.target.checked)} />
      </div>

      <button
        type="submit"
        className="col-span-4 bg-main-color text-white px-8 py-2 rounded-full mt-4"
        disabled={creatAnnouncementMutation.isLoading}
      >
        {creatAnnouncementMutation.isLoading ? "در حال ثبت..." : "ثبت آگهی"}
      </button>
    </form>
    </div>
  );
};

export default StepOne;
