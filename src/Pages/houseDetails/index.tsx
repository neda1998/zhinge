import ImageMainPage from '../../assets/images/Rectangle 60.svg';
import Header from '../../components/template/Header';
import { useEffect } from 'react';
import { useFormik } from "formik";
import UseByUidAnnounceMutation from '../../hooks/mutation/announce/UseByUidAnnounceMutation';
import { useParams } from "react-router-dom";
import { PuffLoader } from 'react-spinners';
import Cookies from 'js-cookie';
import { useCookies } from 'react-cookie';

const HouseDetails = () => {
    const { mutate, data, isLoading, error } = UseByUidAnnounceMutation();
    const { id: Uid } = useParams<{ id: string }>();

    useEffect(() => {
        if (!Uid) {
            return;
        }
        mutate({ Uid }); 
    }, [mutate, Uid]);

    const selectedProperty = Array.isArray(data) 
        ? data.find((property: any) => property.Uid?.toString() === Uid) 
        : data;

    const formik = useFormik<Record<string, any>>({
        enableReinitialize: true,
        initialValues: {
            usage: selectedProperty?.usage || '',
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

    const mainPhoto =
        Array.isArray(selectedProperty?.photo) && selectedProperty.photo.length > 0
            ? selectedProperty.photo[0]
            : (typeof selectedProperty?.photo === "string" && selectedProperty.photo)
                ? selectedProperty.photo
                : ImageMainPage;

    const fields = [
        { name: 'id', label: 'کد ملک' },
        { name: 'usage', label: 'نوع ملک' },
        { name: 'region', label: 'منطقه' },
        { name: 'address', label: 'آدرس' },
        { name: 'location', label: 'موقعیت مکانی' },
        { name: 'document_type', label: 'نوع سند' },
        { name: 'land_metrage', label: 'متراژ زمین', format: (v: string | number) => v + ' متر' },
        { name: 'useful_metrage', label: 'متراژ مفید', format: (v: string | number) => v + ' متر' },
        { name: 'floor_number', label: 'تعداد طبقات' },
        { name: 'floor', label: 'طبقه' },
        { name: 'Unit_in_floor', label: 'واحد در طبقه' },
        { name: 'room_number', label: 'تعداد اتاق' },
        { name: 'year_of_build', label: 'سال ساخت' },
        { name: 'price', label: 'قیمت', format: (v: string | number) => `${v?.toLocaleString?.() || v} تومان` },
        { name: 'loan', label: 'مبلغ وام' },
        { name: 'features', label: 'امکانات' },
    ];

    const [cookies, setCookies] = useCookies(["role"]);

    const isAdmin = cookies.role === "true" || cookies.role === true;

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
                    <div className="w-full h-fit mobile:h-fit grid md:grid-cols-2 grid-cols-1 gap-8 p-7 md:mt-36 mt-16">
                        <div className="col-span-1 flex flex-col justify-around items-center">
                            <div className="w-full h-fit flex flex-col gap-10">
                                <div className="flex w-full flex-wrap justify-center items-center gap-4 mb-2">
                                    <span className="md:text-[42px] text-[28px] whitespace-nowrap font-extrabold text-transparent bg-clip-text bg-gradient-to-l from-green-400 to-blue-500 drop-shadow-lg">
                                        {selectedProperty?.usage
                                            ? `ملک ${selectedProperty.usage}`
                                            : "جزئیات ملک"}
                                    </span>
                                    {isAdmin && (selectedProperty?.full_name || (selectedProperty?.userID && selectedProperty.userID !== "0")) && (
                                        <span className="flex items-center gap-2 px-4 py-1 rounded-full bg-white border border-blue-200 shadow text-blue-700 text-[18px] mobile:text-[13px] font-bold">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mobile:w-4 mobile:h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm0 12a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2zm12-12a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zm0 12a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                            </svg>
                                            <span>
                                                {selectedProperty?.full_name && (
                                                    <span className="ml-2">{selectedProperty.full_name}</span>
                                                )}
                                                {selectedProperty?.userID && selectedProperty.userID !== "0" && (
                                                    <span className="ltr:ml-2 rtl:mr-2">
                                                        <span className="text-gray-400">|</span>
                                                        <span className="mx-1 text-blue-700">{selectedProperty.userID}</span>
                                                    </span>
                                                )}
                                            </span>
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-col w-full bg-white/90 border border-gray-100 shadow-2xl rounded-3xl p-4">
                                    <div className="w-full flex justify-center h-14 mb-6">
                                        <div className="w-[90%] bg-gradient-to-l from-green-400 to-blue-400 flex items-center justify-center rounded-full text-white font-extrabold text-xl shadow-lg tracking-wide py-2">
                                            جزئیات ملک
                                        </div>
                                    </div>
                                    <div className="w-full h-fit overflow-auto p-2">
                                        <div className="divide-y divide-gray-100">
                                            {fields
                                                .filter(field => field.name !== 'userID' && field.name !== 'full_name')
                                                .map((field) => {
                                                    const value = selectedProperty?.[field.name];
                                                    if (
                                                        (typeof value === "number" && value === 0) ||
                                                        value === "" ||
                                                        value === undefined ||
                                                        value === null
                                                    ) {
                                                        return null;
                                                    }
                                                    return (
                                                        <div
                                                            key={field.name}
                                                            className="flex flex-row items-center justify-between py-4 px-2 hover:bg-gray-50 transition rounded-xl"
                                                        >
                                                            <label className="mb-0 text-gray-500 text-[15px] font-semibold">{field.label}</label>
                                                            <p className="font-extrabold text-gray-800 text-[17px] text-left">
                                                                {field.format
                                                                    ? field.format(value)
                                                                    : value}
                                                            </p>
                                                        </div>
                                                    );
                                                })}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex w-full flex-col gap-5 justify-start bg-white/90 border border-gray-100 shadow-2xl rounded-3xl p-4 md:p-8">
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
                        <div className="col-span-1 flex flex-col items-center justify-start">
                            <img
                                src={
                                    (Array.isArray(selectedProperty?.photo) && selectedProperty.photo.length > 0 && selectedProperty.photo[0])
                                        ? selectedProperty.photo[0]
                                        : (typeof selectedProperty?.photo === "string" && selectedProperty.photo)
                                            ? selectedProperty.photo
                                            : ImageMainPage 
                                }
                                alt="عکس ملک"
                                className="rounded-2xl w-full h-[500px] object-cover border shadow"
                                style={{ minHeight: 350, maxHeight: 600 }}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default HouseDetails;
