import { useState } from "react";
import RouteChevron from "../../../components/common/RouteChevron"
import { pageUploadSiteLogo } from "../../../utils/data"
import camraadd from "../../../assets/images/Cameradd.png"
import Swal from "sweetalert2";
import UseUploadLogo from "../../../hooks/mutation/uploadLogo/UseUploadLogo";



const UploadSiteLogo = () => {
    const [images, setImages] = useState<string[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    const uploadLogoMutation = UseUploadLogo();

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files;
        if (selectedFiles) {
            const newFiles = Array.from(selectedFiles);
            setFiles(prev => [...prev, ...newFiles].slice(0, 8));
            const newImages = newFiles.map(file =>
                URL.createObjectURL(file)
            );
            setImages(prev => [...prev, ...newImages].slice(0, 8));
        }
    };

    const uploadLogo = async () => {
        if (files.length === 0) {
            Swal.fire({
                title: "خطا",
                text: "لطفا تصویر را انتخاب کنید.",
                icon: "warning",
                confirmButtonText: "باشه"
            });
            return;
        }
        uploadLogoMutation.mutate({ files });
    };

    return (
        <div>
            <div className="flex items-center justify-between border-b border-b-gray-200 mb-10 lg:py-7 py-4 overflow-x-auto w-[330px] sm:w-full lg:overflow-x-visible gap-7">
                <div>
                    <span className="font-extrabold text-lg whitespace-nowrap">تنظیمات مدیریتی</span>
                </div>
                <RouteChevron items={pageUploadSiteLogo} />
            </div>
            <div className="flex flex-col items-center justify-center bg-gray-50 px-6 py-9 mx-auto rounded-xl w-full cursor-pointer my-14">
                <img
                    src={camraadd}
                    alt="camraadd"
                    className="w-[100px] h-[100px]"
                    onClick={() => document.getElementById("fileInput")?.click()}
                />
                <span className="text-gray-400">
                    آپلود تصویر
                </span>
                <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                />
                <button
                    className="bg-main-color text-white rounded-full px-8 py-2 mt-4"
                    onClick={uploadLogo}
                    disabled={uploadLogoMutation.isLoading}
                >
                    ثبت لوگو
                </button>
            </div>
        </div>
    )
}

export default UploadSiteLogo