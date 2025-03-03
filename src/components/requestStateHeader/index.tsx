import React, { useState } from 'react';
import ComboBox from '../common/Combo';
import TitleCommon from '../stepperState/TitleCommon';
import Header from '../template/Header';
import InputState from '../ui/atoms/input/inputState';
import useCreateRequestMutation from '../../hooks/mutation/request/useCreateRequestMutation';

const RequestStateHeader = () => {
  const { mutate } = useCreateRequestMutation();
  
  // Required fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [region, setRegion] = useState('');  
  const [requestType, setRequestType] = useState(''); 
  const [highestPrice, setHighestPrice] = useState<number | undefined>(undefined);
  const [location, setLocation] = useState('');
  
  // Optional fields
  const [lowestPrice, setLowestPrice] = useState<number | undefined>(undefined);
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const requestData = {
      full_name: fullName,
      phone,
      region,
      type: requestType,
      lowest_price: lowestPrice || 0, // send default value if not provided
      highest_price: highestPrice,
      location,
      message,
    };
    mutate(requestData);
  };

  return (
    <div>
      <Header />
      <div className="m-16">
        <div className="w-full flex flex-col items-center justify-center mb-12">
          <div className="flex flex-col items-center gap-4 mobile:gap-2">
            <h1 className="text-[1.5rem] mobile:text-[18px]">مشخصات ملک</h1>
            <span className="h-[2px] w-[70%] bg-[#09A380]"></span>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-4 grid-cols-1 lg:gap-x-5 lg:gap-y-10 gap-y-4 w-full">
            <TitleCommon text="مشخصات ملک" />
            <InputState 
              label="نام مالک" 
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
            />
            <InputState 
              label="شماره همراه" 
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
            <ComboBox 
              label="نوع درخواست"
              options={["commercial", "residential"]}
              onChange={(val) => setRequestType(val)}
              value={requestType}
            />
            <InputState 
              label="آدرس تور مجازی (url)" 
              onChange={(e) => setLocation(e.target.value)}
              value={location}
            />
            <InputState 
              label="قیمت فروش" 
              onChange={(e) => setHighestPrice(Number(e.target.value))}
              value={highestPrice?.toString() || ''}
            />
            <InputState 
              label="حداقل قیمت (اختیاری)" 
              onChange={(e) => setLowestPrice(Number(e.target.value))}
              value={lowestPrice?.toString() || ''}
            />
            <ComboBox 
              label="منطقه" 
              options={["abidare", "other"]}
              onChange={(val) => setRegion(val)}
              value={region}
            />
            <InputState 
              label="پیام (اختیاری)" 
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
          </div>
          <button className="bg-main-color text-white px-8 py-2 rounded-full transition ml-0 mr-auto" type="submit">
            ثبت
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestStateHeader;