import { useState } from "react";
import ComboBox from "../../../components/common/Combo"
import RouteChevron from "../../../components/common/RouteChevron"
import InputState from "../../../components/ui/atoms/input/inputState"
import { pageTransactionManagement } from "../../../utils/data"
import InitialLayout from "../../dashboard/initialLayoutAdmin"
import { creatDeal } from "../../../services/admin/creatDeal";

const TransactionManagement = () => {
    // State hooks for form fields
    const [dealNumber, setDealNumber] = useState("");
    const [region, setRegion] = useState("");
    const [dealType, setDealType] = useState("");
    const [seller, setSeller] = useState("");
    const [client, setClient] = useState("");
    const [price, setPrice] = useState("");
    const [commission, setCommission] = useState("");
    const [date, setDate] = useState("");
    const [note, setNote] = useState("");

    const handleSubmit = async () => {
        const data = {
            seller: seller,
            region: region,
            type: dealType,
            number: dealNumber,
            client: client,
            price: Number(price),
            commission: Number(commission),
            date: date,
            note: note
        };
        try {
            const response = await creatDeal(data);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

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
                    label="شماره مبایعه نامه" 
                    value={dealNumber} 
                    onChange={(e) => setDealNumber(e.target.value)}
                />
                <ComboBox 
                    label="منطقه" 
                    options={["کردستان", "تهران", "ارومیه"]} 
                    value={region}
                    onChange={(val) => setRegion(val)}
                />
                <ComboBox 
                    label="نوع ملک" 
                    options={["ویلایی", "اپارتمان"]} 
                    value={dealType}
                    onChange={(val) => setDealType(val)}
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
                <InputState 
                    label="تاریخ معامله" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>
            <textarea 
                placeholder="توضیحات را وارد کنید..." 
                className="w-full border border-gray-300 rounded-xl border-dashed mb-14 h-48 p-3 text-xs"
                value={note}
                onChange={(e) => setNote(e.target.value)}
            ></textarea>
            <button 
                className="text-white bg-main-color rounded-full px-14 py-2 ml-0 mr-auto flex"
                onClick={handleSubmit}
            >
                ثبت
            </button>
        </InitialLayout>
    )
}

export default TransactionManagement;
