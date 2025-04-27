import RouteChevron from "../../../components/common/RouteChevron"
import { pageAdministrativeSettings } from "../../../utils/data"
import camraadd from "../../../assets/images/Cameradd.png"
import { useState } from "react"
import Swal from "sweetalert2";
import UseUploadPhotosMutation from "../../../hooks/mutation/uploadPhotos/UseUploadPhotosMutation";

const UploadLogoOfEstate = () => {
    const [images, setImages] = useState<string[]>([]);
    const [uid, setUid] = useState("");
    const [files, setFiles] = useState<File[]>([]);

    const uploadPhotosMutation = UseUploadPhotosMutation();

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files;
        if (selectedFiles) {
            const newFiles = Array.from(selectedFiles);
            setFiles(prev => [...prev, ...newFiles].slice(0, 8));
            const newImages = newFiles.map(file => URL.createObjectURL(file));
            setImages(prev => [...prev, ...newImages].slice(0, 8));
        }
    };

    const uploadLogo = async () => {
        if (!uid || files.length === 0) {
            Swal.fire({
                title: "خطا",
                text: "لطفا Uid و تصویر را وارد کنید.",
                icon: "warning",
                confirmButtonText: "باشه"
            });
            return;
        }
        const formData = new FormData();
        files.forEach(file => formData.append("images", file));
        formData.append("Uid", uid);

        uploadPhotosMutation.mutate(formData as any);
    };

    return (
        <>
            <div className="flex items-center justify-between border-b border-b-gray-200 mb-10 lg:py-7 py-4 overflow-x-auto w-[330px] sm:w-full lg:overflow-x-visible gap-7">
                <div>
                    <span className="font-extrabold text-lg whitespace-nowrap">تنظیمات مدیریتی</span>
                </div>
                <RouteChevron items={pageAdministrativeSettings} />
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
                >
                    ثبت لوگو
                </button>
            </div>
        </>
    )
}

export default UploadLogoOfEstate
