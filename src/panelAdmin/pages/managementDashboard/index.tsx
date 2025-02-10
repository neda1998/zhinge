import RouteChevron from "../../../components/common/RouteChevron"
import EstateOfManagement from "../../../components/estateOfManagement"
import GraphicalReportsCircle from "../../../components/graphicalReportsCircle"
import GraphicalReportsLine from "../../../components/graphicalReportsCircle/GraphicalReportsLine"
import { pageAdmin } from "../../../utils/data"
import InitialLayout from "../../dashboard/initialLayoutAdmin"


const ManagementDashboard = () => {
  return (
    <InitialLayout>
      <div className="flex items-center justify-between border-b border-b-gray-200 mb-10 lg:py-7 py-4 overflow-x-auto w-[330px] sm:w-full lg:overflow-x-visible gap-7">
        <div>
          <span className="text-black font-extrabold lg:text-xl text-lg whitespace-nowrap">داشبورد مدیریتی</span>
        </div>
        <RouteChevron items={pageAdmin} />
      </div>
      <EstateOfManagement />
      <div className="grid lg:grid-cols-2 gap-4 items-center lg:my-20 mt-20">
        <GraphicalReportsCircle />
        <GraphicalReportsLine />
      </div>
    </InitialLayout>
  )
}

export default ManagementDashboard
