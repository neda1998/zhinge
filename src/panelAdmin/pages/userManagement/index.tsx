import RouteChevron from "../../../components/common/RouteChevron"
import Search from "../../../components/common/Search"
import { pageUserManagement, userManagementTable,  } from "../../../utils/data"
import InitialLayout from "../../dashboard/initialLayoutAdmin"
import UserManagementTable from "./UserManagementTable"

const UserManagement = () => {
    return (
        <InitialLayout>
            <div className="flex items-center justify-between border-b border-b-gray-200 mb-10 lg:py-7 py-4 overflow-x-auto w-[330px] sm:w-full lg:overflow-x-visible gap-7">
                <div>
                    <span className="text-black font-extrabold text-lg whitespace-nowrap">اسلایدرها</span>
                </div>
                <RouteChevron items={pageUserManagement} />
            </div>
            <Search className="lg:w-1/2 w-full my-12" searchClass="w-12 h-11" />
            <UserManagementTable dataRequest={userManagementTable} />
        </InitialLayout>
    )
}

export default UserManagement
