import StepperLayout from "../../../components/partial/layout/StepperLayout";
import Button from "../../../components/ui/atoms/Button";
import Input from "../../../components/ui/atoms/input";
import { useNavigate } from "react-router-dom";
import LayoutProfile from "../../../components/profile/LayoutProfile";

export default function DetailsPropertyDashboard() {
  const navigate = useNavigate();

  return (
    <>
      <LayoutProfile>
        <StepperLayout variant={'notheader'}>
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
            <div className="flex justify-between gap-12 w-[90%] mobile:flex-wrap mobile:gap-4 mobile:w-[100%]">
              <div className="flex flex-col gap-8 w-[50%] mobile:w-full mobile:gap-4">
                <div className="flex flex-col gap-2">
                  <p className="text-[16px] text-[#1E1E1E66] px-4 mobile:text-[14px]">
                    مساحت کل بر حسب متر مربع
                  </p>
                  <Input
                    id="squerErea"
                    name="squerErea"
                    placeholder="120"
                    base="true"
                    height="52px"
                    bgcolor="#D9D9D966"
                    borderradius="30px"
                    width={"100%"}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-[16px] text-[#1E1E1E66] px-4 mobile:text-[14px]">
                    سال ساخت{" "}
                  </p>
                  <Input
                    id="year"
                    name="year"
                    placeholder="1395"
                    base="true"
                    height="52px"
                    bgcolor="#D9D9D966"
                    borderradius="30px"
                    width={"100%"}
                  />
                </div>
                <div className="flex flex-col items-start gap-2">
                  <p className="text-[16px] text-[#1E1E1E66] px-4 mobile:text-[14px]">
                    طبقه مورد نظر
                  </p>
                  <Input
                    id="floor"
                    name="floor"
                    placeholder="3"
                    base="true"
                    height="52px"
                    bgcolor="#D9D9D966"
                    borderradius="30px"
                    width={"100%"}
                  />
                </div>
                <div className="flex flex-col items-start gap-2">
                  <p className="text-[16px] text-[#1E1E1E66] px-4 mobile:text-[14px]">
                    تعداد واحد هر طبقه
                  </p>
                  <Input
                    id="unit"
                    name="unit"
                    placeholder="1"
                    base="true"
                    height="52px"
                    bgcolor="#D9D9D966"
                    borderradius="30px"
                    width={"100%"}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-8 w-[50%] mobile:w-full mobile:gap-4">
                <div className="flex flex-col items-start gap-2">
                  <p className="text-[16px] text-[#1E1E1E66] px-4 mobile:text-[14px]">
                    مساحت زیر بنا برحسب متر مربع
                  </p>
                  <Input
                    id="squer"
                    name="squer"
                    placeholder="130"
                    base="true"
                    height="52px"
                    bgcolor="#D9D9D966"
                    borderradius="30px"
                    width={"100%"}
                  />
                </div>
                <div className="flex flex-col items-start gap-2">
                  <p className="text-[16px] text-[#1E1E1E66] px-4 mobile:text-[14px]">
                    تعداد اتاق خواب{" "}
                  </p>
                  <Input
                    id="bedroom"
                    name="bedroom"
                    placeholder="3"
                    base="true"
                    height="52px"
                    bgcolor="#D9D9D966"
                    borderradius="30px"
                    width={"100%"}
                  />
                </div>
                <div className="flex flex-col items-start gap-2">
                  <p className="text-[16px] text-[#1E1E1E66] px-4 mobile:text-[14px]">
                    تعداد طبقات
                  </p>
                  <Input
                    id="totalFloor"
                    name="totalFloor"
                    placeholder="3"
                    base="true"
                    height="52px"
                    bgcolor="#D9D9D966"
                    borderradius="30px"
                    width={"100%"}
                  />
                </div>
              </div>
            </div>
            <div className="w-[90%] flex items-center gap-4 justify-end">
              <Button
                submit={"true"}
                width={"110px"}
                height={"50px"}
                bgcolor={"#D9D9D94D"}
                borderradius={"30px"}
                onClick={() => navigate("/dashboard/realState", { replace: true })}
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
                onClick={() => navigate("/dashboard/propertyFeaturesDashboard", { replace: true })}
              >
                <p className="text-[1rem] font-bold">بعدی</p>
              </Button>
            </div>
          </div>
        </StepperLayout>
      </LayoutProfile>
    </>
  );
}
