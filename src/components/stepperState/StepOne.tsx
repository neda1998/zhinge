import { useState } from "react";
import InputState from "../ui/atoms/input/inputState";
import UseCreatAnnouncementMutation from "../../hooks/mutation/creatAnnouncement/UseCreatAnnouncementMutation";
import Swal from "sweetalert2"; // اضافه شد

const StepOne = () => {
  const [loan, setLoan] = useState<number | undefined>();
  const [usage, setUsage] = useState<string>("");
  const [floor_number, setFloorNumber] = useState<number | undefined>();
  const [type, setType] = useState<string>("");
  const [features, setFeatures] = useState<string>("");
  const [year_of_build, setYearOfBuild] = useState<number | undefined>();
  const [price, setPrice] = useState<number | undefined>();
  const [floor, setFloor] = useState<number | undefined>();
  const [document_type, setDocumentType] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [land_metrage, setLandMetrage] = useState<number | undefined>();
  const [Unit_in_floor, setUnitInFloor] = useState<number | undefined>();
  const [room_number, setRoomNumber] = useState<number | undefined>();
  const [full_name, setFullName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [region, setRegion] = useState<string>("");

  // تابع ریست کردن فیلدها
  const resetFields = () => {
    setLoan(undefined);
    setUsage("");
    setFloorNumber(undefined);
    setType("");
    setFeatures("");
    setYearOfBuild(undefined);
    setPrice(undefined);
    setFloor(undefined);
    setDocumentType("");
    setAddress("");
    setLandMetrage(undefined);
    setUnitInFloor(undefined);
    setRoomNumber(undefined);
    setFullName("");
    setLocation("");
    setRegion("");
  };

  const creatAnnouncementMutation = UseCreatAnnouncementMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const payload = {
      loan,
      usage,
      floor_number,
      type,
      features,
      year_of_build,
      price,
      floor,
      document_type,
      address,
      land_metrage,
      Unit_in_floor,
      room_number,
      full_name,
      location,
      region,
    };
  
    const cleanPayload = Object.fromEntries(
      Object.entries(payload).filter(([_, value]) => value !== undefined && value !== null && value !== "")
    );
  
    const requiredFields = [
      "type",
      "usage",
      "region",
      "address",
      "location",
      "loan",
      "price",
      "year_of_build",
      "room_number",
      "land_metrage",
      "floor_number",
      "floor",
      "Unit_in_floor",
      "document_type",
      "features",
      "full_name"
    ];
    const allFilled = requiredFields.every(field => cleanPayload[field] !== undefined && cleanPayload[field] !== "");
  
    if (!allFilled) {
      Swal.fire({
        title: "اخطار",
        text: "لطفا همه فیلدها را پر کنید.",
        icon: "warning",
        confirmButtonText: "باشه",
      });
      return;
    }
  
    creatAnnouncementMutation.mutate(cleanPayload, {
      onSuccess: () => {
        resetFields();
      }
    });
  };
   

  return (
    <div className="w-full">
      <form 
        className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-x-5 lg:gap-y-10 gap-y-4" 
        onSubmit={handleSubmit}
      >
        <InputState label="نوع ملک" value={type} onChange={(e) => setType(e.target.value)} />
        <InputState label="نوع کاربری" value={usage} onChange={(e) => setUsage(e.target.value)} />
        <InputState label="استان" value={region} onChange={(e) => setRegion(e.target.value)} />
        <InputState label="آدرس" value={address} onChange={(e) => setAddress(e.target.value)} />
        <InputState label="مکان" value={location} onChange={(e) => setLocation(e.target.value)} />
        <InputState label="وام" placeholder="مثال: 50000000" value={loan ?? ""} onChange={(e) => setLoan(Number(e.target.value))} />
        <InputState label="قیمت" placeholder="مثال: 2000000" value={price ?? ""} onChange={(e) => setPrice(Number(e.target.value))} />
        <InputState label="سال ساخت" placeholder="مثال: 1402" value={year_of_build ?? ""} onChange={(e) => setYearOfBuild(Number(e.target.value))} />
        <InputState label="تعداد اتاق" placeholder="مثال: 2" value={room_number ?? ""} onChange={(e) => setRoomNumber(Number(e.target.value))} />
        <InputState label="متراژ مفید" placeholder="مثال: 150" value={land_metrage ?? ""} onChange={(e) => setLandMetrage(Number(e.target.value))} />
        <InputState label="شماره طبقه" placeholder="مثال: 1" value={floor_number ?? ""} onChange={(e) => setFloorNumber(Number(e.target.value))} />
        <InputState label="طبقه" placeholder="مثال: 2" value={floor ?? ""} onChange={(e) => setFloor(Number(e.target.value))} />
        <InputState label="تعداد واحد در طبقه" placeholder="مثال: 2" value={Unit_in_floor ?? ""} onChange={(e) => setUnitInFloor(Number(e.target.value))} />
        <InputState label="نوع سند" placeholder="مثال: سند تک برگ" value={document_type} onChange={(e) => setDocumentType(e.target.value)} />
        <InputState label="امکانات" placeholder="مثال: آسانسور، پارکینگ" value={features} onChange={(e) => setFeatures(e.target.value)} />
        <InputState label="نام کامل مالک" placeholder="مثال: علی رضایی" value={full_name} onChange={(e) => setFullName(e.target.value)} />
        <div></div>
        <div></div>
        <div></div>
       <div className="flex justify-end">
       <button
          type="submit"
          className="col-span-4 bg-main-color text-white px-8 py-2 rounded-full mt-4 "
          disabled={creatAnnouncementMutation.isLoading}
        >
          {creatAnnouncementMutation.isLoading ? "در حال ثبت..." : "ثبت آگهی"}
        </button>
       </div>
      </form>
    </div>
  );
};

export default StepOne;
