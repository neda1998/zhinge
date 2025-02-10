import React, { useState } from "react";
import StepperLayout from "../../components/partial/layout/StepperLayout";
import Button from "../../components/ui/atoms/Button";
import { useNavigate } from "react-router-dom";
import camraadd from "../../assets/images/Cameradd.png"


export default function SuccessfullyAdd() {
  const [images, setImages] = useState<string[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map(file =>
        URL.createObjectURL(file)
      );
      setImages(prev => [...prev, ...newImages].slice(0, 8));
    }
  };
  const navigate = useNavigate();
  return (
    <StepperLayout>
      <div className="w-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-[1.5rem]">آپلود تصویر ملک</h1>
          <span className="h-[2px] w-[70%] bg-[#09A380]"></span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center bg-gray-50 px-6 py-9 mx-auto rounded-xl w-full cursor-pointer my-14">
        <img
          src={camraadd}
          alt="camraadd"
          className="w-[100px] h-[100px]"
          onClick={() => document.getElementById("fileInput")?.click()}
        />
        <span className="text-gray-400">
          آپلود تصویر ملک (حداکثر ۸ قطعه عکس)
        </span>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>
      <div className="flex items-center justify-center gap-8 mt-6">
        {images.map((image, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center bg-gray-50 px-6 py-9 rounded-xl w-[180px] h-[160px]"
          >
            <img
              src={image}
              alt={`uploaded-${index}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
      <div className="w-full h-[40vh] flex items-center justify-center">
        <Button
          submit={"true"}
          width={"250px"}
          height={"50px"}
          bgcolor={"#09A380"}
          borderradius={"30px"}
          onClick={() => navigate("/", { replace: true })}
        >
          <p className="text-[1rem] font-bold">مشاهده آگهی</p>
        </Button>
      </div>
    </StepperLayout>
  );
}
