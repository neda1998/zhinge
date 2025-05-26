import { useEffect, useState } from "react";
import LayoutProfile from "../../../components/profile/LayoutProfile";
import Swal from "sweetalert2";
import StepOneUser from "./StepOneUser";
import StepTwoUser from "./StepTwoUser";
import StepThreeUser from "./StepThreeUser";
import StepFourUser from "./StepFourUser";
import useCreateAnnounceMutation from "../../../hooks/mutation/announce/useCreateAnnounceMutation";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function Realstate() {
  const { mutate } = useCreateAnnounceMutation();
   const [cookies] = useCookies(["accessToken"]);
    const navigate = useNavigate();

  const [loan, setLoan] = useState<number>(0);
  const [type, setType] = useState("-");
  const [region, setRegion] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [document_type, setDocumentType] = useState<string>("");
   const [land_metrage, setLandMetrage] = useState<number | undefined>();
  const [useful_metrage, setUsefulMetrage] = useState<number | undefined>(0);
  const [floor_number, setFloorNumber] = useState<string>(""); 
  const [floor, setFloor] = useState<string>("");
  const [Unit_in_floor, setUnitInFloor] = useState<number | undefined>(0);
  const [year_of_build, setYearOfBuild] = useState<number | undefined>(0);
  const [full_name, setFullName] = useState<string>("");
  const [price, setPrice] = useState<number | undefined>();
  const [room_number, setRoomNumber] = useState<number | undefined>(0);
  const [features, setFeatures] = useState<string>("-");
  const [uploadedImages, setUploadedImages] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnnouncementSubmitted, setIsAnnouncementSubmitted] = useState(false);
  const [description, setDescription] = useState<string>("");
  const [state_code, setStateCode] = useState<string>("-");
  const [usage, setUsage] = useState<string>("");

  const handleNextStep = () => {
    if (currentStep === 3 && !isAnnouncementSubmitted) {
      Swal.fire({
        icon: "warning",
        title: "اخطار",
        text: "لطفا ابتدا اطلاعات را ثبت کنید!",
        confirmButtonText: "باشه"
      });
      return;
    }
    if (currentStep < 4) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prevStep) => prevStep - 1);
      if (currentStep === 4) {
        setIsAnnouncementSubmitted(false);
      }
    }
  };

  useEffect(() => {
    setCurrentStep(1);
  }, []);
  
   useEffect(() => {
    if (!cookies.accessToken) {
      Swal.fire({
        icon: "warning",
        title: "ورود الزامی است",
        text: "لطفا ابتدا ثبت‌ نام یا وارد شوید.",
        confirmButtonText: "ورود به حساب کاربری"
      }).then(() => {
        navigate("/Login", { replace: true });
      });
    }
  }, [cookies, navigate]);

  const handleSubmit = () => {
    const toNumberOrUndefined = (val: any) => {
      if (val === undefined || val === null || val === "") return undefined;
      const num = Number(val.toString().replace(/,/g, ""));
      return isNaN(num) ? undefined : num;
    };

    const rawData = {
      Unit_in_floor: toNumberOrUndefined(Unit_in_floor),
      address: address || "",
      document_type: document_type || "",
      features: features || "",
      floor: toNumberOrUndefined(floor),
      floor_number: toNumberOrUndefined(floor_number), 
      full_name: full_name || "",
      land_metrage: toNumberOrUndefined(land_metrage),
      loan: toNumberOrUndefined(loan),
      location: location || "",
      price: toNumberOrUndefined(price),
      region: region || "",
      room_number: toNumberOrUndefined(room_number),
      type: type || "",
      useful_metrage: toNumberOrUndefined(useful_metrage),
      year_of_build: toNumberOrUndefined(year_of_build),
      usage:usage || "-",
      description: description || "",
    };
    mutate(rawData as any, {
      onSuccess: () => {
        setIsAnnouncementSubmitted(true);
      }
    });
  };
  const 
  resetAllStates = () => {
        setType("");
        setRegion("");
        setAddress("");
        setLocation("");
        setPrice(undefined);
        setLoan(0);
        setYearOfBuild(undefined);
        setRoomNumber(undefined);
        setLandMetrage(undefined);
        setFloorNumber(""); 
        setFloor("");
        setUnitInFloor(undefined);
        setDocumentType("");
        setFeatures("");
        setFullName("");
        setStateCode("");
        setUsefulMetrage(undefined);
        setIsAnnouncementSubmitted(false);
        setUploadedImages([]);
        setCurrentStep(1);
        setUsage("");
        setDescription("");
    };


  const stepComponents = [
    <StepOneUser
      key="step1"
      type={type} setType={setType}
      region={region} setRegion={setRegion}
      address={address} setAddress={setAddress}
      Unit_in_floor={Unit_in_floor} setUnitInFloor={setUnitInFloor}
      document_type={document_type} setDocumentType={setDocumentType}
      floor_number={floor_number} setFloorNumber={setFloorNumber}
      floor={floor} setFloor={setFloor}
      room_number={room_number} setRoomNumber={setRoomNumber}
      usage={usage} setUsage={setUsage}
    />,
    <StepTwoUser
      key="step2"
      loan={loan} setLoan={setLoan}
      year_of_build={year_of_build} setYearOfBuild={setYearOfBuild}
      useful_metrage={useful_metrage} setUsefulMetrage={setUsefulMetrage}
      location={location} setLocation={setLocation}
      land_metrage={land_metrage} setLandMetrage={setLandMetrage}
      features={features} setFeatures={setFeatures}
      price={price} setPrice={setPrice}
      description={description}
      setDescription={setDescription}
      type={type} 
    />,
    <StepThreeUser
      key="step3"
      full_name={full_name} setFullName={setFullName}
      onSibmit={handleSubmit}
      isAnnouncementSubmitted={isAnnouncementSubmitted}
      onReset={resetAllStates}
      type={type}
      setLocation={setLocation}
    />,
    <StepFourUser
      key="step4"
      uploadedImages={uploadedImages}
      setUploadedImages={setUploadedImages}
    />
  ];

  return (
    <LayoutProfile>
      <div className="flex flex-col items-center py-10">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl py-6 px-3 md:p-10 flex flex-col items-center border border-gray-100">
          <h1 className="text-2xl md:text-3xl font-extrabold text-main-color mb-2 tracking-tight text-center">
            ثبت آگهی ملک جدید
          </h1>
          <p className="text-gray-500 mb-8 text-center text-base md:text-lg">
            لطفا اطلاعات ملک خود را مرحله به مرحله وارد کنید. پس از ثبت، کارشناسان ما در اسرع وقت با شما تماس خواهند گرفت.
          </p>
          <div className="flex items-center justify-between w-full max-w-xl mb-12">
            {[1, 2, 3, 4].map((step, idx) => (
              <div className="flex items-center min-w-[25%]" key={idx}>
                <div
                  className={`sm:w-12 w-10 sm:h-12 h-10 rounded-full flex items-center justify-center font-extrabold text-lg flex-none shadow-md transition-all duration-300
                  ${currentStep >= step ? 'bg-main-color text-white scale-110' : 'bg-gray-100 text-gray-400'}`}
                >
                  {step}
                </div>
                {idx < 3 && (
                  <div
                    className={`w-full h-1 mx-1 transition-all duration-300 rounded-full
                    ${currentStep > step ? 'bg-main-color' : 'bg-gray-200'}`}
                  ></div>
                )}
              </div>
            ))}
          </div>
          <div className="mb-4 w-full">
            {stepComponents[currentStep - 1]}
          </div>
          <div className="flex justify-end mt-6 items-center gap-4 w-full">
            {currentStep > 1 && (
              <button
                onClick={handlePreviousStep}
                className="px-8 py-2 rounded-full border border-main-color text-main-color bg-white font-bold shadow-sm hover:bg-main-color hover:text-white transition-all duration-200"
              >
                قبلی
              </button>
            )}
            {currentStep < 4 && (
              <button
                onClick={handleNextStep}
                className="bg-main-color text-white px-8 py-2 rounded-full font-bold shadow-md hover:bg-green-700 transition-all duration-200"
              >
                بعدی
              </button>
            )}
          </div>
        </div>
      </div>
    </LayoutProfile>
  );
}