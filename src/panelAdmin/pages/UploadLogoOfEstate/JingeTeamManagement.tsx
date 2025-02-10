import RouteChevron from "../../../components/common/RouteChevron"
import { pageJingeTeamManagement } from "../../../utils/data"
import JingeTeamManagementTable from "./JingeTeamManagementTable"

const JingeTeamManagement = () => {
    return (
        <>
            <div className="flex items-center justify-between border-b border-b-gray-200 mb-10 lg:py-7 py-4 overflow-x-auto w-[330px] sm:w-full lg:overflow-x-visible gap-7">
                <div>
                    <span className="text-black font-extrabold text-lg whitespace-nowrap">تنظیمات مدیریتی</span>
                </div>
                <RouteChevron items={pageJingeTeamManagement} />
            </div>
            <JingeTeamManagementTable />
        </>
    )
}

export default JingeTeamManagement
