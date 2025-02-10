import RouteChevron from "../../../components/common/RouteChevron"
import Table from "../../../components/common/Table"
import { dataTable, pageNewEstate } from "../../../utils/data"
import InitialLayout from "../../dashboard/initialLayoutAdmin"
import ChooseItemsOfState from "../propertyManagement/ChooseItemsOfState"

interface Props {

}
const UnverifiedEstate = ({ }: Props) => {
    return (
        <InitialLayout>
            <div className="flex items-center justify-between border-b border-b-gray-200 mb-10 lg:py-7 py-4 overflow-x-auto w-[330px] sm:w-full lg:overflow-x-visible gap-7">
                <div>
                    <span className="text-black font-extrabold text-lg whitespace-nowrap">مدیریت املاک</span>
                </div>
                <RouteChevron items={pageNewEstate} />
            </div>
            <ChooseItemsOfState />
            <Table data={dataTable} />
        </InitialLayout>
    )
}

export default UnverifiedEstate
