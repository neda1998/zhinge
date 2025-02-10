/** @format */
import React, { forwardRef } from "react";
import Step from "../../atoms/Step";
import StepperProps from "./types";

const Stepper = forwardRef<HTMLButtonElement, StepperProps>((props, ref) => {
  const {
    variant,
    steps,
    currentStep,
  } = props;
  return (
    <div className={" flex items-center justify-between"}>
      {steps.map((step, index) => {
        return (
          <Step
            variant={variant ? variant : ''}
            step={"true"}
            key={index}
            label={step}
            isactive={index === currentStep}
            iscompeleted={index < currentStep}
            length={index}
          />
        );
      })}
    </div>
  );
});

Stepper.displayName = "Stepper";
export default Stepper;
