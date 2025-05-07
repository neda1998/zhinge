import { useState, useEffect } from "react";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepOne from "./StepOne";
import UseCreatAnnouncementMutation from "../../hooks/mutation/creatAnnouncement/UseCreatAnnouncementMutation";
import Swal from "sweetalert2";

const StepperState = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const creatAnnouncementMutation = UseCreatAnnouncementMutation();
    const [type, setType] = useState("");
    const [usage, setUsage] = useState("");
    const [region, setRegion] = useState("");
    const [address, setAddress] = useState("");
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState<number | undefined>();
    const [loan, setLoan] = useState<number>();
    const [year_of_build, setYearOfBuild] = useState<number | undefined>();
    const [room_number, setRoomNumber] = useState<number | undefined>();
    const [land_metrage, setLandMetrage] = useState<number | undefined>();
    const [floor_number, setFloorNumber] = useState<number | undefined>();
    const [floor, setFloor] = useState<number | undefined>();
    const [Unit_in_floor, setUnitInFloor] = useState<number | undefined>();
    const [document_type, setDocumentType] = useState<string>("");
    const [features, setFeatures] = useState<string>("");
    const [full_name, setFullName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [state_code, setStateCode] = useState<string>("");
    const [useful_metrage, setUsefulMetrage] = useState<number | undefined>();
    const [isAnnouncementSubmitted, setIsAnnouncementSubmitted] = useState(false);

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
        if (creatAnnouncementMutation.isSuccess) {
            setIsAnnouncementSubmitted(true);
        }
    }, [creatAnnouncementMutation.isSuccess]);

    const [uploadedImages, setUploadedImages] = useState<any[]>([]);

    // تابع ریست کردن همه استیت‌ها
    const resetAllStates = () => {
        setType("");
        setUsage("");
        setRegion("");
        setAddress("");
        setLocation("");
        setPrice(undefined);
        setLoan(undefined);
        setYearOfBuild(undefined);
        setRoomNumber(undefined);
        setLandMetrage(undefined);
        setFloorNumber(undefined);
        setFloor(undefined);
        setUnitInFloor(undefined);
        setDocumentType("");
        setFeatures("");
        setFullName("");
        setPhone("");
        setStateCode("");
        setUsefulMetrage(undefined);
        setIsAnnouncementSubmitted(false);
        setUploadedImages([]);
        setCurrentStep(1);
    };

    const stepComponents = [
        <StepOne
            key="step1"
            type={type} setType={setType}
            usage={usage} setUsage={setUsage}
            region={region} setRegion={setRegion}
            address={address} setAddress={setAddress}
            price={price} setPrice={setPrice}
        />,
        <StepTwo
            key="step2"
            loan={loan} setLoan={setLoan}
            year_of_build={year_of_build} setYearOfBuild={setYearOfBuild}
            room_number={room_number} setRoomNumber={setRoomNumber}
            floor_number={floor_number} setFloorNumber={setFloorNumber}
            floor={floor} setFloor={setFloor}
        />,
        <StepThree
            key="step3"
            showSubmitButton={true}
            creatAnnouncementMutation={creatAnnouncementMutation}
            Unit_in_floor={Unit_in_floor} setUnitInFloor={setUnitInFloor}
            document_type={document_type} setDocumentType={setDocumentType}
            features={features} setFeatures={setFeatures}
            full_name={full_name} setFullName={setFullName}
            phone={phone} setPhone={setPhone}
            state_code={state_code} setStateCode={setStateCode}
            useful_metrage={useful_metrage} setUsefulMetrage={setUsefulMetrage}
            type={type} usage={usage} region={region} address={address}
            location={location} setLocation={setLocation} price={price} 
            year_of_build={year_of_build} room_number={room_number}
            land_metrage={land_metrage} floor_number={floor_number} floor={floor}
            onReset={resetAllStates} 
        />,
        <StepFour key="step4" uploadedImages={uploadedImages} setUploadedImages={setUploadedImages} />
    ];

    return (
        <div className="flex flex-col items-baseline my-10 w-full">
            <div className="flex items-center justify-between lg:min-w-[800px] min-w-full max-w-full lg:mx-auto mb-14">
                {[1, 2, 3, 4].map((step, idx) => (
                    <div className="flex items-center min-w-[25%]" key={idx}>
                        <div
                            className={`w-[48px] h-[48px] rounded-full flex items-center justify-center font-extrabold text-xl flex-none basis-[48px]
                            ${currentStep >= step ? 'bg-main-color text-white' : 'bg-gray-100 text-gray-400'}`}
                        >
                            {step}
                        </div>
                        {idx < 3 && (
                            <div
                                className={`w-full h-[2px] ${currentStep > step ? 'bg-main-color text-white' : 'bg-gray-100 text-gray-400'}`}
                            ></div>
                        )}
                    </div>
                ))}
            </div>
            <div className="mb-4 flex w-full">
                {stepComponents[currentStep - 1]}
            </div>
            <div className="flex justify-end mt-4 items-center gap-3">
                {currentStep > 1 && (
                    <button
                        onClick={handlePreviousStep}
                        className="px-8 py-2 rounded-full transition text-main-color border border-main-color bg-white"
                    >
                        قبلی
                    </button>
                )}
                {currentStep < 4 && (
                    <button
                        onClick={handleNextStep}
                        className="bg-main-color text-white px-8 py-2 rounded-full transition"
                    >
                        بعدی
                    </button>
                )}
            </div>
        </div>
    );
};

export default StepperState;
