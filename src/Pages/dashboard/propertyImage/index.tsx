import React, { useState } from "react";
import StepperLayout from "../../../components/partial/layout/StepperLayout";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/atoms/Button";
import camera from "../../../assets/images/camera.svg";
import Input from "../../../components/ui/atoms/input";
import LayoutProfile from "../../../components/profile/LayoutProfile";

export default function PropertyImageDashboard() {
  const navigate = useNavigate();
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [uploadedFile, setUploadedFile] = useState<any>();
  const handleFileUploads = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      setUploadedFileName(file.name);

      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result?.toString().split(",")[1];
        setUploadedFile(base64String);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <LayoutProfile>
      <StepperLayout variant={'notheader'}>
        <>
          <div className="w-full flex flex-col items-center justify-center">
            <div className="flex flex-col items-center gap-4 mobile:gap-2">
              <h1 className="text-[1.5rem] mobile:text-[18px]">
                آپلود تصویر ملک
              </h1>
              <span className="h-[2px] w-[70%] bg-[#09A380]"></span>
            </div>
          </div>
          <div className="flex flex-col w-[90%] gap-10 mobile:w-full mobile:gap-4 mobile:h-full">
            {!uploadedFileName && (
              <div className="w-full flex items-center justify-center">
                <div className="flex flex-col gap-4 items-center justify-center w-[20rem] h-[15rem] rounded-[20px] bg-[#D9D9D980] mobile:w-[15rem] mobile:h-[10rem]">
                  <Input
                    type="file"
                    accept={uploadedFile}
                    hidden
                    onChange={handleFileUploads}
                    className="w-full h-full"
                  />
                  <img
                    src={camera}
                    alt="icons"
                    className="mobile:w-[80px] object-contain"
                  />
                  <p className="text-[15px] text-[#1E1E1E80] mobile:text-[13px]">
                    آپلود تصویر ملک (حداکثر 8 قطعه عکس)
                  </p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-6 justify-center">
              <div className="w-[8rem] h-[8rem] rounded-[20px] bg-[#D9D9D980] mobile:w-[9rem] mobile:h-[6rem]"></div>
              <div className="w-[8rem] h-[8rem] rounded-[20px] bg-[#D9D9D980] mobile:w-[9rem] mobile:h-[6rem]"></div>
              <div className="w-[8rem] h-[8rem] rounded-[20px] bg-[#D9D9D980] mobile:w-[9rem] mobile:h-[6rem]"></div>
            </div>
            <div className="w-[90%] flex items-center gap-4 justify-end">
              <Button
                submit={"true"}
                width={"110px"}
                height={"50px"}
                bgcolor={"#D9D9D94D"}
                borderradius={"30px"}
                onClick={() => navigate("/dashboard/propertyInfoDashboard", { replace: true })}
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
                onClick={() => navigate("/dashboard/successfullyAddDashboard", { replace: true })}
              >
                <p className="text-[1rem] font-bold">بعدی</p>
              </Button>
            </div>
          </div>
        </>
      </StepperLayout>
    </LayoutProfile>
  );
}
