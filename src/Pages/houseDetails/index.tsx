import ImageMainPage from '../../assets/images/Rectangle 60.svg';
import Image2 from '../../assets/images/Rectangle 43.svg';
import Image3 from '../../assets/images/Rectangle 44.svg';
import Header from '../../components/template/Header';
import ImageGallery from '../../components/ui/molecules/ImageGallery';
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

    const selectedProperty = Array.isArray(data) 
        ? data.find((property: any) => property.id.toString() === Uid) 
        : data;

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
                    <div className="w-full h-fit mobile:h-fit grid grid-cols-2 p-7">
                        <div className="col-span-1 mobile:col-span-2 flex flex-col justify-around mb-10">
                            <div className="w-full h-fit flex flex-col gap-10 sm:p-4">
                                <div className="mt-20 flex w-full justify-center">
                                    <span className="text-[42px] mobile:text-[28px] font-extrabold text-transparent bg-clip-text bg-gradient-to-l from-green-400 to-blue-500 drop-shadow-lg">
                                        {selectedProperty?.type === 'اجاره' ? 'ملک اجاره‌ای آپارتمانی' : 'ملک فروشی آپارتمانی'}
                                    </span>
                                </div>
                                <div className="flex flex-col w-full bg-white/90 border border-gray-100 shadow-2xl rounded-3xl p-8">
                                    <div className="w-full flex justify-center h-14 mb-6">
                                        <div className="w-[90%] bg-gradient-to-l from-green-400 to-blue-400 flex items-center justify-center rounded-full text-white font-extrabold text-xl shadow-lg tracking-wide py-2">
                                            جزئیات ملک
                                        </div>
                                    </div>
                                    <div className="w-full h-fit overflow-auto p-2">
                                        <div className="divide-y divide-gray-100">
                                            {fields.map((field) => (
                                                <div
                                                    key={field.name}
                                                    className="flex flex-row items-center justify-between py-4 px-2 hover:bg-gray-50 transition rounded-xl"
                                                >
                                                    <label className="mb-0 text-gray-500 text-[15px] font-semibold">{field.label}</label>
                                                    <p className="font-extrabold text-gray-800 text-[17px] text-left">
                                                        {formik.values[field.name]
                                                            ? field.format?.(formik.values[field.name]) ?? formik.values[field.name]
                                                            : <span className="text-gray-400 font-normal">اطلاعات موجود نیست</span>
                                                        }
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex w-full flex-col gap-5 justify-start bg-white/90 border border-gray-100 shadow-2xl rounded-3xl p-8">
                                    <div className="w-full flex justify-center h-14 mb-2">
                                        <div className="w-[90%] bg-gradient-to-l from-green-400 to-blue-400 flex items-center justify-center rounded-full text-white font-extrabold text-xl shadow-lg tracking-wide py-2">
                                            توضیحات بیشتر ملک
                                        </div>
                                    </div>
                                    <div className="w-full flex justify-center">
                                        <span className="text-[16px] text-gray-700 font-medium leading-relaxed text-justify">
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
