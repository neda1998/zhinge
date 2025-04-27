import { useState } from "react";
import RouteChevron from "../../../components/common/RouteChevron";
import { pageUploadSiteLogo } from "../../../utils/data";
import camraadd from "../../../assets/images/Cameradd.png";
import UseUploadLogo from "../../../hooks/queries/admin/uploadLogo/UseUploadLogoQuery";

const UploadSiteLogo = () => {
    const [images, setImages] = useState<string[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    const { data, isLoading, error } = UseUploadLogo();

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
                    // disabled={uploadLogoMutation.isLoading}
                >
                    ثبت لوگو
                </button>
            </div>
            {/* نمایش لوگوهای دریافتی از سرور */}
            <div className="flex flex-wrap gap-4 justify-center mt-8">
                {Array.isArray(data?.logo) && data.logo.length > 0 && data.logo.map((logoUrl: string, idx: number) => (
                    <div key={idx} className="flex flex-col items-center">
                        <div className="w-32 h-32 flex items-center justify-center border rounded-lg bg-white overflow-hidden">
                            <img
                                src={logoUrl}
                                alt={`لوگو ${idx + 1}`}
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>
                        <span className="text-xs text-gray-500 mt-2">{`لوگو ${idx + 1}`}</span>
                    </div>
                ))}
            </div>
            {isLoading && <div className="text-center mt-4">در حال دریافت لوگوها...</div>}
            {error && <div className="text-center text-red-500 mt-4">خطا در دریافت لوگوها</div>}
        </div>
    );
};

export default UploadSiteLogo;