import React, { useState } from 'react';
import Header from '../template/Header';
import InputState from '../ui/atoms/input/inputState';
import useCreateRequestMutation from '../../hooks/mutation/request/useCreateRequestMutation';
import Swal from 'sweetalert2';

const RequestStateHeader = () => {
  const { mutate } = useCreateRequestMutation();

  const [full_name, set_full_name] = useState('');
  const [phone, set_phone] = useState('');
  const [region, set_region] = useState('');
  const [type, set_type] = useState('');
  const [hieghest_price, set_hieghest_price] = useState<number | undefined>(undefined);
  const [lowest_price, set_lowest_price] = useState<number | undefined>(undefined);
  const [location, set_location] = useState('');
  const [message, set_message] = useState('');

  // Check if required fields are filled
  const isFormValid =
    full_name.trim() &&
    phone.trim() &&
    region.trim() &&
    type.trim() &&
    location.trim();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !full_name.trim() ||
      !phone.trim() ||
      !region.trim() ||
      !type.trim() ||
      !location.trim()
    ) {
      Swal.fire({
        icon: 'warning',
        title: 'خطا',
        text: 'لطفا همه فیلدهای ضروری را پر کنید.',
        confirmButtonText: 'باشه'
      });
      return;
    }

    const requestData: any = {};

    if (full_name.trim()) requestData.full_name = full_name.trim();
    if (phone.trim()) requestData.phone = phone.trim();
    if (region.trim()) requestData.region = region.trim();
    if (type.trim()) requestData.type = type.trim();
    if (typeof lowest_price === "number" && !isNaN(lowest_price)) requestData.lowest_price = lowest_price;
    if (typeof hieghest_price === "number" && !isNaN(hieghest_price)) requestData.hieghest_price = hieghest_price;
    if (location.trim()) requestData.location = location.trim();
    if (message.trim()) requestData.message = message.trim();
    mutate(requestData, {
      onSuccess: () => {
        set_full_name('');
        set_phone('');
        set_region('');
        set_type('');
        set_hieghest_price(undefined);
        set_lowest_price(undefined);
        set_location('');
        set_message('');
      }
    });
  };

  return (
    <div>
      <Header />
      <div className="pt-24 pb-10 px-6">
      <div className="w-full flex flex-col items-center justify-center mb-12">
          <div className="flex flex-col items-center gap-4 mobile:gap-2">
            <h1 className="text-[1.5rem] mobile:text-[18px]">مشخصات ملک</h1>
            <span className="h-[2px] w-[70%] bg-[#09A380]"></span>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-4 grid-cols-1 lg:gap-x-5 lg:gap-y-10 gap-y-4 w-full">
            <InputState label="نام مالک" value={full_name} onChange={(e) => set_full_name(e.target.value)} />
            <InputState label="شماره همراه" value={phone} onChange={(e) => set_phone(e.target.value)} />
            <InputState label="نوع درخواست" value={type} onChange={(e) => set_type(e.target.value)} />
            <InputState label="موقعیت مکانی" value={location} onChange={(e) => set_location(e.target.value)} />
            <InputState label="حداکثر قیمت (اختیاری)" value={hieghest_price?.toString() || ''} onChange={(e) => set_hieghest_price(Number(e.target.value))} />
            <InputState label="حداقل قیمت (اختیاری)" value={lowest_price?.toString() || ''} onChange={(e) => set_lowest_price(Number(e.target.value))} />
            <InputState label="منطقه" value={region} onChange={(e) => set_region(e.target.value)} />
            <InputState label="پیام (اختیاری)" value={message} onChange={(e) => set_message(e.target.value)} />
          </div>
          <div className="flex w-full">
          <button
            className="bg-main-color text-white px-8 py-2 rounded-full transition ml-0 mr-auto mt-8"
            type="submit"
          >
            ثبت
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestStateHeader;
