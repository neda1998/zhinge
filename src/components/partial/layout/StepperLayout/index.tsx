import React, { useEffect, useState } from "react";
import Header from "../../../template/Header";
import Stepper from "../../../ui/molecules/Stepper";
import { useLocation } from "react-router-dom";

const steps = ["1", "2", "3", "4", "5", "6"];

interface StepperLayoutProps {
  children: React.ReactNode;
  variant?: "notheader" | any;
}

export default function StepperLayout({
  children,
  variant,
}: StepperLayoutProps) {
  const [stepper, setStepper] = useState(0);
  const { pathname } = useLocation();
  const splitedPath = pathname.split("/");
  const endPoint = splitedPath[splitedPath.length - 1];

  useEffect(() => {
    endPoint === "realState"
      ? setStepper(0)
      : endPoint === "detailsProperty" ||
        endPoint === "detailsPropertyDashboard"
        ? setStepper(1)
        : endPoint === "propertyFeatures" ||
          endPoint === "propertyFeaturesDashboard"
          ? setStepper(2)
          : endPoint === "propertyInfo" || endPoint === "propertyInfoDashboard"
            ? setStepper(3)
            : endPoint === "propertyImage" || endPoint === "propertyImageDashboard"
              ? setStepper(4)
              : endPoint === "successfullyAdd" || endPoint === "successfullyAddDashboard" ? setStepper(6) : setStepper(0)
  }, []);

  return (
    <React.Fragment>
      {variant !== "notheader" ? (
        <>
          <Header />
        </>
      ) : (
        <></>
      )}
      <div
        className={`flex flex-col py-[2rem] gap-12 px-[80px] items-center mobile:gap-8 mobile:p-0 mobile:py-0 ${variant === "notheader" ? "px-[50px]" : "justify-center"
          }`}
      >
        <div
          className={`flex items-center  ${variant === "notheader"
              ? "justify-center"
              : "justify-center mt-24 mb-10"
            }`}
        >
          <Stepper
            variant="notheader"
            currentStep={stepper}
            stepper={"true"}
            steps={steps}
          />
        </div>
        {children}
      </div>
    </React.Fragment>
  );
}
