import { useNavigate } from "react-router-dom";
import StepperLayout from "../../../components/partial/layout/StepperLayout";
import Button from "../../../components/ui/atoms/Button";
import LayoutProfile from "../../../components/profile/LayoutProfile";

export default function PropertyFeaturesDashboard() {
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
        <div className="flex flex-col items-center justify-center w-full gap-10">
          <div className="flex flex-col w-full gap-8 mobile:gap-4">
            <p className="text-[1.2rem] font-bold mobile:text-[16px]">ملک من دارای امکانات :</p>
            <div className="flex items-center gap-8 mobile:gap-6">
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
          <div className="flex flex-col gap-5 w-full">
            <p className="text-[1.2rem] font-bold mobile:text-[16px]">
              ملک شما اگر از امکانت بیشتر برخوردار است ، در توضیحات آن را بنویسید:
            </p>
            <textarea
              className="outline-none border border-[#1E1E1E80] rounded-[20px] p-8"
              name="describtion"
              id="describtion"
              rows={4}
            ></textarea>
          </div>
          <div className="w-[90%] flex items-center gap-4 justify-end">
            <Button
              submit={"true"}
              width={"110px"}
              height={"50px"}
              bgcolor={"#D9D9D94D"}
              borderradius={"30px"}
              onClick={() => navigate("/dashboard/detailsPropertyDashboard", { replace: true })}
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
              onClick={() => navigate("/dashboard/propertyInfoDashboard", { replace: true })}
            >
              <p className="text-[1rem] font-bold">بعدی</p>
            </Button>
          </div>
        </div>
      </StepperLayout>
    </LayoutProfile>
  );
}
