import React from "react";
import { useNavigate } from "react-router-dom";
import StepperLayout from "../../../components/partial/layout/StepperLayout";
import Button from "../../../components/ui/atoms/Button";
import LayoutProfile from "../../../components/profile/LayoutProfile";
import InputState from "../../../components/ui/atoms/input/inputState";

export default function PropertyInfoDashboard() {
  const navigate = useNavigate();
  return (
    <LayoutProfile>
      <StepperLayout variant={'notheader'}>
        <div className="w-full flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-4 mobile:gap-2">
            <h1 className="text-[1.5rem] mobile:text-[18px]">امکانات ملک</h1>
            <span className="h-[2px] w-[70%] bg-[#09A380]"></span>
          </div>
        </div>
        {/* form */}
        <div className="flex flex-col items-center justify-center w-full gap-5">
          <div className="grid lg:grid-cols-2 lg:gap-10 w-full">
            <InputState label="نام و نام خانوادگی ثبت کننده" placeholder="کردستان" />
            <InputState label="قیمت فروش(تومان)" placeholder="۱۲۰۰۰" />
            <InputState label="شماره موبایل" placeholder="۰۹۱۲۳۴۵۶۷" />
            <InputState label="پست الکترونیک" placeholder="۱۲۳۴۵۶۷" />
          </div>
        </div>
        <div className="flex flex-col w-[90%] gap-10 ">
          <div className="flex items-center gap-8 mobile:gap-4">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="elevator"
                className="accent-[#09A380] w-[20px] h-[20px]"
                value={"elevator"}
              />
              <label className="text-[18px] mobile:text-[15px]">آسانسور </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="parcking"
                className="accent-[#09A380] w-[20px] h-[20px]"
                value={"parcking"}
              />
              <label className="text-[18px] mobile:text-[15px]">پارکینگ </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="storage"
                className="accent-[#09A380] w-[20px] h-[20px]"
                value={"storage"}
              />
              <label className="text-[18px] mobile:text-[15px]">انباری </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                id="balcony"
                type="radio"
                name="balcony"
                className="accent-[#09A380] w-[20px] h-[20px]"
                value={"balcony"}
              />
              <label className="text-[18px] mobile:text-[15px]">بالکن </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-10 w-[90%]">
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              id="balcony"
              name="permision"
              className="accent-[#09A380] w-[25px] mobile:w-[30px] h-[25px] mobile:h-[30px]"
              value={"permision"}
            />
            <p className="text-[1rem] font-bold mobile:text-[15px]">
              در خواست تور مجازی (تصویر برداری 360 درجه از ملک) بنویسید:
            </p>
          </div>
        </div>
        <div className="w-[90%] flex items-center gap-4 justify-end">
          <Button
            submit={"true"}
            width={"110px"}
            height={"50px"}
            bgcolor={"#D9D9D94D"}
            borderradius={"30px"}
            onClick={() => navigate("/dashboard/propertyFeaturesDashboard", { replace: true })}
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
            onClick={() => navigate("/dashboard/propertyImageDashboard", { replace: true })}
          >
            <p className="text-[1rem] font-bold">بعدی</p>
          </Button>
        </div>
      </StepperLayout>
    </LayoutProfile >
  );
}
