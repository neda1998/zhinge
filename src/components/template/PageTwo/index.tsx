import React, { useState } from 'react';
import Button from "../../ui/atoms/Button";
import InputState from "../../ui/atoms/input/inputState";

export default function PageTwo() {
  const [deposit, setDeposit] = useState('');
  const [rent, setRent] = useState('');
  const [commission, setCommission] = useState<number | null>(null);

  const calculateCommission = () => {
    const r = Number(deposit.replace(/,/g, ""));
    const y = Number(rent.replace(/,/g, ""));

    if (isNaN(r) || isNaN(y) || r <= 0 || y <= 0) {
      setCommission(null);
      return;
    }

    const total = ((r / 4) + (0.3 * y)) * 1.1;
    setCommission(total);
  };

  return (
    <div className="w-full flex flex-col gap-4 px-8 mobile:px-0">
      <InputState 
        placeholder="قیمت رهن ملک (تومان)" 
        value={deposit}
        onChange={(e) => setDeposit(e.target.value)}
      />
      <InputState 
        placeholder="قیمت اجاره (تومان)" 
        value={rent}
        onChange={(e) => setRent(e.target.value)}
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
              سهم پرداختی مستاجر
            </span>
            <span className="border-dashed border-b-2 border-[#1E1E1E66] text-[16px] w-full h-3"></span>
            <p className="text-[15px] text-nowrap">
              {(commission / 2).toLocaleString()} تومان
            </p>
          </div>
          <div className="w-full flex items-center gap-2 flex-nowrap">
            <span className="text-[15px] text-nowrap">
              سهم پرداختی موجر
            </span>
            <span className="border-dashed border-b-2 border-[#1E1E1E66] text-[16px] w-full h-3"></span>
            <p className="text-[15px] text-nowrap">
              {(commission / 2).toLocaleString()} تومان
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
