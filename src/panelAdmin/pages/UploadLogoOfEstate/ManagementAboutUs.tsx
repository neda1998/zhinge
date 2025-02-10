import { FiEdit } from "react-icons/fi"
import RouteChevron from "../../../components/common/RouteChevron"
import { pageManagementAboutus } from "../../../utils/data"

const ManagementAboutUs = () => {
    return (
        <>
            <div className="flex items-center justify-between border-b border-b-gray-200 mb-10 lg:py-7 py-4 overflow-x-auto w-[330px] sm:w-full lg:overflow-x-visible gap-7">
                <div>
                    <span className="text-black font-extrabold text-lg whitespace-nowrap">تنظیمات مدیریتی</span>
                </div>
                <RouteChevron items={pageManagementAboutus} />
            </div>
            <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between">
                    <span className="text-gray-500">در مورد ژینگه</span>
                    <div className="shadow-xl rounded-full p-2 flex items-center justify-center bg-white">
                        <FiEdit color="#11a97f" />
                    </div>
                </div>
                <div className="border border-gray-600 rounded-xl p-4">
                    <span className="">{`ژینگه به معنای محیط زیست،جایی برای زیستن. در راستای به وجود آمدن دنیای ارتباطات و ایجاد رفاه در زمینه خرید و فروش ملک برای همشهریان عزیز املاک اینترنتی ژینگه با تاسیس سایت وراه اندازی اپلیکیشن راهی به سوی خرید و فروش ملک به صورت آنلاین فراهم کرده است که شما هموطنان عزیز بتوانید در خانه باسلیقه خوداقدام به خرید و فروش ملک بنمایید.ژینگه در سال 1396 پایه گذاری و ثبت گردید. که در این 3 سال با افتخار به طور مداوم در خدمت همشهریان عزیز در سرتاسر ایران بوده ایم امیدواریم در این راستا مارا همراهی و یاری بفرمایید. با تشکر مدیریت ژینگه`}</span>
                </div>
            </div>
            <div className="flex flex-col mt-12 gap-5">
                <div className="flex items-center justify-between">
                    <span className="text-gray-500">اهداف ژینگه</span>
                    <div className="shadow-xl rounded-full p-2 flex items-center justify-center bg-white">
                        <FiEdit color="#11a97f" />
                    </div>
                </div>
                <div className="border border-gray-600 rounded-xl p-4">
                    <span className="">{`هدف گروه مهنندسی ژینگه جلب رضایت شما همشهریان عزیز می باشد . ژینگه با کادری متخصص و مجرب آماده مشاوره رایگان و خرید و فروش بدون واسطه املاک ومستغلات شما عزیزان می باشد  `}</span>
                </div>
            </div>
        </>
    )
}

export default ManagementAboutUs
