import RouteChevron from "../../../components/common/RouteChevron"
import Search from "../../../components/common/Search"
import { pageRequestEstate, requestedEstateTable } from "../../../utils/data"
import InitialLayout from "../../dashboard/initialLayoutAdmin"
import RequestEstateTable from "./RequestEstateTable"
import newHouse from "../../../assets/images/newHouse.png"
import { Link } from "react-router-dom"


const RequestedEstate = () => {
    return (
        <InitialLayout>
            <div className="flex items-center justify-between border-b border-b-gray-200 mb-10 lg:py-7 py-4 overflow-x-auto w-[330px] sm:w-full lg:overflow-x-visible gap-7">
                <div>
                    <span className="text-black font-extrabold text-lg whitespace-nowrap">ملک های درخواستی</span>
                </div>
                <RouteChevron items={pageRequestEstate} />
            </div>
            <div className="flex items-center">
                <Search className="lg:w-1/2 w-full my-12" searchClass="w-12 h-11" />
                <Link to="/panel-admin/dashboard/estate-management/requested-estate/new-house" className="flex flex-col items-center gap-3 mt-6">
                    <div
                        className={`rounded-xl p-3 bg-white transition-colors duration-300 cursor-pointer`}
                        style={{
                            boxShadow:
                                "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                        }}
                    >
                        <img src={newHouse} alt="new house" className="w-9 h-9" />
                    </div>
                    <span className={`text-black transition-colors duration-300 whitespace-nowrap`}>
                        ثبت ملک جدید
                    </span>
                </Link>
            </div>
            <RequestEstateTable dataRequest={requestedEstateTable} />
        </InitialLayout>
    )
}

export default RequestedEstate
