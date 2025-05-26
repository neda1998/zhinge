import { useState, useEffect } from "react";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepOne from "./StepOne";
import UseCreatAnnouncementMutation from "../../hooks/mutation/creatAnnouncement/UseCreatAnnouncementMutation";
import StepFourUser from "../../Pages/dashboard/realState/StepFourUser";
import Swal from "sweetalert2";

const StepperState = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const creatAnnouncementMutation = UseCreatAnnouncementMutation();
    const [type, setType] = useState("-");
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
    const [floor, setFloor] = useState<string>("");
    const [Unit_in_floor, setUnitInFloor] = useState<number | undefined>();
    const [document_type, setDocumentType] = useState<string>("");
    const [features, setFeatures] = useState<string>("");
    const [full_name, setFullName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [state_code, setStateCode] = useState<string>("-");
    const [useful_metrage, setUsefulMetrage] = useState<number | undefined>();
    const [isAnnouncementSubmitted, setIsAnnouncementSubmitted] = useState(false);
    const [description, setDescription] = useState<string>("");

    const handleNextStep = () => {
        if (currentStep === 3 && !creatAnnouncementMutation.isSuccess) {
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
            setCurrentStep(3);
        }
    }, [creatAnnouncementMutation.isSuccess]);

    const [uploadedImages, setUploadedImages] = useState<any[]>([]);

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
        setFloor("");
        setUnitInFloor(undefined);
        setDocumentType("");
        setFeatures("");
        setFullName("");
        setPhone("");
        setStateCode("");
        setUsefulMetrage(undefined);
        setIsAnnouncementSubmitted(false);
        setUploadedImages([]);
        setDescription(""); 
        setCurrentStep(1);
    };

    const stepComponents = [
        <StepOne
            key="step1"
            usage={usage} setUsage={setUsage}
            region={region} setRegion={setRegion}
            address={address} setAddress={setAddress}
            Unit_in_floor={Unit_in_floor} setUnitInFloor={setUnitInFloor}
            document_type={document_type} setDocumentType={setDocumentType}
            floor_number={floor_number} setFloorNumber={setFloorNumber}
            floor={floor} setFloor={setFloor}
            room_number={room_number} setRoomNumber={setRoomNumber}
        />,
        <StepTwo
            key="step2"
            loan={loan} setLoan={setLoan}
            year_of_build={year_of_build} setYearOfBuild={setYearOfBuild}
            setPrice={setPrice}
            price={price}
            features={features} setFeatures={setFeatures}
            useful_metrage={useful_metrage} setUsefulMetrage={setUsefulMetrage}
            location={location} setLocation={setLocation}
            land_metrage={land_metrage} setLandMetrage={setLandMetrage}
            description={description} setDescription={setDescription}
            type={type}
        />,
        <StepThree
            key="step3"
            showSubmitButton={true}
            creatAnnouncementMutation={creatAnnouncementMutation}
            full_name={full_name} setFullName={setFullName}
            phone={phone} setPhone={setPhone}
            type={type} usage={usage} region={region} address={address}
            location={location} setLocation={setLocation} price={price}
            year_of_build={year_of_build} room_number={room_number}
            land_metrage={land_metrage} floor_number={floor_number} floor={floor}
            onReset={resetAllStates}
            description={description} setDescription={setDescription}
            features={features} setFeatures={setFeatures}
        />,
        <StepFourUser
            key="step4"
            uploadedImages={uploadedImages}
            setUploadedImages={setUploadedImages}
        />
    ];

    return (
        <div className="w-full min-h-screen flex flex-col items-center py-10 px-2">
            <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl p-6 md:p-10 flex flex-col items-center border border-gray-100">
                <h1 className="text-2xl md:text-3xl font-extrabold text-main-color mb-2 tracking-tight text-center">
                    ثبت آگهی ملک جدید
                </h1>
                <p className="text-gray-500 mb-8 text-center text-base md:text-lg">
                    لطفا اطلاعات ملک را مرحله به مرحله وارد کنید. پس از ثبت، کارشناسان ما در اسرع وقت با شما تماس خواهند گرفت.
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
                    {currentStep > 1 && currentStep < 4 && (
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
    );
};

export default StepperState;
