import InitialLayout from "../../dashboard/initialLayoutAdmin"
import ChooseItemsOfState from "../propertyManagement/ChooseItemsOfState"
import { pageNewEstate } from "../../../utils/data"
import RouteChevron from "../../../components/common/RouteChevron"
import Stepper from "../../../components/stepperState"


const NewEstateRegistration = () => {
  return (
    <InitialLayout>
      <div className="flex items-center justify-between border-b border-b-gray-200 mb-10 lg:py-7 py-4 overflow-x-auto w-[330px] sm:w-full lg:overflow-x-visible gap-7">
          <span className="text-black font-extrabold text-lg whitespace-nowrap">مدیریت املاک</span>
        <RouteChevron items={pageNewEstate} />
      </div>
      <ChooseItemsOfState />
      <div className="flex justify-center items-center flex-col w-full">
        <span className="text-black font-extrabold lg:text-2xl">فرم ثبت ملک جدید</span>
        <Stepper />
      </div>
    </InitialLayout>
  )
}

export default NewEstateRegistration
