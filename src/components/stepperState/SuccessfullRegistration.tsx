import InitialLayout from "../../panelAdmin/dashboard/initialLayoutAdmin"
import ChooseItemsOfState from "../../panelAdmin/pages/propertyManagement/ChooseItemsOfState"
import { pageNewEstate } from "../../utils/data"
import RouteChevron from "../common/RouteChevron"

const SuccessfullRegistration = () => {
    return (
        <InitialLayout>
            <div className="flex items-center justify-between border-b border-b-gray-200 mb-10 lg:py-7 py-4 overflow-x-auto w-9 lg:w-full lg:overflow-x-visible gap-7">
                <div>
                    <span className="text-black font-extrabold text-lg whitespace-nowrap">مدیریت املاک</span>
                </div>
                <RouteChevron items={pageNewEstate} />
            </div>
            <ChooseItemsOfState />
            <div className="flex justify-center items-center">
                <span className="text-black text-xl">ملک با موفقیت ثبت شد !</span>
            </div>
        </InitialLayout>
    )
}

export default SuccessfullRegistration
