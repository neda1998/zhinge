import React from "react";
import StepperLayout from "../../components/partial/layout/StepperLayout";
import Button from "../../components/ui/atoms/Button";
import Select from "../../components/ui/atoms/Select";
import Input from "../../components/ui/atoms/input";
import { useNavigate } from "react-router-dom";
import InputState from "../../components/ui/atoms/input/inputState";
import ComboBox from "../../components/common/Combo";

export default function DetailsProperty() {
  const navigate = useNavigate();
  return (
    <StepperLayout>
      <div className="w-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-4 mobile:gap-2">
          <h1 className="text-[1.5rem] mobile:text-[18px]">
            مشخصات ساختاری ملک
          </h1>
          <span className="h-[2px] w-[70%] bg-[#09A380]"></span>
        </div>
      </div>
      {/* form */}
      <div className="flex flex-col items-center justify-center w-full gap-5">
            <div className="grid lg:grid-cols-2 lg:gap-10 w-full">
              <InputState label="مساحت کل بر حسب متر مربع" placeholder="۱۲۰" />
              <InputState label="مساحت زیر بنا بر حسب متر مربع" placeholder="۱۳۰" />
              <InputState label="سال ساخت" placeholder="۱۳۷۰" />
              <InputState label="تعداد اتاق خواب" placeholder="۳" />
              <InputState label="طبقه مورد نظر" placeholder="۳" />
              <InputState label="تعداد طبقات" placeholder="۴" />
              <InputState label="تعداد واحد هر طبقه" placeholder="۱" />
            </div>
          </div>
        <div className="w-[90%] flex items-center gap-4 justify-end">
          <Button
            submit={"true"}
            width={"110px"}
            height={"50px"}
            bgcolor={"#D9D9D94D"}
            borderradius={"30px"}
            className={'mobile:mb-10'}

            onClick={() => navigate("/realState", { replace: true })}
          >
            <p className="text-[1rem] font-bold">قبلی</p>
          </Button>
          <Button
            submit={"true"}
            width={"110px"}
            height={"50px"}
            bgcolor={"#09A380"}
            borderradius={"30px"}
            color={"white"}
            className={'mobile:mb-10'}

            onClick={() => navigate("/propertyFeatures", { replace: true })}
          >
            <p className="text-[1rem] font-bold">بعدی</p>
          </Button>
        </div>
    </StepperLayout>
  );
}
