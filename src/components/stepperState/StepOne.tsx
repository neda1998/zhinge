import { useState } from "react"
import ComboBox from "../common/Combo"
import InputState from "../ui/atoms/input/inputState"
import TitleCommon from "./TitleCommon"
import UseCreatAnnouncementMutation from "../../hooks/mutation/creatAnnouncement/UseCreatAnnouncementMutation"
import Swal from "sweetalert2"

const StepOne = () => {
    const creatAnnouncementMutation = UseCreatAnnouncementMutation();
    const [state, setState] = useState("کردستان");
    const [city, setCity] = useState("کردستان");
    const [region, setRegion] = useState("کردستان");
    const [estateType, setEstateType] = useState("آپارتمان");
    const [usageType, setUsageType] = useState("مسکونی");
    const [ownershipType, setOwnershipType] = useState("شخصی");
    const [estatePosition, setEstatePosition] = useState("شمالی");
    const [address, setAddress] = useState("");
    const [price, setPrice] = useState<number>(0);
    const [yearOfBuild, setYearOfBuild] = useState<number>(1400);
    const [roomNumber, setRoomNumber] = useState<number>(1);
    const [landMetrage, setLandMetrage] = useState<number>(0);
    const [usefulMetrage, setUsefulMetrage] = useState<number>(0);
    const [floorNumber, setFloorNumber] = useState<number>(1);
    const [unitInFloor, setUnitInFloor] = useState<number>(1);
    const [floor, setFloor] = useState<number>(1);
    const [features, setFeatures] = useState<string>("");
    const [documentType, setDocumentType] = useState<string>("سند تک برگ");
    const [fullName, setFullName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [userID, setUserID] = useState<string>("");
    const [Uid, setUid] = useState<string>("");
    const [tour3dlink, setTour3dlink] = useState<string>("");
    const [id, setId] = useState<number | undefined>(undefined);
    const [photo, setPhoto] = useState<string>("");
    const [tour3dRequest, setTour3dRequest] = useState<boolean>(false);
    const [check, setCheck] = useState<boolean>(true);
    const [reject, setReject] = useState<boolean>(false);

    const handleCreate = () => {
        if (
            !state ||
            !region ||
            !estateType ||
            !usageType ||
            !documentType ||
            !estatePosition ||
            !address ||
            !price ||
            !yearOfBuild ||
            !roomNumber ||
            !landMetrage ||
            !usefulMetrage ||
            !floorNumber ||
            !unitInFloor ||
            !floor ||
            !features ||
            !fullName ||
            !phone ||
            !userID ||
            !Uid
        ) {
            Swal.fire({
                title: "خطا",
                text: "لطفا همه فیلدهای ضروری را وارد کنید.",
                icon: "warning",
                confirmButtonText: "باشه",
            });
            return;
        }

        creatAnnouncementMutation.mutate({
            state_code: state,
            region: region,
            type: estateType,
            usage: usageType,
            document_type: documentType,
            location: estatePosition,
            address: address,
            price: price,
            year_of_build: yearOfBuild,
            room_number: roomNumber,
            land_metrage: landMetrage,
            useful_metrage: usefulMetrage,
            floor_number: floorNumber,
            Unit_in_floor: unitInFloor,
            floor: floor,
            features: features,
            full_name: fullName,
            phone: phone,
            userID: userID,
            Uid: Uid,
            id: id,
            photo: photo,
            tour3dRequest: tour3dRequest,
            tour3dlink: tour3dlink,
            check: check,
            reject: reject,
        });
    };

    return (
        <div className="grid lg:grid-cols-4 grid-cols-1 lg:gap-x-5 lg:gap-y-10 gap-y-4 w-full">
            <TitleCommon text="مشخصات منظقه ایی ملک" />
            <ComboBox label="استان" options={["کردستان", "تهران", "ارومیه"]} value={state} onChange={setState} />
            <ComboBox label="شهرستان" options={["سنندج", "تهران", "ارومیه"]} value={city} onChange={setCity} />
            <ComboBox label="منطقه" options={["مرکزی", "شمالی", "جنوبی"]} value={region} onChange={setRegion} />
            <ComboBox label="نوع ملک" options={["آپارتمان", "ویلایی", "زمین"]} value={estateType} onChange={setEstateType} />
            <ComboBox label="نوع کاربری" options={["مسکونی", "اداری", "تجاری"]} value={usageType} onChange={setUsageType} />
            <ComboBox label="نوع مالکیت" options={["شخصی", "دولتی"]} value={ownershipType} onChange={setOwnershipType} />
            <ComboBox label="موقعیت ملک" options={["شمالی", "جنوبی", "شرقی", "غربی"]} value={estatePosition} onChange={setEstatePosition} />
            <InputState label="آدرس" placeholder="آدرس ملک" value={address} onChange={e => setAddress(e.target.value)} />
            <InputState label="قیمت (تومان)" placeholder="مثال: 2000000" value={price} onChange={e => setPrice(Number(e.target.value))} />
            <InputState label="سال ساخت" placeholder="مثال: 1400" value={yearOfBuild} onChange={e => setYearOfBuild(Number(e.target.value))} />
            <InputState label="تعداد اتاق" placeholder="مثال: 2" value={roomNumber} onChange={e => setRoomNumber(Number(e.target.value))} />
            <InputState label="متراژ زمین" placeholder="مثال: 200" value={landMetrage} onChange={e => setLandMetrage(Number(e.target.value))} />
            <InputState label="متراژ مفید" placeholder="مثال: 150" value={usefulMetrage} onChange={e => setUsefulMetrage(Number(e.target.value))} />
            <InputState label="شماره طبقه" placeholder="مثال: 1" value={floorNumber} onChange={e => setFloorNumber(Number(e.target.value))} />
            <InputState label="تعداد واحد در طبقه" placeholder="مثال: 1" value={unitInFloor} onChange={e => setUnitInFloor(Number(e.target.value))} />
            <InputState label="طبقه" placeholder="مثال: 1" value={floor} onChange={e => setFloor(Number(e.target.value))} />
            <InputState label="امکانات" placeholder="مثال: آسانسور، پارکینگ" value={features} onChange={e => setFeatures(e.target.value)} />
            <InputState label="نوع سند" placeholder="مثال: سند تک برگ" value={documentType} onChange={e => setDocumentType(e.target.value)} />
            <InputState label="نام کامل مالک" placeholder="مثال: علی رضایی" value={fullName} onChange={e => setFullName(e.target.value)} />
            <InputState label="شماره تماس" placeholder="مثال: 09120000000" value={phone} onChange={e => setPhone(e.target.value)} />
            <InputState label="کد کاربر" placeholder="مثال: 09120000000" value={userID} onChange={e => setUserID(e.target.value)} />
            <InputState label="Uid" placeholder="مثال: 1731856016972" value={Uid} onChange={e => setUid(e.target.value)} />
            <InputState label="لینک تور سه‌بعدی" placeholder="اختیاری" value={tour3dlink} onChange={e => setTour3dlink(e.target.value)} />
            <InputState label="ID (اختیاری)" placeholder="مثال: 123" value={id ?? ""} onChange={e => setId(e.target.value ? Number(e.target.value) : undefined)} />
            <InputState label="آدرس عکس (اختیاری)" placeholder="مثال: https://..." value={photo} onChange={e => setPhoto(e.target.value)} />
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
                className="col-span-4 bg-main-color text-white px-8 py-2 rounded-full mt-4"
                onClick={handleCreate}
                disabled={creatAnnouncementMutation.isLoading}
            >
                {creatAnnouncementMutation.isLoading ? "در حال ثبت..." : "ثبت آگهی"}
            </button>
        </div>
    )
}

export default StepOne
