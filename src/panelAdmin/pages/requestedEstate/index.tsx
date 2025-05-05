import RouteChevron from "../../../components/common/RouteChevron"
import { pageRequestEstate } from "../../../utils/data"
import InitialLayout from "../../dashboard/initialLayoutAdmin"
import RequestEstateTable from "./RequestEstateTable"


const RequestedEstate = () => {
    return (
        <InitialLayout>
            <div className="flex items-center justify-between border-b border-b-gray-200 mb-10 lg:py-7 py-4 overflow-x-auto w-[330px] sm:w-full lg:overflow-x-visible gap-7">
                <div>
                    <span className="font-extrabold text-lg whitespace-nowrap">ملک های درخواستی</span>
                </div>
                <RouteChevron items={pageRequestEstate} />
            </div>
            <RequestEstateTable />
        </InitialLayout>
    )
}

export default RequestedEstate
