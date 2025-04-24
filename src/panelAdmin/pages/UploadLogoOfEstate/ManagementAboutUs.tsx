import RouteChevron from "../../../components/common/RouteChevron"
import { pageManagementAboutus } from "../../../utils/data"
import UseAboutUpdatingMutation from "../../../hooks/mutation/aboutUpdating/UseAboutUpdatingMutation";
import Swal from "sweetalert2";
import { useState } from "react";

const ManagementAboutUs = () => {
    const [about, setAbout] = useState("");
    const [goals, setGoals] = useState("");
    const aboutUpdatingMutation = UseAboutUpdatingMutation();

    const handleUpdateAbout = () => {
        if (!about.trim() && !goals.trim()) {
            Swal.fire({
                title: "خطا",
                text: "متن درباره یا اهداف را وارد کنید.",
                icon: "warning",
                confirmButtonText: "باشه"
            });
            return;
        }
        aboutUpdatingMutation.mutate({ about, goals });
    };

    return (
        <>
            <div className="flex items-center justify-between border-b border-b-gray-200 mb-10 lg:py-7 py-4 overflow-x-auto w-[330px] sm:w-full lg:overflow-x-visible gap-7">
                <div>
                    <span className="font-extrabold text-lg whitespace-nowrap">تنظیمات مدیریتی</span>
                </div>
                <RouteChevron items={pageManagementAboutus} />
            </div>
            <div className="flex flex-col gap-5">
                <div className="border border-gray-600 rounded-xl p-4">
                    <textarea
                        className="w-full border-none outline-none bg-transparent resize-none"
                        rows={5}
                        placeholder="متن درباره ژینگه..."
                        value={about}
                        onChange={e => setAbout(e.target.value)}
                    />
                </div>
            </div>
            <div className="flex flex-col mt-12 gap-5">
                <div className="flex items-center justify-between">
                    <span className="text-gray-500">اهداف ژینگه</span>
                </div>
                <div className="border border-gray-600 rounded-xl p-4">
                    <textarea
                        className="w-full border-none outline-none bg-transparent resize-none"
                        rows={4}
                        placeholder="متن اهداف ژینگه..."
                        value={goals}
                        onChange={e => setGoals(e.target.value)}
                    />
                </div>
                <button
                    className="bg-main-color text-white rounded-full px-8 py-2 mb-10"
                    onClick={handleUpdateAbout}
                >
                    ثبت تغییرات
                </button>
            </div>
        </>
    )
}

export default ManagementAboutUs
