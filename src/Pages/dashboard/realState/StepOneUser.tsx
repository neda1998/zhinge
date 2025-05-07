import React from 'react';
import InputState from "../../../components/ui/atoms/input/inputState";
import ComboBox from '../../../components/common/Combo';

interface StepOneUserProps {
    loan: string; setLoan: (v: string) => void;
    type: string; setType: (v: string) => void;
    region: string; setRegion: (v: string) => void;
    address: string; setAddress: (v: string) => void;
    price: string; setPrice: (v: string) => void;
}

function formatInputNumber(val: string) {
    const onlyNums = val.replace(/[^\d]/g, "");
    return onlyNums.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const StepOneUser = ({
    loan, setLoan,
    type, setType,
    region, setRegion,
    address, setAddress,
    price, setPrice
}: StepOneUserProps) => {
    return (
        <div className="w-full grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5">
             <div className="flex flex-col items-start">
                <InputState
                    label="وام"
                    value={loan !== undefined && loan !== null ? formatInputNumber(String(loan)) : ""}
                    onChange={(e) => {
                        const formatted = formatInputNumber(e.target.value);
                        e.target.value = formatted;
                        setLoan(formatted);
                    }}
                />
            <span className="text-xs text-red-600 my-1">اگر وام ندارید، عدد 0 رو وارد کنید</span>
            <span className="text-xs text-gray-500 my-1">به تومان</span>
            </div>
            <div className="flex flex-col items-start">
                <InputState
                    label="قیمت"
                    placeholder="مثال: 500,000,000 تومان"
                    value={price}
                    onChange={e => setPrice(formatInputNumber(e.target.value))}
                />
                <span className="text-xs text-gray-500 my-1">به تومان</span>
            </div>
            <InputState
                label="منطقه"
                placeholder="مثال: 2"
                value={region}
                onChange={e => setRegion(e.target.value)}
            />
            <InputState
                label="آدرس"
                placeholder="سنندج، خیابان پاسداران، کوچه ادب 2، پلاک 3"
                value={address}
                onChange={e => setAddress(e.target.value)}
            />
            <ComboBox
                label="نوع ملک"
                value={type}
                onChange={setType}
                options={["آپارتمان", "ویلایی", "مغازه", "زمین مسکونی", "زمین کشاورزی", "سایر"]}
            />
        </div>
    );
};

export default StepOneUser;