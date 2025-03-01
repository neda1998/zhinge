import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/atoms/Button";
import LayoutProfile from "../../components/profile/LayoutProfile";
import FileUpload, { UploadedImage } from "../FileUpload";

export default function PropertyImage() {
  const navigate = useNavigate();
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);

  return (
    <LayoutProfile>
      <div className="w-full flex flex-col items-center justify-center my-12">
        <div className="flex flex-col items-center gap-4 mobile:gap-2">
          <h1 className="text-[1.5rem] mobile:text-[18px]">آپلود تصویر ملک</h1>
          <span className="h-[2px] w-[70%] bg-[#09A380]"></span>
        </div>
      </div>

      <div className="w-[90%] mx-auto flex flex-col gap-10 mobile:gap-4 mobile:h-full">
        <FileUpload uploadedImages={uploadedImages} setUploadedImages={setUploadedImages} />

        <div className="w-[90%] flex items-center gap-4 justify-end">
          <Button
            submit={"true"}
            width={"110px"}
            height={"50px"}
            bgcolor={"#D9D9D94D"}
            borderradius={"30px"}
            onClick={() => navigate("/propertyInfo", { replace: true })}
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
            onClick={() => navigate("/successfullyAdd", { replace: true })}
          >
            <p className="text-[1rem] font-bold">بعدی</p>
          </Button>
        </div>
      </div>
    </LayoutProfile>
  );
}
