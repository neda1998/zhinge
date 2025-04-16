import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";
import apiRoutes from "../../../helpers/routes/apiRoutes";
import { getRoute } from "../../../services/service";
import client from "../../../services/utils/client";
import UseGetAllteamQuery from "../../../hooks/queries/admin/getAllteam/UseGetAllteamQuery";

const JingeTeamManagementTable = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<number | null>(null);
    const [name, setName] = useState("");
    const [job, setJob] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editData, setEditData] = useState<any>(null);

    const { data: teamData = [], isLoading, refetch } = UseGetAllteamQuery();

    const handleModalOpen = (id: number) => {
        const member = teamData.find((item: any) => item.id === id);
        setEditData({
            id: member.id,
            name: member.name,
            job: member.job,
            email: member.email,
            phone: member.phone,
        });
        setEditModalOpen(true);
    };

    const handleDeleteClick = async (id: number) => {
        Swal.fire({
            title: "هشدار",
            text: "آیا از حذف این عضو مطمئن هستید؟",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "بله",
            cancelButtonText: "انصراف",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const url = getRoute({ route: apiRoutes.admin.deleteTeam });
                    await client({
                        url,
                        method: "DELETE",
                        data: { id },
                        headers: { "Content-Type": "application/json" }
                    });
                    Swal.fire({
                        title: "موفق!",
                        text: "عضو تیم با موفقیت حذف شد.",
                        icon: "success",
                        confirmButtonText: "باشه"
                    });
                    refetch();
                } catch (err: any) {
                    Swal.fire({
                        title: "خطا!",
                        text: err?.response?.data?.message || "خطا در حذف عضو تیم",
                        icon: "error",
                        confirmButtonText: "باشه"
                    });
                }
            }
        });
    };

    const handleSubmit = async () => {
        if (!name.trim() || !job.trim() || !email.trim() || !phone.trim()) {
            Swal.fire({
                title: "خطا",
                text: "لطفا همه فیلدها را پر کنید.",
                icon: "warning",
                confirmButtonText: "باشه"
            });
            return;
        }
        setLoading(true);
        try {
            const url = getRoute({ route: apiRoutes.admin.creatTeam });
            await client({
                url,
                method: "POST",
                data: {
                    name,
                    job,
                    email,
                    phone
                },
                headers: { "Content-Type": "application/json" }
            });
            Swal.fire({
                title: "موفق!",
                text: "عضو جدید با موفقیت اضافه شد.",
                icon: "success",
                confirmButtonText: "باشه"
            });
            setName("");
            setJob("");
            setEmail("");
            setPhone("");
            refetch();
        } catch (err: any) {
            Swal.fire({
                title: "خطا!",
                text: err?.response?.data?.message || "خطا در ثبت عضو جدید",
                icon: "error",
                confirmButtonText: "باشه"
            });
        } finally {
            setLoading(false);
        }
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditData((prev: any) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEditSubmit = async () => {
        if (!editData.name.trim() || !editData.job.trim() || !editData.email.trim() || !editData.phone.trim()) {
            Swal.fire({
                title: "خطا",
                text: "لطفا همه فیلدها را پر کنید.",
                icon: "warning",
                confirmButtonText: "باشه"
            });
            return;
        }
        try {
            const url = getRoute({ route: "/admin/updateteam" });
            await client({
                url,
                method: "POST",
                data: {
                    id: editData.id,
                    name: editData.name,
                    job: editData.job,
                    email: editData.email,
                    phone: editData.phone
                },
                headers: { "Content-Type": "application/json" }
            });
            Swal.fire({
                title: "موفق!",
                text: "عضو تیم با موفقیت ویرایش شد.",
                icon: "success",
                confirmButtonText: "باشه"
            });
            setEditModalOpen(false);
            setEditData(null);
            refetch();
        } catch (err: any) {
            Swal.fire({
                title: "خطا!",
                text: err?.response?.data?.message || "خطا در ویرایش عضو تیم",
                icon: "error",
                confirmButtonText: "باشه"
            });
        }
    };

    return (
        <div className="overflow-x-auto mt-10">
            {/* فرم ثبت عضو جدید */}
            <div className="flex flex-col lg:flex-row gap-4 mb-8 items-center">
                <input
                    type="text"
                    placeholder="نام عضو"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="border border-gray-300 rounded-xl p-2 w-full lg:w-1/5"
                />
                <input
                    type="text"
                    placeholder="شغل"
                    value={job}
                    onChange={e => setJob(e.target.value)}
                    className="border border-gray-300 rounded-xl p-2 w-full lg:w-1/5"
                />
                <input
                    type="email"
                    placeholder="ایمیل"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="border border-gray-300 rounded-xl p-2 w-full lg:w-1/5"
                />
                <input
                    type="text"
                    placeholder="شماره موبایل"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="border border-gray-300 rounded-xl p-2 w-full lg:w-1/5"
                />
                <button
                    className="bg-main-color text-white rounded-full px-8 py-2"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? "در حال ثبت..." : "ثبت"}
                </button>
            </div>
            {/* جدول اعضا */}
            <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px] rounded-tr-full rounded-br-full">ردیف</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">نام عضو</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">شغل</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">آدرس ایمیل</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">شماره موبایل</th>
                        <th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px] rounded-tl-full rounded-bl-full">عملیات</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr>
                            <td colSpan={6} className="p-4 text-center">در حال بارگذاری...</td>
                        </tr>
                    ) : teamData.length > 0 ? (
                        teamData.map((item: any, index: number) => (
                            <tr key={item.id || index} className="py-2 text-center">
                                <td className="p-4 whitespace-nowrap">{index + 1}</td>
                                <td className="p-4 whitespace-nowrap">{item.name}</td>
                                <td className="p-4 text-gray-500 text-sm">{item.job}</td>
                                <td className="p-4 text-gray-500 text-sm truncate">{item.email}</td>
                                <td className="p-4 text-gray-500 text-sm truncate">{item.phone}</td>
                                <td className="py-2 px-4 text-center flex gap-2 justify-center items-center">
                                    <div className="shadow-xl rounded-full w-9 h-9 flex items-center justify-center">
                                        <button
                                            onClick={() => handleDeleteClick(item.id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <AiOutlineDelete size={24} />
                                        </button>
                                    </div>
                                    <div className="shadow-xl rounded-full p-2 flex items-center justify-center bg-white">
                                        <FiEdit color="#11a97f" onClick={() => handleModalOpen(item.id)} />
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="p-4 text-center">هیچ عضوی یافت نشد</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {/* مدال ویرایش */}
            {editModalOpen && editData && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-75 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                        <h2 className="text-xl font-bold mb-4">ویرایش عضو تیم</h2>
                        <div className="flex flex-col gap-4">
                            <input
                                type="text"
                                name="name"
                                value={editData.name}
                                onChange={handleEditChange}
                                placeholder="نام عضو"
                                className="border border-gray-300 rounded-xl p-2"
                            />
                            <input
                                type="text"
                                name="job"
                                value={editData.job}
                                onChange={handleEditChange}
                                placeholder="شغل"
                                className="border border-gray-300 rounded-xl p-2"
                            />
                            <input
                                type="email"
                                name="email"
                                value={editData.email}
                                onChange={handleEditChange}
                                placeholder="ایمیل"
                                className="border border-gray-300 rounded-xl p-2"
                            />
                            <input
                                type="text"
                                name="phone"
                                value={editData.phone}
                                onChange={handleEditChange}
                                placeholder="شماره موبایل"
                                className="border border-gray-300 rounded-xl p-2"
                            />
                        </div>
                        <div className="flex gap-4 mt-6">
                            <button
                                className="bg-main-color text-white rounded-full px-8 py-2"
                                onClick={handleEditSubmit}
                            >
                                ویرایش
                            </button>
                            <button
                                className="bg-gray-300 text-black rounded-full px-8 py-2"
                                onClick={() => { setEditModalOpen(false); setEditData(null); }}
                            >
                                انصراف
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JingeTeamManagementTable;
