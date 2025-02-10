/** @format */
import React, { forwardRef } from "react";
import StepProps from "./types";
import { IoCheckmarkSharp } from "react-icons/io5";

const Step = forwardRef<HTMLButtonElement, StepProps>((props, ref) => {
  const {
    variant,
    isactive,
    iscompeleted,
    label,
    length,
  } = props;

  return (
    <div
      className={`flex items-center justify-center  gap-2 ${length > 0 && "pr-2"
        }`}
    >
      <span
        {...props}
        className={`flex items-center justify-center h-[.2rem] rounded-[50%] mobile:w-0 mobile:h-0 w-[.2rem] mobile:p-4 text-[1.7rem] mobile:text-[19px] p-7 ${iscompeleted
          ? "bg-[#09A380] text-[#fff]"
          : isactive
            ? "bg-[#09A380] text-[#fff]"
            : "bg-[#D9D9D94D] text-[#1E1E1E80]"
          }`}
        ref={ref}
      >
        {iscompeleted ? (
          <IoCheckmarkSharp />
        ) : (
          label
        )}
      </span>
      {length < 5 && (
        <span
          className={` ${variant === "notheader" ? "w-[150px]" : 'w-[180px]'} mobile:w-[13px] h-[2px] ${iscompeleted
            ? "bg-[#09A380]"
            : isactive
              ? "bg-[#09A380] "
              : "bg-[#D9D9D94D]"
            }`}
          {...props}
        ></span>
      )}
    </div>
  );
});
Step.displayName = "Step";
export default Step;
