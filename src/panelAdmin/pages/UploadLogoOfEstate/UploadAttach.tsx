import { useState } from "react";
import RouteChevron from "../../../components/common/RouteChevron"
import { pageUploadAttach } from "../../../utils/data"
import camraadd from "../../../assets/images/Cameradd.png"
import Swal from "sweetalert2";
import UseUploadsliderPhotosMutation from "../../../hooks/mutation/uploadsliderPhotos/UseUploadsliderPhotosMutation";
import Cookies from "js-cookie";

const UploadAttach = () => {
    const [images, setImages] = useState<string[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);

    const uploadSliderPhotosMutation = UseUploadsliderPhotosMutation();

    const uid = Cookies.get("Uid") || "";

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files;
        if (selectedFiles) {
            const newFiles = Array.from(selectedFiles);
            if (files.length + newFiles.length > 10) {
                Swal.fire({
                    title: "خطا",
                    text: "حداکثر 10 عکس می‌توانید انتخاب کنید.",
                    icon: "warning",
                    confirmButtonText: "باشه"
                });
                return;
            }
            const totalFiles = [...files, ...newFiles];
            setFiles(totalFiles);
            const newImages = newFiles.map(file => URL.createObjectURL(file));
            const totalImages = [...images, ...newImages];
            setImages(totalImages);
        }
    };

    const uploadAttach = () => {
        if (!uid) {
            Swal.fire({
                title: "خطا",
                text: "شناسه کاربری یافت نشد.",
                icon: "warning",
                confirmButtonText: "باشه"
            });
            return;
        }
        if (files.length === 0) {
            Swal.fire({
                title: "خطا",
                text: "لطفا تصویر را انتخاب کنید.",
                icon: "warning",
                confirmButtonText: "باشه"
            });
            return;
        }
        const formData = new FormData();
        files.forEach(file => formData.append("images", file));
        formData.append("Uid", uid);

        uploadSliderPhotosMutation.mutate(formData as any, {
            onSuccess: (response: any) => {
                if (response?.data?.files && Array.isArray(response.data.files)) {
                    setUploadedImages(response.data.files);
                }
                setFiles([]);
                setImages([]);
            }
        });
    };

    return (
        <>
            <div className="flex items-center justify-between border-b border-b-gray-200 mb-10 lg:py-7 py-4 overflow-x-auto w-[330px] sm:w-full lg:overflow-x-visible gap-7">
                <div>
                    <span className="font-extrabold text-lg whitespace-nowrap">تنظیمات مدیریتی</span>
                </div>
                <RouteChevron items={pageUploadAttach} />
            </div>
            <div className="flex flex-col items-center justify-center bg-gray-50 px-6 py-9 mx-auto rounded-xl w-full cursor-pointer my-14">
                <img
                    src={camraadd}
                    alt="camraadd"
                    className="w-[100px] h-[100px]"
                    onClick={() => document.getElementById("fileInput")?.click()}
                />
                <span className="text-gray-400">
                    آپلود تصویر (حداکثر 10 عکس)
                </span>
                <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                />
                <div className="text-xs text-gray-500 mt-2">
                    {files.length > 0 && `تعداد عکس انتخاب شده: ${files.length} (حداکثر 10 عکس)`}
                </div>
                <button
                    className="bg-main-color text-white rounded-full px-8 py-2 mt-4"
                    onClick={uploadAttach}
                    disabled={uploadSliderPhotosMutation.isLoading}
                >
                    ثبت پیوست
                </button>
            </div>

            {/* نمایش عکس‌های انتخاب شده */}
            {images.length > 0 && (
                <div className="flex flex-wrap gap-3 justify-center my-4">
                    {images.map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            alt={`preview-${idx}`}
                            className="w-24 h-24 object-cover rounded border"
                        />
                    ))}
                </div>
            )}

            {/* نمایش عکس‌های آپلود شده */}
            {uploadedImages.length > 0 && (
                <div className="flex flex-wrap gap-3 justify-center my-4">
                    {uploadedImages.map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            alt={`uploaded-${idx}`}
                            className="w-24 h-24 object-cover rounded border-2 border-green-500"
                        />
                    ))}
                    <div className="w-full text-center text-green-600 text-xs mt-2">عکس‌ها با موفقیت آپلود شدند</div>
                </div>
            )}
        </>
    )
}

export default UploadAttach
