import Header from '../../components/template/Header';
import Phone from '../../assets/images/Phone Calling Rounded.svg'
import MapPoint from '../../assets/images/Map Point Favourite.svg';
import { useState } from 'react';
import { Field, useFormik } from "formik";
import UseByUidAnnounceMutation from '../../hooks/mutation/announce/UseByUidAnnounceMutation';

const RentHouseId = () => {
    const { mutate, isLoading, error, data } = UseByUidAnnounceMutation();
    const [isBoxVisible, setIsBoxVisible] = useState(false);
    const adType = (data as any)?.type || 'اجاره';

    const formik = useFormik({
        initialValues: {
            type: (data as any)?.type || '',
            id: (data as any)?.id || '',
            region: (data as any)?.region || '',
            useful_metrage: (data as any)?.useful_metrage || '',
            room_number: (data as any)?.room_number || '',
            floor_number: (data as any)?.floor_number || '',
            floor: (data as any)?.floor || '',
            Unit_in_floor: (data as any)?.Unit_in_floor || '',
            year_of_build: (data as any)?.year_of_build || '',
            features: (data as any)?.features || '',
            parking: (data as any)?.parking || 'ندارد',
            storage: (data as any)?.storage || 'ندارد',
            address: (data as any)?.address || '',
            price: (data as any)?.price || '',
            loan: (data as any)?.loan || 'ندارد',
        },
        onSubmit: (values) => {
            mutate({ Uid: values.id });
        }
    });

    // Define fields for dynamic rendering
    const fields = [
        { name: 'type', label: 'نوع آگهی' },
        { name: 'Uid', label: 'کد ملک' },
        { name: 'region', label: 'منطقه' },
        { name: 'useful_metrage', label: 'زیر بنا(مترمربع)', format: (v: string | number) => v + ' متر' },
        { name: 'room_number', label: 'تعداد اتاق' },
        { name: 'floor_number', label: 'طبقه مورد نظر' },
        { name: 'floor', label: 'تعداد طبقات' },
        { name: 'Unit_in_floor', label: 'تعداد واحد در طبقه' },
        { name: 'year_of_build', label: 'سال ساخت' },
        { name: 'features', label: 'آسانسور' },
        { name: 'parking', label: 'پارکینگ' },
        { name: 'storage', label: 'انباری' },
        { name: 'address', label: 'آدرس ملک' },
        { name: 'price', label: 'قیمت ملک', format: (v: string | number) => `${v} تومان` },
        { name: 'loan', label: 'مبلغ وام' }
    ];

    const toggleBox = () => {
        setIsBoxVisible(!isBoxVisible);
    };

    return (
        <>
            {isLoading && <div>Loading...</div>}
            {error && <div>Error occurred</div>}
            {!(isLoading || error) && (
                <div className='flex flex-col items-center'>
            <Header variant={'main'} />
            <div className="w-full h-fit  mobile:h-fit grid grid-cols-2 ">
                <div className="p-7 col-span-1 mobile:relative mobile:bottom-10  mobile:justify-start  mobile:col-span-2 mobile:order-2 mobile:p-0 flex flex-col justify-around">
                    <div className='w-full  h-[90%] mobile:p-2 p-4 mt-24 mobile:mt-0 mobile:h-fit flex flex-col gap-10 mobile:gap-4 items-start'>
                        {/* ...existing header and phone box code... */}
                        <div className='flex flex-col h-32 mobile:mr-2 w-full items-start  justify-around'>
                            <div className='w-full  flex justify-between'>
                                <div className='w-0 h-32 mobile:h-24  border-dashed border-[1px]'></div>
                                <div className={`w-64 ${isBoxVisible ? ` bg-[#09A380]` : ``}   flex  justify-end h-12 rounded-full  relative`}>
                                    <div className={`w-[80%] h-12 transition-all duration-300 flex items-center  ease-in-out overflow-hidden ${isBoxVisible ? ` max-w-xs p-2` : `max-w-0`}  bg-[#09A380] rounded-full`}>
                                        <span className='text-white  ml-2 flex'>فروشنده : 09046364944</span>
                                    </div>
                                    <div onClick={toggleBox} className={`w-12 cursor-pointer h-12 flex justify-center items-center  ${isBoxVisible ? `` : `shadow-md`} bg-white rounded-full`}>
                                        <img src={Phone} alt="" width={40} />
                                    </div>
                                </div>
                            </div>
                            <div className='w-full p-2'>
                                <span className="flex items-center text-[#1E1E1E80] dark:text-white text-[16px] gap-1 ">
                                    <img src={MapPoint} alt="" width={20} className='-mr-4' />
                                    ابتدای شهرک سعدی کوچه کیوان
                                </span>
                            </div>
                        </div>
                        <div className='mt-2  flex w-full  mobile:justify-center'>
                            <span className='text-[40px] mobile:text-[30px]  font-bold'>{adType === 'اجاره' ? 'ملک اجاره‌ای آپارتمانی' : 'ملک فروشی آپارتمانی'}</span>
                        </div>
                        <form onSubmit={formik.handleSubmit} className='flex flex-col w-full bg-white border-[1px] shadow-md rounded-[12px] p-4'>
                                    <div className='w-full flex justify-center h-12'>
                                        <div className='w-[90%] bg-[#09A380] flex items-center justify-center rounded-[100px] text-white'>جزئیات ملک</div>
                                    </div>
                                    <div className='w-full h-fit overflow-auto p-2'>
                                        {fields.map((field, index) => (
                                            <div key={field.name} className='w-full flex flex-col p-2'>
                                                <label className='mb-1'>{field.label}</label>
                                                <Field name={field.name} className='border p-2 rounded'/>
                                            </div>
                                        ))}
                                    </div>
                                    <button type='submit' className='mt-4 w-full bg-[#09A380] text-white p-2 rounded'>ارسال</button>
                                </form>
                        <div className='flex w-full flex-col gap-5 justify-start h-fit bg-white border-[1px] shadow-md rounded-[12px] p-4 '>
                            <div className='w-full flex justify-center h-12'>
                                <div className='w-[90%] bg-[#09A380] flex items-center justify-center rounded-[100px] text-black'>توضیحات بیشتر ملک</div>
                            </div>

                            <div className='w-full flex justify-center '>
                                <span className='text-[16px] leading-'>
                                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            </div>
            )}
        </>
    );
}
export default RentHouseId;