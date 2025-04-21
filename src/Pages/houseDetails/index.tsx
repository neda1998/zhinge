import ImageMainPage from '../../assets/images/Rectangle 60.svg';
import Image2 from '../../assets/images/Rectangle 43.svg';
import Image3 from '../../assets/images/Rectangle 44.svg';
import Header from '../../components/template/Header';
import ImageGallery from '../../components/ui/molecules/ImageGallery';
import Phone from '../../assets/images/Phone Calling Rounded.svg';
import MapPoint from '../../assets/images/MapPointFavourite.svg';
import { useState, useEffect } from 'react';
import { useFormik } from "formik";
import UseByUidAnnounceMutation from '../../hooks/mutation/announce/UseByUidAnnounceMutation';
import { useLocation } from "react-router-dom";
import { PuffLoader } from 'react-spinners';

const HouseDetails = () => {
    const { mutate, data, isLoading, error } = UseByUidAnnounceMutation();
    const [isBoxVisible, setIsBoxVisible] = useState(false);
    const location = useLocation();
    const Uid = location.pathname.split('/').pop();

    useEffect(() => {
        if (!Uid) {
            return;
        }
        mutate({ Uid }); 
    }, [mutate, Uid]);

    // یافتن ملک موردنظر از API
    const selectedProperty = Array.isArray(data) 
        ? data.find((property: any) => property.id.toString() === Uid) 
        : data;

    // مقداردهی اولیه `Formik`
    const formik = useFormik<Record<string, any>>({
        enableReinitialize: true,
        initialValues: {
            type: selectedProperty?.type || '',
            id: selectedProperty?.id || '',
            region: selectedProperty?.region || '',
            useful_metrage: selectedProperty?.useful_metrage || '',
            room_number: selectedProperty?.room_number || '',
            floor_number: selectedProperty?.floor_number || '',
            floor: selectedProperty?.floor || '',
            Unit_in_floor: selectedProperty?.Unit_in_floor || '',
            year_of_build: selectedProperty?.year_of_build || '',
            features: selectedProperty?.features || '',
            parking: selectedProperty?.parking || 'ندارد',
            storage: selectedProperty?.storage || 'ندارد',
            address: selectedProperty?.address || '',
            price: selectedProperty?.price || '',
            loan: selectedProperty?.loan || 'ندارد',
        },
        onSubmit: (values) => {
            console.log("Submitted values:", values);
        }
    });

    console.log("Formik initialValues:", formik.values);

    // فیلدهای موردنیاز برای نمایش اطلاعات ملک
    const fields = [
        { name: 'type', label: 'نوع آگهی' },
        { name: 'id', label: 'کد ملک' },
        { name: 'region', label: 'منطقه' },
        { name: 'useful_metrage', label: 'زیر بنا (مترمربع)', format: (v: string | number) => v + ' متر' },
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
        <div className='flex flex-col items-center'>
            {isLoading && (
                <div className="flex justify-center items-center min-h-screen">
                    <PuffLoader color="#09A380" />
                </div>
            )}
            {error && <div>خطا در بارگذاری اطلاعات</div>}
            {!isLoading && !error && (
                <>
                    <Header variant={'main'} />
                    <div className="w-full h-fit mobile:h-fit grid grid-cols-2">
                        <div className="p-7 col-span-1 mobile:col-span-2 flex flex-col justify-around">
                            <div className='w-full h-fit flex flex-col gap-10 p-4'>
                                <div className='flex flex-col h-32 items-start justify-around'>
                                    <div className='flex justify-end w-full'>
                                        <div className={`${isBoxVisible ? 'bg-[#09A380]' : ''} flex justify-start h-12 rounded-full relative`}>
                                            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isBoxVisible ? 'max-w-xs p-2' : 'max-w-0'} bg-[#09A380] rounded-full`}>
                                                <span className='text-white ml-2 flex'>فروشنده : 09046364944</span>
                                            </div>
                                            <div onClick={toggleBox} className="w-12 cursor-pointer h-12 flex justify-center items-center bg-white rounded-full shadow-md">
                                                <img src={Phone} alt="" width={40} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-full p-2'>
                                        <span className="flex items-center text-[#1E1E1E80] dark:text-white text-[16px] gap-1">
                                            <img src={MapPoint} alt="" width={20} className='-mr-4' />
                                            {selectedProperty?.address || "آدرس نامشخص"}
                                        </span>
                                    </div>
                                </div>
                                <div className='mt-2 flex w-full justify-center'>
                                    <span className='text-[40px] mobile:text-[30px] font-bold'>
                                        {selectedProperty?.type === 'اجاره' ? 'ملک اجاره‌ای آپارتمانی' : 'ملک فروشی آپارتمانی'}
                                    </span>
                                </div>
                                <div className='flex flex-col w-full bg-white border-[1px] shadow-md rounded-[12px] p-4'>
                                    <div className='w-full flex justify-center h-12'>
                                        <div className='w-[90%] bg-[#09A380] flex items-center justify-center rounded-[100px] text-white'>
                                            جزئیات ملک
                                        </div>
                                    </div>
                                    <div className='w-full h-fit overflow-auto p-2'>
                                        {fields.map((field) => (
                                            <div key={field.name} className='w-full flex flex-row items-center justify-between'>
                                                <label className='mb-1'>{field.label}</label>
                                                <p>
                                                    {formik.values[field.name] 
                                                        ? field.format?.(formik.values[field.name]) ?? formik.values[field.name]
                                                        : "اطلاعات موجود نیست"}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className='flex w-full flex-col gap-5 justify-start bg-white border-[1px] shadow-md rounded-[12px] p-4'>
                                    <div className='w-full flex justify-center h-12'>
                                        <div className='w-[90%] bg-[#09A380] flex items-center justify-center rounded-[100px] text-black'>
                                            توضیحات بیشتر ملک
                                        </div>
                                    </div>
                                    <div className='w-full flex justify-center'>
                                        <span className='text-[16px]'>
                                            {selectedProperty?.description || "توضیحات موجود نیست"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1 mobile:col-span-2">
                            <ImageGallery ImageMainPage={ImageMainPage} Image2={Image2} Image3={Image3} />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default HouseDetails;
