import { useState, useEffect } from "react";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepOne from "./StepOne";
import React from "react";

const StepperState = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const handleNextStep = () => {
        if (currentStep < 4) {
            setCurrentStep((prevStep) => prevStep + 1);
        }
    };

    const handlePreviousStep = () => {
        if (currentStep > 1) {
            setCurrentStep((prevStep) => prevStep - 1);
        }
    };

    useEffect(() => {
        setCurrentStep(1);
    }, []);

    const [uploadedImages, setUploadedImages] = useState<any[]>([]);

    // اضافه کردن prop برای نمایش دکمه ثبت آگهی در گام سوم
    const stepComponents = [
        <StepOne key="step1" />,
        <StepTwo key="step2" />,
        <StepThree key="step3" showSubmitButton={true} />,
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
