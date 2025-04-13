import React, { useState } from "react";
import camraadd from "../../../assets/images/Cameradd.png";
import InputState from "../../../components/ui/atoms/input/inputState";
import InitialLayout from "../../dashboard/initialLayoutAdmin";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import UseDeleteSliderMutation from "../../../hooks/mutation/deleteslider/UseDeleteSliderMutation";
import Swal from "sweetalert2";
import UseGetAllSliders from "../../../hooks/queries/admin/getAllSliders/UseGetAllSlidersQuery";
import { PuffLoader } from "react-spinners";
import UseCreatSliderMutation from "../../../hooks/mutation/creatSlider/UseCreatSliderMutation";
import avatar from "../../../assets/images/house.webp";

const Sliders = () => {
    const [images, setImages] = useState<string[]>([]);
    const [sliderTitle, setSliderTitle] = useState("");
    const [sliderNote, setSliderNote] = useState("");

    const { data: slidersData, isLoading, refetch } = UseGetAllSliders();
    console.log("Sliders data:", slidersData); // برای دیباگ
    const fetchedSliders: any[] = slidersData?.data || [];
    const deleteSliderMutation = UseDeleteSliderMutation();
    const createSliderMutation = UseCreatSliderMutation();

    const handleDelete = (id: number) => {
        Swal.fire({
            title: "هشدار",
            text: "آیا از حذف مطمئن هستید؟",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "بله",
            cancelButtonText: "انصراف",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteSliderMutation.mutate({ id }, {
                    onSuccess: () => {
                        refetch();
                    },
                });
            }
        });
    };


    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const newImages = Array.from(files).map((file) =>
                URL.createObjectURL(file)
            );
            setImages((prev) => [...prev, ...newImages].slice(0, 8));
        }
    };

    const handleSliderSubmit = async () => {
        const sliderData = {
            Title: sliderTitle,
            note: sliderNote,
            photo: images.length > 0 ? images : {},
        };

        try {
            await createSliderMutation.mutateAsync(sliderData as any);
            setSliderTitle("");
            setSliderNote("");
            setImages([]);
            refetch(); // re-fetch sliders after creation
        } catch (error) {
            // Error is handled by onError callback in the mutation.
        }
    };

    if (isLoading)
        return (
            <div className="flex items-center justify-center h-screen">
                <PuffLoader color="#09A380" />
            </div>
        );

    return (
        <InitialLayout>
            <div className="flex flex-col">
                {/* جدول اسلایدرها */}
                <div className="overflow-x-auto mt-10">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-100 rounded-2xl">
                            <tr>
                                <th className="px-2 py-4 text-center rounded-tr-full rounded-br-full">
                                    عنوان اسلایدر
                                </th>
                                <th className="px-2 py-4 text-center">
                                    متن کوتاه در مورد اسلایدر
                                </th>
                                <th className="px-2 py-4 text-center">عکس‌ها</th>
                                <th className="px-2 py-4 text-center rounded-tl-full rounded-bl-full">
                                    عملیات
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {slidersData && slidersData.length > 0 ? (
                                slidersData.map((item: any, index: any) => (
                                    <tr key={index}>
                                        <td className="p-4 text-center">{item.Title}</td>
                                        <td className="p-4 text-center">{item.note}</td>
                                        <td className="p-4 text-center">
                                            {Array.isArray(item.photo) && item.photo.length > 0 ? (
                                                item.photo.map((image: string, idx: number) => (
                                                    <img
                                                        key={idx}
                                                        src={image} // تغییر این خط به image
                                                        alt={`Slider Image ${idx}`}
                                                        className="w-16 h-16 object-cover rounded text-center mx-auto"
                                                    />
                                                ))
                                            ) : item.photo && item.photo.url ? (
                                                <img
                                                    src={item.photo.url} 
                                                    alt="Slider"
                                                    className="w-16 h-16 object-cover rounded text-center mx-auto"
                                                />
                                            ) : (
                                                <img
                                                    src={avatar}
                                                    alt="Default Avatar"
                                                    className="w-16 h-16 object-cover rounded text-center mx-auto"
                                                />
                                            )}
                                        </td>

                                        <td className="p-4 text-center flex items-center justify-center gap-1">
                                            <AiOutlineDelete
                                                size={24}
                                                className="text-red-500 hover:text-red-700 cursor-pointer"
                                                onClick={() => handleDelete(item.id)}
                                            />
                                            <FiEdit color="#11a97f" size={22} />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="p-4 text-center">
                                        هیچ اسلایدری یافت نشد
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <h1 className="text-2xl font-bold mt-10">ایجاد اسلایدر جدید</h1>
                <div className="flex items-center justify-between gap-7 mt-10">
                    <InputState
                        label="عنوان اسلایدر"
                        value={sliderTitle}
                        onChange={(e) => setSliderTitle(e.target.value)}
                        className="bg-[#F4F4F4] w-full lg:w-1/2 rounded-3xl p-2"
                    />
                    <InputState
                        label="متن کوتاه در مورد اسلایدر"
                        value={sliderNote}
                        onChange={(e) => setSliderNote(e.target.value)}
                        className="bg-[#F4F4F4] w-full lg:w-1/2 rounded-3xl p-2"
                    />
                </div>
                <div className="flex flex-col items-center justify-center bg-gray-50 px-6 py-9 mx-auto rounded-xl w-full cursor-pointer my-14">
                    <img
                        src={camraadd}
                        alt="Upload"
                        className="w-[100px] h-[100px]"
                        onClick={() => document.getElementById("fileInput")?.click()}
                    />
                    <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImageUpload}
                    />
                </div>
                <button
                    className="flex ml-0 mr-auto bg-main-color text-white rounded-full py-2 px-14 mb-10"
                    onClick={handleSliderSubmit}
                >
                    ثبت
                </button>
            </div>
        </InitialLayout>
    );
};

export default Sliders;
