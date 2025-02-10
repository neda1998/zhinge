import React, { useState } from 'react';

const OtpInput = ({ numInputs, value, onChange }: any) => {
    const [otp, setOtp] = useState(new Array(numInputs).fill(''));

    const handleChange = (element: any, index: any) => {
        const val = element.value.replace(/[^0-9]/g, '');
        if (val.length > 1) return;

        const newOtp = [...otp];
        newOtp[index] = val;
        setOtp(newOtp);
        onChange(newOtp.join(''));

        // Focus next input
        if (val && index < numInputs - 1) {
            element.nextSibling.focus();
        }
    };

    const handleKeyDown = (e: any, index: any) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            e.target.previousSibling.focus();
        }
    };

    const handlePaste = (event: any) => {
        const paste = event.clipboardData.getData('text').slice(0, numInputs);
        const newOtp = paste.split('');
        if (newOtp.length <= numInputs) {
            setOtp(newOtp);
            onChange(newOtp.join(''));
        }
    };

    return (
        <div dir='ltr' className="w-full flex justify-center gap-10 mobile:gap-2">
            {otp.map((data, index) => (
                <input
                    key={index}
                    type="text"
                    value={data}
                    onPaste={handlePaste}
                    // onChange={(e) => handleChange(e.target, index)}x
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-[75px] h-[75px] mobile:w-[50px] mobile:h-[50px] text-black text-center rounded-[13px] bg-white border-[1px]"
                />
            ))}
        </div>
    );
};

export default OtpInput;
