import RouteChevron from "../../../components/common/RouteChevron"
import { pageRequestEstateNewHouse } from "../../../utils/data"
import InitialLayout from "../../dashboard/initialLayoutAdmin"
import NewHouseTable from "./NewHouseTable"

interface Props {
    title?: string
}

const RequestedEstateNewHouse = ({ title }: Props) => {
    return (
        <InitialLayout>
            <div className="flex items-center justify-between border-b border-b-gray-200 mb-10 lg:py-7 py-4 overflow-x-auto w-[330px] sm:w-full lg:overflow-x-visible gap-7">
                <div>
                    <span className="text-black font-extrabold text-lg whitespace-nowrap">ملک های درخواستی</span>
                </div>
                <RouteChevron items={pageRequestEstateNewHouse} />
            </div>
            <div className="grid lg:grid-cols-3 grid-cols-1 lg:gap-7 gap-16 items-center my-14">
                <div className="rounded-xl p-6" style={{ boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px" }}>
                    <div className="rounded-lg flex justify-center items-center py-2 -translate-y-10 bg-[#FA8036]">
                        <span className="text-white text-center">منطقه های درخواستی</span>
                    </div>
                    <div className="grid lg:grid-cols-3 gap-4">
                        <div className="flex justify-center items-center bg-[#ffdbc4] rounded-md py-2">
                            <span className="text-black  py-1">مبارک آباد</span>
                        </div>
                        <div className="flex justify-center items-center bg-[#ffdbc4] rounded-md py-2">
                            <span className="text-black py-1">مبارک آباد</span>
                        </div>
                        <div className="flex justify-center items-center bg-[#ffdbc4] rounded-md py-2">
                            <span className="text-black py-1">مبارک آباد</span>
                        </div>
                        <div className="flex justify-center items-center bg-[#ffdbc4] rounded-md py-2">
                            <span className="text-black py-1">مبارک آباد</span>
                        </div>
                        <div className="flex justify-center items-center bg-[#ffdbc4] rounded-md py-2">
                            <span className="text-black py-1">مبارک آباد</span>
                        </div>
                        <div className="flex justify-center items-center bg-[#ffdbc4] rounded-md py-2">
                            <span className="text-black py-1">مبارک آباد</span>
                        </div>
                    </div>
                </div>
                <div className="rounded-xl p-6" style={{ boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px" }}>
                    <div className="rounded-lg flex justify-center items-center py-2 -translate-y-10 bg-[#5096F7]">
                        <span className="text-white text-center">نوع ملک</span>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-4">
                        <div className="flex justify-center items-center bg-[#81b5ff] rounded-md py-2">
                            <span className="text-black py-1">باغ</span>
                        </div>
                        <div className="flex justify-center items-center bg-[#81b5ff] rounded-md py-2">
                            <span className="text-black py-1">مغازه</span>
                        </div>
                        <div className="flex justify-center items-center bg-[#81b5ff] rounded-md py-2">
                            <span className="text-black py-1">معاوضه</span>
                        </div>
                        <div className="flex justify-center items-center bg-[#81b5ff] rounded-md py-2">
                            <span className="text-black py-1">کلنگی</span>
                        </div>
                    </div>
                </div>
                <div className="rounded-xl p-6" style={{ boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px" }}>
                    <div className="rounded-lg flex justify-center items-center py-2 -translate-y-10 bg-[#17C3A5]">
                        <span className="text-white text-center">یادداشت های مدیریت</span>
                    </div>
                    <textarea placeholder="یادداشت..." className="border-dashed rounded-xl p-3 w-full"></textarea>
                    <button className="bg-[#09A380] text-white py-2 px-24 ml-0 mr-auto">ثبت</button>
                </div>
            </div>
            <div className="rounded-xl p-6" style={{ boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px" }}>
                <div className="rounded-lg flex justify-center items-center py-2 -translate-y-10 bg-[#EA5A92] w-72">
                    <span className="text-white text-center">مشخصات درخواست کننده ملک</span>
                </div>
                <NewHouseTable />
            </div>
        </InitialLayout>
    )
}

export default RequestedEstateNewHouse
