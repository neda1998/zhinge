import InputState from "../../../components/ui/atoms/input/inputState";
import Swal from "sweetalert2";
import { useState } from "react";

interface StepThreeUserProps {
    showSubmitButton?: boolean;
    isAnnouncementSubmitted?: boolean;
    full_name: string; setFullName: (v: string) => void;
    type?: string;
    usage?: string;
    region?: string;
    address?: string;
    location?: string;
    setLocation: (v: string) => void;
    price?: number;
    loan?: number;
    year_of_build?: number;
    room_number?: number;
    land_metrage?: number;
    floor_number?: number;
    floor?: number;
    onSibmit?: () => void;
    onReset?: () => void; 
}

const StepThreeUser = ({
  showSubmitButton = true,
  isAnnouncementSubmitted,
  full_name, setFullName,
  type, usage, region, address, location, setLocation, price,
  loan, year_of_build, room_number, land_metrage, floor_number, floor,
  onReset,
  onSibmit,
}: StepThreeUserProps) => {
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);

    if (!full_name.trim()) {
      Swal.fire({
        icon: "warning",
        title: "اخطار",
        text: "لطفا همه فیلدهای ضروری را پر کنید!",
        confirmButtonText: "باشه"
      });
      return;
    }

    if (!showSubmitButton) {
      Swal.fire({
        icon: "warning",
        title: "اخطار",
        text: "لطفا اطلاعات را ثبت کنید!",
        confirmButtonText: "باشه"
      });
      return;
    }

    if (onSibmit) {
      onSibmit();
    }
  };

  return (
    <form
      className="w-full grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5"
      onSubmit={handleSubmit}
    >
      <InputState
        label="نام مالک"
        placeholder="مثال: علی احمدی"
        value={full_name}
        onChange={e => setFullName(e.target.value)}
      />
      {showSubmitButton && (
        <div className="flex justify-end col-span-4">
          <button
            type="submit"
            className="bg-main-color text-white px-8 py-2 rounded-full mt-4"
            disabled={isAnnouncementSubmitted}
          >
            {isAnnouncementSubmitted ? "در حال ثبت..." : "ثبت آگهی"}
          </button>
        </div>
      )}
    </form>
  );
};

export default StepThreeUser;