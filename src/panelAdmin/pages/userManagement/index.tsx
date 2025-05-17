import RouteChevron from "../../../components/common/RouteChevron"
import { pageUserManagement  } from "../../../utils/data"
import InitialLayout from "../../dashboard/initialLayoutAdmin"
import UserManagementTable from "./UserManagementTable"

const UserManagement = () => {
    return (
        <InitialLayout>
            <div className="flex items-center justify-between border-b border-b-gray-200 mb-10 lg:py-7 py-4 overflow-x-auto w-full lg:overflow-x-visible gap-7 flex-wrap  ">
                <div>
                    <span className="font-extrabold text-lg whitespace-nowrap">مدیریت کاربران</span>
                </div>
                <RouteChevron items={pageUserManagement} />
            </div>
            <UserManagementTable />
        </InitialLayout>
    )
}

export default UserManagement
