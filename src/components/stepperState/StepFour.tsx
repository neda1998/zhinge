import React, { useRef, useState } from "react";
import Swal from "sweetalert2";
import camera from "../../assets/images/camera.svg";
import UseUploadFileMutation from "../../hooks/mutation/announce/UseUploadFileMutation";
import { useCookies } from "react-cookie";

export interface UploadedImage {
  id: string;
  name: string;
  preview: string;
}

interface FileUploadProps {
  uid?: string;
  uploadedImages: UploadedImage[];
  setUploadedImages: React.Dispatch<React.SetStateAction<UploadedImage[]>>;
  onReset: () => void; 
}

const StepFour: React.FC<FileUploadProps> = ({ uid, uploadedImages, setUploadedImages, onReset }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [cookies] = useCookies(["Uid"]);
  const currentUid = uid || cookies.Uid;
  const { mutateAsync: uploadFile } = UseUploadFileMutation();
  const [pendingFiles, setPendingFiles] = useState<{ file: File; preview: string }[]>([]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      if (uploadedImages.length + pendingFiles.length >= 10) {
        Swal.fire({
          title: "خطا",
          text: "حداکثر 10 تصویر قابل آپلود است.",
          icon: "error",
          confirmButtonText: "باشه",
        });
        e.target.value = "";
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPendingFiles(prev => [...prev, { file, preview: reader.result as string }]);
      };

      e.target.value = "";
    }
  };

  const handleUploadAll = async () => {
    if (!currentUid) {
      Swal.fire({
        title: "!خطا",
        text: "شناسه کاربری موجود نیست، لطفا ابتدا آگهی خود را ثبت کنید.",
        icon: "error",
        confirmButtonText: "باشه",
      });
      return;
    }

    if (pendingFiles.length === 0) return;

    try {
      const uploadedResults = await Promise.all(
        pendingFiles.map(({ file, preview }) =>
          uploadFile({ file, uid: currentUid }).then(() => ({
            id: URL.createObjectURL(file),
            name: file.name,
            preview,
          }))
        )
      );

      Swal.fire({
        title: "موفق!",
        text: "تصاویر با موفقیت آپلود شدند.",
        icon: "success",
        confirmButtonText: "باشه",
      }).then(() => {
        onReset(); // ریست و بازگشت به مرحله اول بعد از تایید کاربر
      });

      setUploadedImages(prev => [...prev, ...uploadedResults]);
      setPendingFiles([]);
    } catch (err) {
      Swal.fire({
        title: "خطا",
        text: "خطایی هنگام آپلود تصاویر رخ داد.",
        icon: "error",
        confirmButtonText: "باشه",
      });
    }
  };

  const handleClick = () => fileInputRef.current?.click();
  const handleRemoveImage = (id: string | number) => setUploadedImages(prev => prev.filter(img => img.id !== id));
  const handleRemovePending = (idx: number | string) => setPendingFiles(prev => prev.filter((_, i) => i !== idx));

  const renderImageGrid = (images: { preview: string; id?: string; name?: string }[], onRemove: (index: number | string) => void, isPending: boolean) => (
    <div className="grid lg:grid-cols-5 sm:grid-cols-3 grid-cols-1 gap-4 mt-6 w-full">
      {images.map((item, idx) => (
        <div
          key={item.id || idx}
          className={`relative w-[8rem] h-[8rem] rounded-[20px] w-full ${isPending ? "bg-yellow-50 border-2 border-yellow-400" : "bg-[#f9f9f9]"} overflow-hidden`}
        >
          <img src={item.preview} alt={item.name || "pending"} className="w-full h-full object-cover" />
          <button
            onClick={() => onRemove(isPending ? idx : item.id!)}
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center relative w-full">
        <div className="w-full flex flex-col items-center justify-center my-12">
                <div className="flex flex-col items-center gap-4 mobile:gap-2">
                    <h1 className="text-[1.5rem] mobile:text-[18px]">آپلود تصویر ملک</h1>
                    <span className="h-[2px] w-[70%] bg-[#09A380]"></span>
                </div>
            </div>
      <div
        className="flex flex-col gap-4 items-center justify-center w-[20rem] h-[15rem] rounded-[20px] bg-[#f9f9f9] mobile:w-[15rem] mobile:h-[10rem] cursor-pointer"
        onClick={() => {
          if (uploadedImages.length + pendingFiles.length >= 10) {
            Swal.fire({
              title: "خطا",
              text: "حداکثر 10 تصویر قابل آپلود است.",
              icon: "error",
              confirmButtonText: "باشه",
            });
          } else {
            handleClick();
          }
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleFileSelect}
        />
        <img src={camera} alt="Camera Icon" className="mobile:w-[80px] object-contain" />
        <p className="text-[15px] text-[#1E1E1E80] mobile:text-[13px]">
          آپلود تصویر ملک (حداکثر 10 قطعه عکس)
        </p>
      </div>

      {pendingFiles.length > 0 && renderImageGrid(pendingFiles, handleRemovePending, true)}

      {uploadedImages.length > 0 && renderImageGrid(uploadedImages, handleRemoveImage, false)}

      <button
        onClick={handleUploadAll}
        disabled={pendingFiles.length === 0}
        className="absolute left-40 -bottom-20 z-50 bg-primary text-white px-6 py-3 rounded-[16px] shadow-lg disabled:opacity-50 bg-[#09A380] hover:bg-[#07a06c] transition-colors duration-300 flex items-center justify-center"
      >
        ثبت
      </button>
    </div>
  );
};

export default StepFour;
