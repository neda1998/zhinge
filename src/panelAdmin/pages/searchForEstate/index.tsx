import RouteChevron from "../../../components/common/RouteChevron"
import InputState from "../../../components/ui/atoms/input/inputState"
import { pageSearchForEstate } from "../../../utils/data"
import InitialLayout from "../../dashboard/initialLayoutAdmin"
import ChooseItemsOfState from "../propertyManagement/ChooseItemsOfState"
import UseSearchStateMutation from "../../../hooks/mutation/searchState/UseSearchStateMutation"
import { useState } from "react"
import Swal from "sweetalert2"

const SearchForEstate = () => {
  const [form, setForm] = useState<any>({});

  const handleChange = (label: string, value: any) => {
    setForm((prev: any) => ({
      ...prev,
      [label]: value
    }));
  };

  const resetForm = () => setForm({});

  const searchMutation = UseSearchStateMutation({
    onSuccess: resetForm
  });

  const handleSearch = () => {
    const payload = {
      phone: form.phone ? String(form.phone) : "",
      full_name: form.full_name || "",
      state_code: form.state_code,
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
        <InputState label="کد ملک" value={form.state_code || ""} onChange={e => handleChange("state_code", e.target.value)} />
        <InputState label="نام مالک" value={form.full_name || ""} onChange={e => handleChange("full_name", e.target.value)} />
        <InputState label="شماره موبایل" value={form.phone || ""} onChange={e => handleChange("phone", e.target.value)} />
      </div>
      <div className="flex items-center justify-between md:w-1/2 w-full gap-5">
        <InputState label="آدرس ملک" value={form.address || ""} placeholder="آدرس را وارد کنید" onChange={e => handleChange("address", e.target.value)} />
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
