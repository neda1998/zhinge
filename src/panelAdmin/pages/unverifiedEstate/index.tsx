import RouteChevron from "../../../components/common/RouteChevron"
import { pageNewEstate } from "../../../utils/data"
import InitialLayout from "../../dashboard/initialLayoutAdmin"
import ChooseItemsOfState from "../propertyManagement/ChooseItemsOfState"
import UseNotconfirmedannouncementsQuery from "../../../hooks/queries/admin/notconfirmedannouncements/UseNotconfirmedannouncementsQuery"
import { PuffLoader } from "react-spinners";
import UnverifiedEstateTable from "./UnverifiedEstateTable"

interface Props {}

const UnverifiedEstate = ({ }: Props) => {
    const { data, isLoading, isError } = UseNotconfirmedannouncementsQuery();

    const tableData = data?.deleted || [];
    const count = data?.number;
console.log(data, "data in unverified estate page");

    return (
        <InitialLayout>
            <div className="flex items-center justify-between border-b border-b-gray-200 mb-10 lg:py-7 py-4 overflow-x-auto w-[330px] sm:w-full lg:overflow-x-visible gap-7">
                <div>
                    <span className="font-extrabold text-lg whitespace-nowrap">مدیریت املاک</span>
                </div>
                <RouteChevron items={pageNewEstate} />
            </div>
            <ChooseItemsOfState />
            {isLoading ? (
                <div className="flex items-center justify-center h-screen">
                    <PuffLoader color="#09A380" />
                </div>
            ) : isError ? (
                <div>خطا در دریافت اطلاعات</div>
            ) : (
                <UnverifiedEstateTable data={tableData} count={count} />
            )}
        </InitialLayout>
    )
}

export default UnverifiedEstate
