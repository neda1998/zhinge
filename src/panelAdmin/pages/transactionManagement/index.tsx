import { useState } from "react";
import RouteChevron from "../../../components/common/RouteChevron"
import InputState from "../../../components/ui/atoms/input/inputState"
import { pageTransactionManagement } from "../../../utils/data"
import InitialLayout from "../../dashboard/initialLayoutAdmin"
import { creatDeal } from "../../../services/admin/creatDeal";
import Swal from "sweetalert2";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import UseGetAllDealsQuery from "../../../hooks/queries/admin/getAllDeals/UseGetAllDealsQuery";
import { FaTrash } from "react-icons/fa";
import { PuffLoader } from "react-spinners";
import { useQueryClient } from "react-query";
import UseDeletedealMutation from "../../../hooks/mutation/creatDeal/UseDeletedealMutation";
import UseUpdatedealMutation from "../../../hooks/mutation/creatDeal/UseUpdatedealMutation";
import { FiEdit } from "react-icons/fi";

const TransactionManagement = () => {
    const [dealNumber, setDealNumber] = useState("");
    const [region, setRegion] = useState("");
    const [dealType, setDealType] = useState("");
    const [seller, setSeller] = useState("");
    const [client, setClient] = useState("");
    const [price, setPrice] = useState("");
    const [commission, setCommission] = useState("");
    const [date, setDate] = useState<any>(null);
    const [note, setNote] = useState("");
    const { data, isLoading, isError, refetch } = UseGetAllDealsQuery();
    const queryClient = useQueryClient();
    const deleteMutation = UseDeletedealMutation();
    const updateMutation = UseUpdatedealMutation();

    const handleSubmit = async () => {
        if (
            !dealNumber.trim() ||
            !region.trim() ||
            !dealType.trim() ||
            !seller.trim() ||
            !client.trim() ||
            !price.trim() ||
            !commission.trim() ||
            !date
        ) {
            Swal.fire({
                title: "خطا",
                text: "لطفا همه فیلدهای ضروری را پر کنید.",
                icon: "warning",
                confirmButtonText: "باشه"
            });
            return;
        }

        const data = {
            seller: seller,
            region: region,
            type: dealType,
            number: dealNumber,
            client: client,
            price: Number(price),
            commission: Number(commission),
            date: date?.format?.("YYYY/MM/DD") || "",
            note: note
        };
        try {
            const response = await creatDeal(data);
            Swal.fire({
                title: "موفق!",
                text: "معامله با موفقیت ثبت شد.",
                icon: "success",
                confirmButtonText: "باشه"
            });
            setDealNumber("");
            setRegion("");
            setDealType("");
            setSeller("");
            setClient("");
            setPrice("");
            setCommission("");
            setNote("");
            setDate(null); 
        } catch (error) {
            console.error(error);
        }
    };

    // حذف معامله
    const handleDelete = async (id: number) => {
        const result = await Swal.fire({
            title: "حذف معامله",
            text: "آیا از حذف این معامله مطمئن هستید؟",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "بله، حذف کن",
            cancelButtonText: "انصراف"
        });
        if (result.isConfirmed) {
            deleteMutation.mutate({ id: String(id) });
        }
    };

    // ویرایش معامله (فرم کامل با لیبل و استایل مرتب)
    const handleEdit = async (deal: any) => {
        const { value: formValues } = await Swal.fire({
            title: "ویرایش معامله",
            html: `
                <div style="display:flex;flex-direction:column;gap:8px;text-align:right">
                    <label style="font-size:13px;margin-bottom:2px" for="swal-number">شماره مبایعه نامه</label>
                    <input id="swal-number" class="swal2-input" placeholder="شماره مبایعه نامه" value="${deal.number || ""}" />
                    
                    <label style="font-size:13px;margin-bottom:2px" for="swal-region">منطقه</label>
                    <input id="swal-region" class="swal2-input" placeholder="منطقه" value="${deal.region || ""}" />
                    
                    <label style="font-size:13px;margin-bottom:2px" for="swal-type">نوع ملک</label>
                    <input id="swal-type" class="swal2-input" placeholder="نوع ملک" value="${deal.type || ""}" />
                    
                    <label style="font-size:13px;margin-bottom:2px" for="swal-seller">نام فروشنده</label>
                    <input id="swal-seller" class="swal2-input" placeholder="نام فروشنده" value="${deal.seller || ""}" />
                    
                    <label style="font-size:13px;margin-bottom:2px" for="swal-client">نام خریدار</label>
                    <input id="swal-client" class="swal2-input" placeholder="نام خریدار" value="${deal.client || ""}" />
                    
                    <label style="font-size:13px;margin-bottom:2px" for="swal-price">مبلغ قرارداد</label>
                    <input id="swal-price" class="swal2-input" placeholder="مبلغ قرارداد" value="${deal.price || ""}" />
                    
                    <label style="font-size:13px;margin-bottom:2px" for="swal-commission">کمیسیون</label>
                    <input id="swal-commission" class="swal2-input" placeholder="کمیسیون" value="${deal.commission || ""}" />
                    
                    <label style="font-size:13px;margin-bottom:2px" for="swal-date">تاریخ معامله</label>
                    <input id="swal-date" class="swal2-input" placeholder="تاریخ معامله" value="${deal.date || ""}" />
                    
                    <label style="font-size:13px;margin-bottom:2px" for="swal-note">توضیحات</label>
                    <textarea id="swal-note" class="swal2-textarea" placeholder="توضیحات">${deal.note || ""}</textarea>
                </div>
            `,
            focusConfirm: false,
            confirmButtonText: "ثبت",
            cancelButtonText: "انصراف",
            showCancelButton: true,
            preConfirm: () => {
                return {
                    number: (document.getElementById('swal-number') as HTMLInputElement)?.value,
                    region: (document.getElementById('swal-region') as HTMLInputElement)?.value,
                    type: (document.getElementById('swal-type') as HTMLInputElement)?.value,
                    seller: (document.getElementById('swal-seller') as HTMLInputElement)?.value,
                    client: (document.getElementById('swal-client') as HTMLInputElement)?.value,
                    price: (document.getElementById('swal-price') as HTMLInputElement)?.value,
                    commission: (document.getElementById('swal-commission') as HTMLInputElement)?.value,
                    date: (document.getElementById('swal-date') as HTMLInputElement)?.value,
                    note: (document.getElementById('swal-note') as HTMLTextAreaElement)?.value,
                }
            }
        });
        if (formValues) {
            updateMutation.mutate({
                ...deal,
                ...formValues,
                id: deal.id,
                Uid: deal.Uid,
                price: Number(formValues.price),
                commission: Number(formValues.commission)
            });
        }
    };

    // ستون‌های جدول معاملات
    const dealColumns = [
        { key: "number", label: "شماره مبایعه نامه" },
        { key: "region", label: "منطقه" },
        { key: "type", label: "نوع ملک" },
        { key: "seller", label: "فروشنده" },
        { key: "client", label: "خریدار" },
        { key: "price", label: "مبلغ قرارداد" },
        { key: "commission", label: "کمیسیون" },
        { key: "date", label: "تاریخ معامله" },
        { key: "note", label: "توضیحات" },
    ];

    // استخراج لیست معاملات و تعداد کل (بر اساس ساختار رسپانس)
    const deals = Array.isArray(data?.deals)
        ? data.data.deals
        : Array.isArray(data)
            ? data
            : [];
    const totalDeals =
        typeof data?.total === "number"
            ? data.total
            : deals.length;

    return (
        <InitialLayout>
            <div className="flex items-center justify-between border-b border-b-gray-200 mb-10 lg:py-7 py-4 overflow-x-auto w-[330px] sm:w-full lg:overflow-x-visible gap-7">
                <div>
                    <span className="font-extrabold text-lg whitespace-nowrap">مدیریت معاملات</span>
                </div>
                <RouteChevron items={pageTransactionManagement} />
            </div>
            <span className="text-black font-bold text-lg">ثبت معاملات جدید</span>
            <div className="grid lg:grid-cols-4 grid-cols-1 lg:gap-x-5 lg:gap-y-10 gap-y-4 my-12">
                <InputState 
                type="number"
                    label="شماره مبایعه نامه" 
                    value={dealNumber} 
                    onChange={(e) => setDealNumber(e.target.value)}
                />
                <InputState 
                    label="منطقه" 
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                />
                <InputState 
                    label="نوع ملک" 
                    value={dealType}
                    onChange={(e) => setDealType(e.target.value)}
                />
                <InputState 
                    label="نام فروشنده" 
                    value={seller} 
                    onChange={(e) => setSeller(e.target.value)}
                />
                <InputState 
                    label="نام خریدار" 
                    value={client} 
                    onChange={(e) => setClient(e.target.value)}
                />
                <InputState 
                    label="مبلغ قرارداد" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)}
                />
                <InputState 
                    label="کمیسیون دریافتی" 
                    value={commission} 
                    onChange={(e) => setCommission(e.target.value)}
                />
                {/* دیتاپیکر شمسی */}
                <div className="flex flex-col w-full">
                    <label className="mb-2 text-xs mr-5">تاریخ معامله</label>
                    <DatePicker
                        value={date}
                        onChange={setDate}
                        calendar={persian}
                        locale={persian_fa}
                        inputClass="appearance-none w-full py-3 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400 bg-[#f4f4f4]"
                        format="YYYY/MM/DD"
                        calendarPosition="bottom-right"
                        style={{ width: "100%" }}
                    />
                </div>
            </div>
            <textarea 
                placeholder="توضیحات را وارد کنید..." 
                className="w-full border border-gray-300 rounded-xl border-dashed mb-14 h-48 p-3 text-xs"
                value={note}
                onChange={(e) => setNote(e.target.value)}
            ></textarea>
            <button 
                className="text-white bg-main-color rounded-full px-14 py-2 ml-0 mr-auto flex mb-10"
                onClick={handleSubmit}
            >
                ثبت
            </button>
            {/* جدول معاملات */}
            <div className="mt-10">
                <span className="text-black font-bold text-lg mb-4 block">
                    لیست معاملات
                    <span className="text-gray-500 text-base font-normal mr-4">
                        (تعداد کل: {totalDeals})
                    </span>
                </span>
                {isLoading ? (
                    <div className="flex items-center justify-center h-40">
                        <PuffLoader color="#09A380" />
                    </div>
                ) : isError ? (
                    <div className="text-red-500 text-center">خطا در دریافت اطلاعات معاملات</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead className="bg-gray-100">
                                <tr>
                                    {dealColumns.map((col, idx) => (
                                        <th
                                            key={col.key}
                                            className="px-2 py-4 text-center whitespace-nowrap text-[16px]"
                                        >
                                            {col.label}
                                        </th>
                                    ))}
                                    <th className="px-2 py-4 text-center whitespace-nowrap text-[16px]">عملیات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {deals.map((deal: any, index: number) => (
                                    <tr key={deal.id || index} className="py-2 text-center border-b">
                                        {dealColumns.map(col => (
                                            <td key={col.key} className="p-4 whitespace-nowrap">
                                                {deal[col.key] !== undefined && deal[col.key] !== null
                                                    ? deal[col.key]
                                                    : "-"}
                                            </td>
                                        ))}
                                        <td className="p-4 flex gap-3 justify-center">
                                            <button
                                                className="cursor-pointer"
                                                onClick={() => handleEdit(deal)}
                                                title="ویرایش"
                                            >
                                                <FiEdit size={22}  color="#11a97f" />
                                            </button>
                                            <button
                                                className="text-red-500 hover:text-red-700"
                                                onClick={() => handleDelete(deal.id)}
                                                title="حذف"
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </InitialLayout>
    )
}

export default TransactionManagement;
