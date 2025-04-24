import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { MdClose, MdEdit } from "react-icons/md";
import UseallUsersQuery from '../../../hooks/queries/admin/allUsers/UseallUsersQuery';
import Swal from "sweetalert2";
import apiRoutes from "../../../helpers/routes/apiRoutes";
import { getRoute } from "../../../services/service";
import client from "../../../services/utils/client";
import { PuffLoader } from "react-spinners";

const UserManagementTable: React.FC = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [isModalOpen, setIsModalOpen] = useState<number | null>(null);
	const [editUser, setEditUser] = useState<any>(null);

	const { data, isLoading, error, refetch } = UseallUsersQuery();
	const users = data?.users ?? [];

	if (isLoading) return (
		<div className="flex items-center justify-center h-screen">
			<PuffLoader color="#09A380" />
		</div>
	);
	if (error) return <div>Error loading users.</div>;

	const itemsPerPage = 10;
	const totalPages = Math.ceil(users.length / itemsPerPage);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const openModal = (id: number) => {
		const user = users.find((u: any) => u.id === id);
		setEditUser({
			id: user.id,
			full_name: user.full_name,
			phone: user.phone,
			password: "",
			admin: user.admin,
			Blocked: user.Blocked ?? false,
			phoneVarify: user.phoneVarify ?? true,
		});
		setIsModalOpen(id);
	};

	const closeModal = () => {
		setIsModalOpen(null);
		setEditUser(null);
	};

	const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const target = e.target as HTMLInputElement | HTMLSelectElement;
		const { name, value, type } = target;
		const checked = type === "checkbox" ? (target as HTMLInputElement).checked : false;
		setEditUser((prev: any) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value
		}));
	};

	const handleUpdateUser = async () => {
		try {
			const url = getRoute({ route: apiRoutes.admin.updateUser });
			const body = {
				id: editUser.id,
				full_name: editUser.full_name,
				phone: editUser.phone,
				password: editUser.password || undefined,
				admin: editUser.admin,
				Blocked: editUser.Blocked,
				phoneVarify: editUser.phoneVarify,
			};
			await client({
				url,
				method: "PUT",
				data: body,
				headers: { "Content-Type": "application/json" }
			});
			Swal.fire({
				title: "موفق!",
				text: "اطلاعات کاربر با موفقیت ویرایش شد.",
				icon: "success",
				confirmButtonText: "باشه"
			});
			closeModal();
			refetch();
		} catch (err: any) {
			Swal.fire({
				title: "خطا!",
				text: err?.response?.data?.message || "خطا در ویرایش اطلاعات کاربر",
				icon: "error",
				confirmButtonText: "باشه"
			});
		}
	};

	const startIndex = (currentPage - 1) * itemsPerPage;
	const paginatedData = users.slice(startIndex, startIndex + itemsPerPage);

	return (
		<div className="overflow-x-auto">
			<table className="min-w-full bg-white">
				<thead className="bg-gray-100">
					<tr>
						<th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px] rounded-tr-full rounded-br-full">نام کاربری</th>
						<th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">شماره موبایل</th>
						<th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">آدرس ایمیل</th>
						<th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">تعداد ملک های ثبت شده</th>
						<th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px]">نحوه ثبت نام</th>
						<th className="px-2 py-4 lg:p-6 text-center whitespace-nowrap text-[16px] rounded-tl-full rounded-bl-full">ویرایش</th>
					</tr>
				</thead>
				<tbody>
					{paginatedData.map((item: { id: number; full_name: string; phone: string; admin: boolean; }, index: number) => (
						<tr key={index} className="py-2 text-center">
							<td className="p-4 whitespace-nowrap">{item.full_name}</td>
							<td className="p-4 whitespace-nowrap">{item.phone}</td>
							<td className="p-4 whitespace-nowrap">- {/* No email provided */}</td>
							<td className="p-4 whitespace-nowrap">0 {/* Default count */}</td>
							<td className="p-4 whitespace-nowrap">{item.admin ? "ادمین" : "کاربر"}</td>
							<td className="py-2 px-4 text-center inline-block">
								<MdEdit
									size={24}
									className="text-main-color cursor-pointer mt-1"
									onClick={() => openModal(item.id)}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<div className="flex justify-around my-4 mx-auto bg-white rounded-full py-3 shadow-lg items-center w-96">
				<button
					onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
					className={`${currentPage === 1 ? 'text-gray-700' : 'text-gray-400'}`}
					disabled={currentPage === 1}
				>
					<FaChevronRight />
				</button>
				{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
					<button
						key={page}
						onClick={() => handlePageChange(page)}
						className={`${currentPage === page ? 'bg-main-color font-extrabold text-xl text-white rounded-full w-9 h-9' : 'bg-white text-black text-lg'}`}
					>
						{page}
					</button>
				))}
				<button
					onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
					className={`px-3 py-1 rounded ${currentPage === totalPages ? 'text-gray-700' : 'text-gray-400'}`}
					disabled={currentPage === totalPages}
				>
					<FaChevronLeft />
				</button>
			</div>
			{isModalOpen && editUser && (
				<div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-75 z-[9999]">
					<div className="bg-white rounded-lg lg:p-6 p-3 lg:w-1/3 w-full shadow-lg mx-4">
						<div className="flex justify-between items-center gap-4">
							<h2 className="text-xl font-bold">ویرایش اطلاعات کاربر</h2>
							<MdClose onClick={closeModal} size={20} className='hover-btn' />
						</div>
						<div className="flex flex-col gap-6 mt-10">
							<label className="flex flex-col gap-2">
								<span className="text-black">نام و نام خانوادگی</span>
								<input
									type="text"
									name="full_name"
									value={editUser.full_name}
									onChange={handleEditChange}
									className="border border-gray-300 rounded-xl p-2"
								/>
							</label>
							<label className="flex flex-col gap-2">
								<span className="text-black">شماره موبایل</span>
								<input
									type="text"
									name="phone"
									value={editUser.phone}
									onChange={handleEditChange}
									className="border border-gray-300 rounded-xl p-2"
								/>
							</label>
							<label className="flex flex-col gap-2">
								<span className="text-black">رمز عبور جدید (اختیاری)</span>
								<input
									type="password"
									name="password"
									value={editUser.password}
									onChange={handleEditChange}
									className="border border-gray-300 rounded-xl p-2"
									placeholder="در صورت نیاز تغییر دهید"
								/>
							</label>
							<label className="flex flex-col gap-2">
								<span className="text-black">نقش کاربر</span>
								<select
									name="admin"
									value={editUser.admin ? "true" : "false"}
									onChange={e => setEditUser((prev: any) => ({
										...prev,
										admin: e.target.value === "true"
									}))}
									className="border border-gray-300 rounded-xl p-2"
								>
									<option value="false">کاربر</option>
									<option value="true">ادمین</option>
								</select>
							</label>
							<label className="flex flex-col gap-2">
								<span className="text-black">مسدود</span>
								<select
									name="Blocked"
									value={editUser.Blocked ? "true" : "false"}
									onChange={e => setEditUser((prev: any) => ({
										...prev,
										Blocked: e.target.value === "true"
									}))}
									className="border border-gray-300 rounded-xl p-2"
								>
									<option value="false">فعال</option>
									<option value="true">مسدود</option>
								</select>
							</label>
						</div>
						<button
							className="bg-main-color text-white rounded-full px-8 py-2 mt-8"
							onClick={handleUpdateUser}
						>
							ویرایش اطلاعات
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default UserManagementTable;
