import React, { useState } from "react";
import LayoutProfile from "../../components/profile/LayoutProfile";
import FileUpload, { UploadedImage } from "../FileUpload";
import { useCookies } from "react-cookie";

export default function PropertyImage() {
  const [cookies] = useCookies(["Uid"]);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const uid = cookies.Uid || "";

  return (
    <LayoutProfile>
      <div className="w-full flex flex-col items-center justify-center my-12">
        <div className="flex flex-col items-center gap-4 mobile:gap-2">
          <h1 className="text-[1.5rem] mobile:text-[18px]">آپلود تصویر ملک</h1>
          <span className="h-[2px] w-[70%] bg-[#09A380]"></span>
        </div>
      </div>
      <div className="w-[90%] mx-auto flex flex-col gap-10 mobile:gap-4">
        <FileUpload uid={uid} uploadedImages={uploadedImages} setUploadedImages={setUploadedImages} />
      </div>
    </LayoutProfile>
  );
}
