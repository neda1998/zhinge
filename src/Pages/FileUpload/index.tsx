import React, { useRef } from "react";
import Swal from "sweetalert2";
import camera from "../../assets/images/camera.svg";
import UseUploadFileMutation from "../../hooks/mutation/announce/UseUploadFileMutation";

export interface UploadedImage {
  id: string;  
  name: string;
  preview: string;
}

interface FileUploadProps {
  uid: string; 
  uploadedImages: UploadedImage[];
  setUploadedImages: React.Dispatch<React.SetStateAction<UploadedImage[]>>;
}

const FileUpload: React.FC<FileUploadProps> = ({ uid, uploadedImages, setUploadedImages }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: uploadFileMutation } = UseUploadFileMutation();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      if (uploadedImages.length >= 8) {
        Swal.fire({
          title: "خطا",
          text: "حداکثر ۸ تصویر قابل آپلود است.",
          icon: "error",
          confirmButtonText: "باشه",
        });
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        uploadFileMutation({ file, uid }); 
        setUploadedImages(prev => [
          ...prev,
          { id: URL.createObjectURL(file), name: file.name, preview: reader.result as string },
        ]);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      };
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = (id: string) => {
    setUploadedImages(prev => prev.filter(img => img.id !== id));
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {uploadedImages.length < 8 && (
        <div
          onClick={handleClick}
          className="flex flex-col gap-4 items-center justify-center w-[20rem] h-[15rem] rounded-[20px] bg-[#f9f9f9] mobile:w-[15rem] mobile:h-[10rem] cursor-pointer"
        >
          <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleFileUpload} />
          <img src={camera} alt="Camera Icon" className="mobile:w-[80px] object-contain" />
          <p className="text-[15px] text-[#1E1E1E80] mobile:text-[13px]">
            آپلود تصویر ملک (حداکثر ۸ قطعه عکس)
          </p>
        </div>
      )}

      {uploadedImages.length > 0 && (
        <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-4 mt-6">
          {uploadedImages.map((img) => (
            <div key={img.id} className="relative w-[8rem] h-[8rem] rounded-[20px] bg-[#f9f9f9] overflow-hidden">
              <img src={img.preview} alt={img.name} className="w-full h-full object-cover" />
              <button
                onClick={() => handleRemoveImage(img.id)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
