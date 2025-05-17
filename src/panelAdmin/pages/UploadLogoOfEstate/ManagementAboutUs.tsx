import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { PuffLoader } from "react-spinners";
import { FiEdit2 } from "react-icons/fi"; 
import RouteChevron from "../../../components/common/RouteChevron";
import { pageManagementAboutus } from "../../../utils/data";
import UseAboutUpdatingMutation from "../../../hooks/mutation/aboutUpdating/UseAboutUpdatingMutation";
import UseGetAboutQuery from "../../../hooks/queries/admin/getAbout/UseGetAboutQuery";

const ManagementAboutUs = () => {
    const [about, setAbout] = useState("");
    const [goals, setGoals] = useState("");
    const [editAbout, setEditAbout] = useState(false);
    const [editGoals, setEditGoals] = useState(false);

    const { data, isLoading, error, refetch } = UseGetAboutQuery();
    const aboutUpdatingMutation = UseAboutUpdatingMutation();

    useEffect(() => {
        if (data) {
            setAbout(data.about || "");
            setGoals(data.goals || "");
        }
    }, [data]);

    const handleUpdateAbout = (type: "about" | "goals") => {
        // فقط مقدار about و goals را بفرست، نیازی به تایپ خاص نیست
        const aboutValue = type === "about" ? about : (data?.about || "");
        const goalsValue = type === "goals" ? goals : (data?.goals || "");

        aboutUpdatingMutation.mutate(
            { about: aboutValue, goals: goalsValue },
            {
                onSuccess: () => {
                    Swal.fire({
                        title: "موفقیت‌آمیز",
                        text: "تغییرات با موفقیت ذخیره شدند.",
                        icon: "success",
                        confirmButtonText: "باشه",
                    });
                    refetch();
                    setEditAbout(false);
                    setEditGoals(false);
                },
                onError: () => {
                    Swal.fire({
                        title: "خطا",
                        text: "مشکلی در ذخیره‌سازی پیش آمد. لطفاً دوباره تلاش کنید.",
                        icon: "error",
                        confirmButtonText: "باشه",
                    });
                }
            }
        );
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <PuffLoader color="#09A380" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500">
                خطایی در دریافت اطلاعات رخ داده است.
            </div>
        );
    }

    return (
        <>
            <div className="flex items-center justify-between border-b border-b-gray-200 mb-10 lg:py-7 py-4 overflow-x-auto w-full lg:overflow-x-visible gap-7 flex-wrap  ">
                <div>
                    <span className="font-extrabold text-lg whitespace-nowrap">تنظیمات مدیریتی</span>
                </div>
                <RouteChevron items={pageManagementAboutus} />
            </div>

            <div className="flex flex-col gap-5">
                {/* نمایش لوگوها اگر وجود داشته باشد */}
                {Array.isArray(data?.logo) && data.logo.length > 0 && (
                    <div className="flex flex-wrap gap-4 mb-4">
                        {data.logo.map((logoUrl: string, idx: number) => (
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
                )}
                <div className="flex items-center justify-between">
                    <span className="text-gray-500">درباره ژینگه</span>
                    <button
                        type="button"
                        className="text-main-color ml-2"
                        onClick={() => setEditAbout(true)}
                        title="ویرایش"
                    >
                        <FiEdit2 size={20} />
                    </button>
                </div>
                {!editAbout ? (
                    <div className="border border-gray-600 rounded-xl p-4 min-h-[80px] flex items-center">
                        <span className="text-gray-700">{about || "متنی ثبت نشده است."}</span>
                    </div>
                ) : (
                    <div className="border border-gray-600 rounded-xl p-4">
                        <textarea
                            className="w-full border-none outline-none bg-transparent resize-none"
                            rows={5}
                            placeholder="متن درباره ژینگه..."
                            value={about}
                            onChange={e => setAbout(e.target.value)}
                        />
                        <div className="flex gap-3 mt-3">
                            <button
                                className="bg-main-color text-white rounded-full px-6 py-1"
                                onClick={() => handleUpdateAbout("about")}
                                disabled={aboutUpdatingMutation.isLoading}
                                type="button"
                            >
                                ثبت تغییرات
                            </button>
                            <button
                                className="bg-gray-300 text-gray-700 rounded-full px-6 py-1"
                                onClick={() => {
                                    setAbout(data?.about || "");
                                    setEditAbout(false);
                                }}
                                type="button"
                            >
                                انصراف
                            </button>
                        </div>
                    </div>
                )}

                {/* اهداف ژینگه */}
                <div className="flex items-center justify-between mt-8">
                    <span className="text-gray-500">اهداف ژینگه</span>
                    <button
                        type="button"
                        className="text-main-color ml-2"
                        onClick={() => setEditGoals(true)}
                        title="ویرایش"
                    >
                        <FiEdit2 size={20} />
                    </button>
                </div>
                {!editGoals ? (
                    <div className="border border-gray-600 rounded-xl p-4 min-h-[80px] flex items-center">
                        <span className="text-gray-700">{goals || "متنی ثبت نشده است."}</span>
                    </div>
                ) : (
                    <div className="border border-gray-600 rounded-xl p-4">
                        <textarea
                            className="w-full border-none outline-none bg-transparent resize-none"
                            rows={4}
                            placeholder="متن اهداف ژینگه..."
                            value={goals}
                            onChange={e => setGoals(e.target.value)}
                        />
                        <div className="flex gap-3 mt-3">
                            <button
                                className="bg-main-color text-white rounded-full px-6 py-1"
                                onClick={() => handleUpdateAbout("goals")}
                                disabled={aboutUpdatingMutation.isLoading}
                                type="button"
                            >
                                ثبت تغییرات
                            </button>
                            <button
                                className="bg-gray-300 text-gray-700 rounded-full px-6 py-1"
                                onClick={() => {
                                    setGoals(data?.goals || "");
                                    setEditGoals(false);
                                }}
                                type="button"
                            >
                                انصراف
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ManagementAboutUs;
