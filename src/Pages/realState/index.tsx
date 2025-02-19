import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/atoms/Button";
import InputState from "../../components/ui/atoms/input/inputState";
import ComboBox from "../../components/common/Combo"
import StepperLayout from "../../components/partial/layout/StepperLayout";
import Header from "../../components/template/Header";

export default function RegionalInfoProperty() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <StepperLayout variant="notheader">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-4 mobile:gap-2">
            <h1 className="text-[1.5rem] mobile:text-[18px]">
              مشخصات منطقه ایی ملک
            </h1>
            <span className="h-[2px] w-[70%] bg-[#09A380]"></span>
          </div>
        </div>
        {/* form */}
        <div className="flex flex-col items-center justify-center w-full gap-5">
          <div className="grid lg:grid-cols-2 lg:gap-10 w-full">
            <InputState label="استان" placeholder="کردستان" />
            <InputState label="شهرستان" placeholder="سنندج" />
            <ComboBox options={["شهرک زاگرس", "شهرک آبیدر"]} label="منطقه" />
            <InputState label="آدرس ملک" placeholder="خیابان اوراز" />
            <ComboBox options={["ویلایی"]} label="نوع ملک" />
            <ComboBox options={["مسکونی"]} label="نوع کاربری" />
            <ComboBox options={["قولنامه"]} label="نوع مالکیت" />
            <ComboBox options={["جنوبی"]} label="موقعیت ملک" />
          </div>
        </div>
        <div className="w-[90%] flex items-center justify-end">
          <Button
            submit={"true"}
            width={"110px"}
            height={"50px"}
            bgcolor={"#09A380"}
            borderradius={"30px"}
            color={"white"}
            onClick={() => navigate("/dashboard/detailsPropertyDashboard", { replace: true, state: { variant: 'notheader' } })}
          >
            <p className="text-[1rem] font-bold">بعدی</p>
          </Button>
        </div>
      </StepperLayout>
    </>
  );
}
