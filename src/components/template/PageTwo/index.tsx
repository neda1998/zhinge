import Button from "../../ui/atoms/Button";
import Input from "../../ui/atoms/input";
import InputState from "../../ui/atoms/input/inputState";

export default function PageTwo() {
  return (
    <div className="w-full flex flex-col gap-4 px-8 mobile:px-0">
      <InputState placeholder="قیمت رهن ملک (تومان)" />
      <InputState placeholder="قیمت اجاره (تومان)" />
      <Button
        fullwidth={"true"}
        bgcolor={"#09A380"}
        height={"55px"}
        color={"white"}
        borderradius={"50px"}
      >
        محاسبه کمیسیون 
      </Button>
      <div className="w-full px-4 py-8 flex flex-col gap-4 rounded-[20px] bg-[#D9D9D926]">
        <div className="w-full flex items-center gap-2 flex-nowrap">
          <span className="text-[15px] text-nowrap">
            سهم پرداختی مستاجر
          </span>
          <span className="border-dashed border-b-2 border-[#1E1E1E66] text-[16px] w-full h-3"></span>
          <p className="text-[15px]"> 27,795,000تومان</p>
        </div>
        <div className="w-full flex items-center gap-2 flex-nowrap">
          <span className="text-[15px] text-nowrap">
            سهم پرداختی موجر
          </span>
          <span className="border-dashed border-b-2 border-[#1E1E1E66] text-[16px] w-full h-3"></span>
          <p className="text-[15px] text-nowrap">13,897,500 تومان</p>
        </div>
      </div>
    </div>
  );
}
