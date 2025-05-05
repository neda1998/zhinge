import React, { useState } from "react";
import camraadd from "../../../assets/images/Cameradd.png";
import InputState from "../../../components/ui/atoms/input/inputState";
import InitialLayout from "../../dashboard/initialLayoutAdmin";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import UseDeleteSliderMutation from "../../../hooks/mutation/creatSlider/UseDeleteSliderMutation";
import Swal from "sweetalert2";
import UseGetAllSliders from "../../../hooks/queries/admin/getAllSliders/UseGetAllSlidersQuery";
import { PuffLoader } from "react-spinners";
import UseCreatSliderMutation from "../../../hooks/mutation/creatSlider/UseCreatSliderMutation";
import UseUpdateSliderMutation from "../../../hooks/mutation/creatSlider/UseUpdateSliderMutation";
import avatar from "../../../assets/images/house.webp";

const Sliders = () => {
    const [images, setImages] = useState<string[]>([]);
    const [sliderTitle, setSliderTitle] = useState("");
    const [sliderNote, setSliderNote] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [newSliderTitle, setNewSliderTitle] = useState("");
    const [newSliderNote, setNewSliderNote] = useState("");
    const [selectedSliderId, setSelectedSliderId] = useState<number | null>(null);

    const { data: slidersData, isLoading, refetch } = UseGetAllSliders();
    const fetchedSliders: any[] = slidersData?.data || [];
    const deleteSliderMutation = UseDeleteSliderMutation();
    const createSliderMutation = UseCreatSliderMutation();
    const updateSliderMutation = UseUpdateSliderMutation();

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

    const handleModalOpen = (slider: any) => {
        setSelectedSliderId(slider.id);
        setNewSliderTitle(slider.Title);
        setNewSliderNote(slider.note);
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
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
        if (!sliderTitle || !sliderNote || images.length === 0) {
            Swal.fire({
                title: "خطا",
                text: "لطفاً همه فیلدها را پر کنید و حتماً یک عکس انتخاب کنید.",
                icon: "error",
                confirmButtonText: "باشه",
            });
            return;
        }
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
            refetch();
        } catch (error) {
            // Error is handled by onError callback in the mutation.
        }
    };

    const handleUpdateSlider = async () => {
        if (selectedSliderId === null) return;
        const updatedData = {
            id: selectedSliderId,
            Title: newSliderTitle,
            note: newSliderNote,
            photo: {}
        };
        try {
            await updateSliderMutation.mutateAsync(updatedData);
            handleModalClose();
            refetch();
        } catch (error) {
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
                {modalOpen && (
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white lg:p-8 rounded-lg shadow-lg lg:w-1/2 w-full lg:mx-0 mx-4 p-3">
                            <div className="flex items-center justify-between border-b border-dashed border-b-gray-300 mb-4 pb-4">
                                <h2 className="text-xl font-bold">بروزرسانی اسلایدر</h2>
                                <IoCloseSharp color="#6b7280" size={25} className="hover-btn" onClick={handleModalClose} />
                            </div>
                            <input
                                type="text"
                                placeholder="عنوان اسلایدر را وارد کنید"
                                className="border border-gray-300 rounded-lg p-3 w-full mb-4"
                                value={newSliderTitle}
                                onChange={(e) => setNewSliderTitle(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="متن اسلایدر را وارد کنید"
                                className="border border-gray-300 rounded-lg p-3 w-full mb-4"
                                value={newSliderNote}
                                onChange={(e) => setNewSliderNote(e.target.value)}
                            />
                            <button
                                onClick={handleUpdateSlider}
                                className="mt-7 ml-0 mr-auto flex px-8 py-2 bg-main-color text-white rounded-full"
                            >
                                بروزرسانی اسلایدر
                            </button>
                        </div>
                    </div>
                )}
                {/* جدول اسلایدرها */}
                <div className="overflow-x-auto mt-10">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-100 rounded-2xl">
                            <tr>
                                <th className="sm:px-2 p-0 whitespace-nowrap sm:py-4 text-center rounded-tr-full rounded-br-full sm:text-[15px] text-[12px]">
                                    عنوان اسلایدر
                                </th>
                                <th className="sm:px-2 p-0 !whitespace-nowrap sm:py-4 text-center sm:text-[15px] text-[12px]">
                                    متن کوتاه در مورد اسلایدر
                                </th>
                                <th className="sm:px-2 p-0 whitespace-nowrap sm:py-4 text-center sm:text-[15px] text-[12px]">عکس‌ها</th>
                                <th className="px-2 py-4 text-center rounded-tl-full rounded-bl-full sm:text-[15px] text-[12px]">
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
                                                        src={image} 
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
                                            <FiEdit
                                                color="#11a97f"
                                                size={22}
                                                className="cursor-pointer"
                                                onClick={() => handleModalOpen(item)} 
                                            />
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
