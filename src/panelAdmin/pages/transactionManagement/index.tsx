import ComboBox from "../../../components/common/Combo"
import RouteChevron from "../../../components/common/RouteChevron"
import InputState from "../../../components/ui/atoms/input/inputState"
import { pageTransactionManagement } from "../../../utils/data"
import InitialLayout from "../../dashboard/initialLayoutAdmin"

const TransactionManagement = () => {
    return (
        <InitialLayout>
            <div className="flex items-center justify-between border-b border-b-gray-200 mb-10 lg:py-7 py-4 overflow-x-auto w-[330px] sm:w-full lg:overflow-x-visible gap-7">
                <div>
                    <span className="text-black font-extrabold text-lg whitespace-nowrap">مدیریت معاملات</span>
                </div>
                <RouteChevron items={pageTransactionManagement} />
            </div>
            <span className="text-black font-bold text-lg">ثبت معاملات جدید</span>
            <div className="grid lg:grid-cols-4 grid-cols-1 lg:gap-x-5 lg:gap-y-10 gap-y-4 my-12">
                <InputState label="شماره مبایعه نامه" />
                <ComboBox label="منطقه" options={["کردستان", "تهران", "ارومیه"]} />
                <ComboBox label="نوع ملک" options={["ویلایی", "اپارتمان"]} />
                <InputState label="نام فروشنده" />
                <InputState label="نام خریدار" />
                <InputState label="مبلغ قرارداد" />
                <InputState label="کمیسیون دریافتی" />
                <InputState label="تاریخ معامله" />
            </div>
            <textarea placeholder="توضیحات را وارد کنید..." className="w-full border border-gray-300 rounded-xl border-dashed mb-14 h-48 p-3 text-xs"></textarea>
            <button className="text-white bg-main-color rounded-full px-14 py-2 ml-0 mr-auto flex">ثبت</button>
        </InitialLayout>
    )
}

export default TransactionManagement
