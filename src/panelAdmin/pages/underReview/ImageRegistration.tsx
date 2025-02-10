import RouteChevron from "../../../components/common/RouteChevron";
import { pageImageRegistration } from "../../../utils/data";
import InitialLayout from "../../dashboard/initialLayoutAdmin";
import ChooseItemsOfState from "../propertyManagement/ChooseItemsOfState";
import camraadd from "../../../assets/images/Cameradd.png"
import { useState } from "react";

interface Props {

}
const ImageRegistration = ({ }: Props) => {
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
        <InitialLayout>
            <div className="flex items-center justify-between border-b border-b-gray-200 mb-10 lg:py-7 py-4 overflow-x-auto w-[330px] sm:w-full lg:overflow-x-visible gap-7">
                <div>
                    <span className="text-black font-extrabold text-lg whitespace-nowrap">مدیریت املاک</span>
                </div>
                <RouteChevron items={pageImageRegistration} />
            </div>
            <ChooseItemsOfState />
            <div className="flex flex-col gap-16 mb-10">
                <div className="flex flex-col items-center justify-center bg-gray-50 px-6 py-9 mx-auto rounded-xl lg:w-[416px] w-full h-[315px] cursor-pointer">
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
            </div>
        </InitialLayout>
    )
}

export default ImageRegistration
