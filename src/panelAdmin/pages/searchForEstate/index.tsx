import ComboBox from "../../../components/common/Combo"
import RouteChevron from "../../../components/common/RouteChevron"
import Table from "../../../components/common/Table"
import InputState from "../../../components/ui/atoms/input/inputState"
import { dataTable, pageSearchForEstate } from "../../../utils/data"
import InitialLayout from "../../dashboard/initialLayoutAdmin"
import ChooseItemsOfState from "../propertyManagement/ChooseItemsOfState"

const SearchForEstate = () => {
    return (
        <InitialLayout>
            <div className="flex items-center justify-between border-b border-b-gray-200 mb-10 lg:py-7 py-4 overflow-x-auto w-[330px] sm:w-full lg:overflow-x-visible gap-7">
                <div>
                    <span className="text-black font-extrabold text-lg whitespace-nowrap">مدیریت املاک</span>
                </div>
                <RouteChevron items={pageSearchForEstate} />
            </div>
            <ChooseItemsOfState />
            <div className="grid lg:grid-cols-4 gap-x-5 gap-y-10 mb-9">
                <ComboBox label="منطقه" options={["مبارک آباد", "بهاران", "مولوی"]} />
                <InputState label="تعداد اتاق خواب" />
                <InputState label="مساحت زیر بنا" />
                <ComboBox label="نوع ملک" options={["آپارتمانی", "ویلایی", "هر دو"]} />
                <InputState label="نام و نام خانوادگی" />
                <InputState label="کد ملک" />
                <ComboBox label="موقعیت ملک" options={["شمالی", "جنوبی"]} />
                <InputState label="شماره موبایل" />
            </div>
            <div className="flex items-center justify-between w-full gap-5">
                <InputState label="آدرس ملک" placeholder="آدرس را وارد کنید" />
                <InputState label="توضیحات" placeholder="توضیحات را وارد کنید" />
            </div>
            <div className="flex justify-end items-center my-8">
                <button className="bg-main-color rounded-full px-10 py-2 text-white">جستجو</button>
            </div>
            <Table data={dataTable} />
        </InitialLayout>
    )
}

export default SearchForEstate
