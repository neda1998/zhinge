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
    const {data}= UseGetAllDealsQuery();

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

    return (
        <InitialLayout>
            <div className="flex items-center justify-between border-b border-b-gray-200 mb-10 lg:py-7 py-4 overflow-x-auto w-full lg:overflow-x-visible gap-7 flex-wrap  ">
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
        </InitialLayout>
    )
}

export default TransactionManagement;
