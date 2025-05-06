import { useState } from "react";
import InputState from "../ui/atoms/input/inputState";
import UseCreatAnnouncementMutation from "../../hooks/mutation/creatAnnouncement/UseCreatAnnouncementMutation";
import Swal from "sweetalert2";
import ComboBox from "../common/Combo";
import React from "react";

const formatNumber = (value: number | string | undefined) =>
  value !== undefined && value !== null && value !== ""
    ? Number(value).toLocaleString("en-US")
    : "";

// helper for formatting input as user types
function formatInputNumber(val: string) {
  // حذف هر چیزی غیر از عدد
  const onlyNums = val.replace(/[^\d]/g, "");
  // افزودن ویرگول سه‌رقمی
  return onlyNums.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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
  const [userID, setUserID] = useState<string>("");
  const [reject, setReject] = useState<boolean>(false);
  const [tour3dRequest, setTour3dRequest] = useState<boolean>(false);
  const [id, setId] = useState<number | undefined>();
  const [photo, setPhoto] = useState<string>("");
  const [check, setCheck] = useState<boolean>(false);
  const [Uid, setUid] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [state_code, setStateCode] = useState<string>("");
  const [tour3dlink, setTour3dlink] = useState<string>("");
  const [useful_metrage, setUsefulMetrage] = useState<number | undefined>();
  const [hasLoan, setHasLoan] = useState<string>("ندارد");

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
    setUserID("");
    setReject(false);
    setTour3dRequest(false);
    setId(undefined);
    setPhoto("");
    setCheck(false);
    setUid("");
    setPhone("");
    setStateCode("");
    setTour3dlink("");
    setUsefulMetrage(undefined);
  };

  const creatAnnouncementMutation = UseCreatAnnouncementMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      loan,
      usage,
      floor_number,
      type,
      userID,
      features,
      year_of_build,
      price,
      reject,
      tour3dRequest,
      id,
      floor,
      document_type,
      address,
      useful_metrage,
      Unit_in_floor,
      room_number,
      photo,
      check,
      Uid,
      full_name,
      phone,
      location,
      region,
      state_code,
      tour3dlink,
      land_metrage,
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
        <ComboBox
          label="نوع ملک"
          value={type}
          onChange={(val) => setType(val)}
          options={["آپارتمان", "ویلایی","مغازه", "زمین مسکونی", "زمین کشاورزی", "سایر"]}
        />
        <InputState label="شهرستان" value={usage} onChange={(e) => setUsage(e.target.value)} />
        <InputState label="استان" value={region} onChange={(e) => setRegion(e.target.value)} />
        <InputState label="آدرس" value={address} onChange={(e) => setAddress(e.target.value)} />
        <InputState label="منطقه" value={location} onChange={(e) => setLocation(e.target.value)} />

        {/* وام */}
        <div className="flex flex-col">
          <ComboBox
            label="وام"
            value={hasLoan}
            onChange={(val) => {
              setHasLoan(val);
              if (val === "ندارد") setLoan(undefined);
            }}
            options={["دارد", "ندارد"]}
          />
          {hasLoan === "دارد" && (
            <div className="flex items-center gap-2 mt-2">
              <InputState
                label="مبلغ وام"
                placeholder="مثال: 50,000,000 تومان"
                value={loan !== undefined && loan !== null ? formatInputNumber(String(loan)) : ""}
                onChange={(e) => {
                  const formatted = formatInputNumber(e.target.value);
                  e.target.value = formatted;
                  setLoan(Number(formatted.replace(/,/g, "")));
                }}
                className="w-full"
              />
              <span className="text-xs text-gray-400 whitespace-nowrap">لطفا اعداد را به انگلیسی وارد کنید</span>
              <span className="text-xs text-gray-500 whitespace-nowrap">
                {formatNumber(loan)} تومان
              </span>
            </div>
          )}
        </div>

        {/* قیمت */}
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
          />
          <span className="text-xs text-gray-400">لطفا اعداد را به انگلیسی وارد کنید</span>
          <span className="text-xs text-gray-500">{formatNumber(price)} تومان</span>
        </div>

        {/* سال ساخت */}
        <div className="flex flex-col">
          <InputState
            label="سال ساخت"
            placeholder="مثال: 1402"
            value={year_of_build !== undefined && year_of_build !== null ? String(year_of_build) : ""}
            onChange={(e) => setYearOfBuild(Number(e.target.value.replace(/,/g, "")))}
          />
          <span className="text-xs text-gray-400">لطفا اعداد را به انگلیسی وارد کنید</span>
        </div>

        {/* تعداد اتاق */}
        <div className="flex flex-col">
          <InputState
            label="تعداد اتاق"
            placeholder="مثال: 2"
            value={room_number !== undefined && room_number !== null ? String(room_number) : ""}
            onChange={(e) => setRoomNumber(Number(e.target.value.replace(/,/g, "")))}
          />
          <span className="text-xs text-gray-400">لطفا اعداد را به انگلیسی وارد کنید</span>
        </div>

        {/* متراژ مفید */}
        <div className="flex flex-col">
          <InputState
            label="متراژ مفید"
            placeholder="مثال: 150"
            value={land_metrage !== undefined && land_metrage !== null ? formatInputNumber(String(land_metrage)) : ""}
            onChange={(e) => {
              const formatted = formatInputNumber(e.target.value);
              e.target.value = formatted;
              setLandMetrage(Number(formatted.replace(/,/g, "")));
            }}
          />
          <span className="text-xs text-gray-400">متراژ به متر مربع است</span>
          <span className="text-xs text-gray-400">لطفا اعداد را به انگلیسی وارد کنید</span>
          <span className="text-xs text-gray-500">{formatNumber(land_metrage)} متر</span>
        </div>

        {/* شماره طبقه */}
        <div className="flex flex-col">
          <InputState
            label="طبقه مورد نظر"
            placeholder="مثال: 1"
            value={floor_number !== undefined && floor_number !== null ? String(floor_number) : ""}
            onChange={(e) => setFloorNumber(Number(e.target.value.replace(/,/g, "")))}
          />
          <span className="text-xs text-gray-400">لطفا اعداد را به انگلیسی وارد کنید</span>
        </div>

        {/* طبقه */}
        <div className="flex flex-col">
          <InputState
            label="تعداد طبقات"
            placeholder="مثال: 2"
            value={floor !== undefined && floor !== null ? String(floor) : ""}
            onChange={(e) => setFloor(Number(e.target.value.replace(/,/g, "")))}
          />
          <span className="text-xs text-gray-400">لطفا اعداد را به انگلیسی وارد کنید</span>
        </div>

        {/* تعداد واحد در طبقه */}
        <div className="flex flex-col">
          <InputState
            label="تعداد واحد در طبقه"
            placeholder="مثال: 2"
            value={Unit_in_floor !== undefined && Unit_in_floor !== null ? String(Unit_in_floor) : ""}
            onChange={(e) => setUnitInFloor(Number(e.target.value.replace(/,/g, "")))}
          />
          <span className="text-xs text-gray-400">لطفا اعداد را به انگلیسی وارد کنید</span>
        </div>

        <ComboBox
          label="نوع سند"
          value={document_type}
          onChange={(val) => setDocumentType(val)}
          options={["سند تک برگ", "مبایعه نامه (قولنامه‌ای)", "سند واگذاری ", "نسق", "سند مشاع", "اوقافی"]}
        />
        <InputState label="امکانات" placeholder="مثال: آسانسور، پارکینگ" value={features} onChange={(e) => setFeatures(e.target.value)} />
        <InputState label="نام کامل مالک" placeholder="مثال: علی رضایی" value={full_name} onChange={(e) => setFullName(e.target.value)} />
        <InputState label="شماره تماس" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <InputState label="کد استان" value={state_code} onChange={(e) => setStateCode(e.target.value)} />
        <div className="flex flex-col">
          <InputState
            label="متراژ مفید (useful_metrage)"
            value={String(useful_metrage ?? "")}
            onChange={(e) => setUsefulMetrage(Number(e.target.value.replace(/,/g, "")))}
          />
          <span className="text-xs text-gray-400">لطفا اعداد را به انگلیسی وارد کنید</span>
        </div>
        <div></div>
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
