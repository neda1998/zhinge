import RouteChevron from "../../../components/common/RouteChevron";
import { pageEstate } from "../../../utils/data";
import InitialLayout from "../../dashboard/initialLayoutAdmin";
import ChooseItemsOfState from "./ChooseItemsOfState";


const StateManagement = () => {
    return (
        <InitialLayout>
      <div className="flex items-center justify-between border-b border-b-gray-200 mb-10 lg:py-7 py-4 overflow-x-auto w-[330px] sm:w-full lg:overflow-x-visible gap-7">
        <div>
          <span className="text-black font-extrabold text-lg whitespace-nowrap">مدیریت املاک</span>
        </div>
        <RouteChevron items={pageEstate} />
      </div>
      <ChooseItemsOfState />
    </InitialLayout>
    )
}

export default StateManagement
