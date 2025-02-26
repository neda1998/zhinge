import ImageMainPage from '../../assets/images/Rectangle 60.svg'
import Image2 from '../../assets/images/Rectangle 43.svg'
import Image3 from '../../assets/images/Rectangle 44.svg'
import Header from '../../components/template/Header';
import ImageGallery from '../../components/ui/molecules/ImageGallery';
import Phone from '../../assets/images/Phone Calling Rounded.svg'
import MapPoint from '../../assets/images/MapPointFavourite.svg';
import { useState, useEffect } from 'react';
import { Field, useFormik, FormikProvider } from "formik";
import UseByUidAnnounceMutation from '../../hooks/mutation/announce/UseByUidAnnounceMutation';
import { useParams } from "react-router-dom"; // added

// Helper to get a cookie by name
const getCookie = (name: string): string | undefined => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
};

// Define proper types for form values
interface FormValues {
    type: string;
    id: string | number;
    region: string;
    useful_metrage: string | number;
    room_number: string | number;
    floor_number: string | number;
    floor: string | number;
    Unit_in_floor: string | number;
    year_of_build: string | number;
    features: string;
    parking: string;
    storage: string;
    address: string;
    price: string | number;
    loan: string;
}

const HouseDetails = () => {
    const { id } = useParams(); // get id from route
    const { mutate, data, isLoading, error } = UseByUidAnnounceMutation();
    const [isBoxVisible, setIsBoxVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            // استفاده از getCookie برای خواندن uid از کوکی
            const uidFromCookie = getCookie("Uid");
            if (!uidFromCookie) {
              console.error("Uid not found in cookie.");
              return;
            }
            mutate({ Uid: uidFromCookie });
        };
        fetchData();
    }, [mutate]);

    // Filter the announcement based on route id
    const selectedProperty = Array.isArray(data) ? data.find((property: any) => property.id.toString() === id) : data;

    // Use selectedProperty for Formik initial values
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            type: (selectedProperty as any)?.type || '',
            id: (selectedProperty as any)?.id || '',
            region: (selectedProperty as any)?.region || '',
            useful_metrage: (selectedProperty as any)?.useful_metrage || '',
            room_number: (selectedProperty as any)?.room_number || '',
            floor_number: (selectedProperty as any)?.floor_number || '',
            floor: (selectedProperty as any)?.floor || '',
            Unit_in_floor: (selectedProperty as any)?.Unit_in_floor || '',
            year_of_build: (selectedProperty as any)?.year_of_build || '',
            features: (selectedProperty as any)?.features || '',
            parking: (selectedProperty as any)?.parking || 'ندارد',
            storage: (selectedProperty as any)?.storage || 'ندارد',
            address: (selectedProperty as any)?.address || '',
            price: (selectedProperty as any)?.price || '',
            loan: (selectedProperty as any)?.loan || 'ندارد',
        },
        onSubmit: (values) => {
            console.log("Submitted values:", values);
        }
    });

    // Define fields for dynamic rendering
    const fields = [
        { name: 'type', label: 'نوع آگهی' },
        { name: 'id', label: 'کد ملک' },
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

    // Instead of early returning, include conditions in the JSX.
    return (
        <div className='flex flex-col items-center'>
            {isLoading && <div>Loading...</div>}
            {error && <div>Error occurred</div>}
            {!isLoading && !error && (
                <>
                    <Header variant={'main'} />
                    <div className="w-full h-fit mobile:h-fit grid grid-cols-2">
                        <div className="p-7 col-span-1 mobile:relative mobile:bottom-10 mobile:justify-start mobile:col-span-2 mobile:order-2 mobile:p-0 flex flex-col justify-around">
                            <div className='w-full h-[90%] mobile:p-2 p-4 mt-24 mobile:mt-0 mobile:h-fit flex flex-col gap-10 mobile:gap-4 items-start'>
                                {/* ...existing header and phone box code... */}
                                <div className='flex flex-col h-32 mobile:mr-2 w-full items-start justify-around'>
                                    <div className='w-full flex justify-between'>
                                        <div className='w-0 h-32 mobile:h-24 border-dashed border-[1px]'></div>
                                        <div className={`w-64 ${isBoxVisible ? 'bg-[#09A380]' : ''} flex justify-end h-12 rounded-full relative`}>
                                            <div className={`w-[80%] h-12 transition-all duration-300 flex items-center ease-in-out overflow-hidden ${isBoxVisible ? 'max-w-xs p-2' : 'max-w-0'} bg-[#09A380] rounded-full`}>
                                                <span className='text-white ml-2 flex'>فروشنده : 09046364944</span>
                                            </div>
                                            <div onClick={toggleBox} className={`w-12 cursor-pointer h-12 flex justify-center items-center ${isBoxVisible ? '' : 'shadow-md'} bg-white rounded-full`}>
                                                <img src={Phone} alt="" width={40} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-full p-2'>
                                        <span className="flex items-center text-[#1E1E1E80] text-[16px] gap-1">
                                            <img src={MapPoint} alt="" width={20} className='-mr-4' />
                                            ابتدای شهرک سعدی کوچه کیوان
                                        </span>
                                    </div>
                                </div>
                                <div className='mt-2 flex w-full mobile:justify-center'>
                                    <span className='text-[40px] mobile:text-[30px] font-bold'>
                                        {(data as any)?.type === 'اجاره' ? 'ملک اجاره‌ای آپارتمانی' : 'ملک فروشی آپارتمانی'}
                                    </span>
                                </div>
                                <FormikProvider value={formik}>
                                    <form onSubmit={formik.handleSubmit} className='flex flex-col w-full bg-white border-[1px] shadow-md rounded-[12px] p-4'>
                                        <div className='w-full flex justify-center h-12'>
                                            <div className='w-[90%] bg-[#09A380] flex items-center justify-center rounded-[100px] text-white'>جزئیات ملک</div>
                                        </div>
                                        <div className='w-full h-fit overflow-auto p-2'>
                                            {fields.map((field) => (
                                                <div key={field.name} className='w-full flex flex-row items-center justify-between'>
                                                    <label className='mb-1'>{field.label}</label>
                                                    <p className=''>
                                                        {(formik.values as any)[field.name]
                                                          ? field.format 
                                                            ? field.format((formik.values as any)[field.name])
                                                            : (formik.values as any)[field.name]
                                                          : "اطلاعات موجود نیست"}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </form>
                                </FormikProvider>
                                <div className='flex w-full flex-col gap-5 justify-start h-fit bg-white border-[1px] shadow-md rounded-[12px] p-4'>
                                    <div className='w-full flex justify-center h-12'>
                                        <div className='w-[90%] bg-[#09A380] flex items-center justify-center rounded-[100px] text-black'>توضیحات بیشتر ملک</div>
                                    </div>
                                    <div className='w-full flex justify-center'>
                                        <span className='text-[16px] leading-'>
                                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ...
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

    function toggleBox() {
        setIsBoxVisible(!isBoxVisible);
    }
};

export default HouseDetails;