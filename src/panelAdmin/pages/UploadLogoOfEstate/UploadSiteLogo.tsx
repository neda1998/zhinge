import { useState } from "react";
import RouteChevron from "../../../components/common/RouteChevron"
import { pageUploadSiteLogo } from "../../../utils/data"
import camraadd from "../../../assets/images/Cameradd.png"


const UploadSiteLogo = () => {
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
    return (
        <div>
            <div className="flex items-center justify-between border-b border-b-gray-200 mb-10 lg:py-7 py-4 overflow-x-auto w-[330px] sm:w-full lg:overflow-x-visible gap-7">
                <div>
                    <span className="text-black font-extrabold text-lg whitespace-nowrap">تنظیمات مدیریتی</span>
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
            </div>
        </div>
    )
}

export default UploadSiteLogo 