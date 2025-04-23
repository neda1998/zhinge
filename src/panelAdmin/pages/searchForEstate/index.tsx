import RouteChevron from "../../../components/common/RouteChevron"
import InputState from "../../../components/ui/atoms/input/inputState"
import { pageSearchForEstate } from "../../../utils/data"
import InitialLayout from "../../dashboard/initialLayoutAdmin"
import ChooseItemsOfState from "../propertyManagement/ChooseItemsOfState"
import UseSearchStateMutation from "../../../hooks/mutation/searchState/UseSearchStateMutation"
import { useState } from "react"

const SearchForEstate = () => {
  const searchMutation = UseSearchStateMutation();
  const [form, setForm] = useState<any>({});

  const handleChange = (label: string, value: any) => {
    setForm((prev: any) => ({
      ...prev,
      [label]: value
    }));
  };

  const handleSearch = () => {
    const payload = {
      loan: form.loan || "",
      type: form.type || "",
      region: form.region || "",
      address: form.address || "",
    };
  
    searchMutation.mutate(payload);
  };
  

  return (
    <InitialLayout>
      <div className="flex items-center justify-between border-b border-b-gray-200 mb-10 lg:py-7 py-4 overflow-x-auto w-[330px] sm:w-full lg:overflow-x-visible gap-7">
        <div>
          <span className="font-extrabold text-lg whitespace-nowrap">مدیریت املاک</span>
        </div>
        <RouteChevron items={pageSearchForEstate} />
      </div>
      <ChooseItemsOfState />
      <div className="grid lg:grid-cols-4 gap-x-5 gap-y-10 mb-9">
        <InputState label="منطقه" onChange={e => handleChange("region", e.target.value)} />
        <InputState label="نوع ملک" onChange={e => handleChange("type", e.target.value)} />
        <InputState label="وام" onChange={e => handleChange("loan", Number(e.target.value))} />
      </div>
      <div className="flex items-center justify-between w-full gap-5">
        <InputState label="آدرس ملک" placeholder="آدرس را وارد کنید" onChange={e => handleChange("address", e.target.value)} />
      </div>
      <div className="flex justify-end items-center my-8">
        <button
          className="bg-main-color rounded-full px-10 py-2 text-white"
          onClick={handleSearch}
          disabled={searchMutation.isLoading}
        >
          {searchMutation.isLoading ? "در حال جستجو..." : "جستجو"}
        </button>
      </div>
    </InitialLayout>
  )
}

export default SearchForEstate
