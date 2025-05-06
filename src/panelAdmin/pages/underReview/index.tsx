import RouteChevron from "../../../components/common/RouteChevron"
import Table from "../../../components/common/Table"
import { pageUnderReview } from "../../../utils/data"
import InitialLayout from "../../dashboard/initialLayoutAdmin"
import ChooseItemsOfState from "../propertyManagement/ChooseItemsOfState"
import UseInprogressQuery from "../../../hooks/queries/admin/inprogress/UseInprogressQuery"
import { PuffLoader } from "react-spinners";

interface Props {}

const UnderReview = ({ }: Props) => {
    const { data, isLoading, isError } = UseInprogressQuery();

    const tableData = data?.inprogress?.map((item: any, idx: number) => ({
        "ردیف": idx + 1,
        "کد ملک": item.id,
        "نوع ملک": item.type,
        "منطقه": item.region,
        "نام مالک": item.full_name,
        "شماره تماس": item.userID,
        "قیمت": item.price,
        "مساحت کل زمین": item.land_metrage,
        "تاریخ ثبت": item.created_at || "", 
    })) || [];

    return (
        <InitialLayout>
            <div className="flex items-center justify-between border-b border-b-gray-200 mb-10 lg:py-7 py-4 overflow-x-auto w-[330px] sm:w-full lg:overflow-x-visible gap-7">
                <div>
                    <span className="font-extrabold text-lg whitespace-nowrap">مدیریت املاک</span>
                </div>
                <RouteChevron items={pageUnderReview} />
            </div>
            <ChooseItemsOfState />
            {isLoading ? (
                <div className="flex items-center justify-center h-screen">
                    <PuffLoader color="#09A380" />
                </div>
            ) : isError ? (
                <div>خطا در دریافت اطلاعات</div>
            ) : (
                <Table data={tableData} />
            )}
        </InitialLayout>
    )
}

export default UnderReview
