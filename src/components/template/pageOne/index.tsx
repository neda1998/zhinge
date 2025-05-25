import React, { useState } from 'react';
import Button from "../../ui/atoms/Button";
import InputState from "../../ui/atoms/input/inputState";

export default function PageOne() {
  const [price, setPrice] = useState('');
  const [commission, setCommission] = useState<number | null>(null);

  const calculateCommission = () => {
    const a = Number(price.replace(/,/g, ""));
    if (isNaN(a) || a <= 0) {
      setCommission(null);
      return;
    }

    const y = ((a - 1000000000) * 0.005) + 1000000;
    const result = (y * 1.1) / 2;

    setCommission(result * 2);
  };

  return (
    <div className="w-full flex flex-col gap-4 px-8 mobile:px-0">
      <InputState 
        placeholder="قیمت مورد نظر جهت فروش ملک را وارد کنید(تومان)" 
        value={price} 
        onChange={(e) => setPrice(e.target.value)}
      />
      <Button
        fullwidth={"true"}
        bgcolor={"#09A380"}
        height={"55px"}
        color={"white"}
        borderradius={"50px"}
        onClick={calculateCommission}
      >
        محاسبه کمیسیون
      </Button>

      {commission !== null && (
        <div className="w-full px-4 py-8 flex flex-col gap-4 rounded-[20px] bg-[#D9D9D926]">
          <div className="w-full flex items-center gap-2 flex-nowrap">
            <span className="text-[15px] text-nowrap">
              کمیسیون فروش ملک
            </span>
            <span className="border-dashed border-b-2 border-[#1E1E1E66] text-[16px] w-full h-3"></span>
            <p className="text-[15px]">{commission.toLocaleString()} تومان</p>
          </div>
          <div className="w-full flex items-center gap-2 flex-nowrap">
            <span className="text-[15px] text-nowrap">
              سهم پرداختی خریدار
            </span>
            <span className="border-dashed border-b-2 border-[#1E1E1E66] text-[16px] w-full h-3"></span>
            <p className="text-[15px] text-nowrap">{(commission / 2).toLocaleString()} تومان</p>
          </div>
          <div className="w-full flex items-center gap-2 flex-nowrap">
            <span className="text-[15px] text-nowrap">
              سهم پرداختی فروشنده
            </span>
            <span className="border-dashed border-b-2 border-[#1E1E1E66] text-[16px] w-full h-3"></span>
            <p className="text-[15px] text-nowrap">{(commission / 2).toLocaleString()} تومان</p>
          </div>
        </div>
      )}
    </div>
  );
}
