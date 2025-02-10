import RouteChevron from "../../../components/common/RouteChevron"
import InputState from "../../../components/ui/atoms/input/inputState"
import { pageSliders } from "../../../utils/data"
import InitialLayout from "../../dashboard/initialLayoutAdmin"
import SlidersTable from "./SlidersTable"
import camraadd from "../../../assets/images/Cameradd.png"
import { useState } from "react"

const Sliders = () => {
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
                    <span className="text-black font-extrabold text-lg whitespace-nowrap">اسلایدرها</span>
                </div>
                <RouteChevron items={pageSliders} />
            </div>
            <div className="mb-10">
                <span className="text-black text-xl"> مدیریت اسلایدر</span>
                <SlidersTable />
            </div>
            <span className="text-black text-xl">افزودند اسلایدر جدید</span>
            <div className="flex items-center justify-between gap-6 mt-10">
                <InputState label="عنوان اسلایدر" />
                <InputState label="متن کوتاه در مورد تصویر" />
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
            <button className="flex ml-0 mr-auto bg-main-color text-white rounded-full py-2 px-14 mb-10">ثبت</button>
        </InitialLayout>
    )
}

export default Sliders
