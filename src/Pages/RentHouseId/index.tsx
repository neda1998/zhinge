import ImageMainPage from '../../assets/images/Rectangle 60.svg'
import Image2 from '../../assets/images/Rectangle 43.svg'
import Image3 from '../../assets/images/Rectangle 44.svg'
import Header from '../../components/template/Header';
import ImageGallery from '../../components/ui/molecules/ImageGallery';
import Phone from '../../assets/images/Phone Calling Rounded.svg'
import MapPoint from '../../assets/images/Map Point Favourite.svg'
import { useState } from 'react';
const Datas = [
    { id: 1, name: "نوع آگهی", description: "فروش" },
    { id: 1, name: "کد ملک", description: "43287" },
    { id: 1, name: "منطقه", description: "شهرک سعدی" },
    { id: 1, name: "زیر بنا(مترمربع)", description: "120 متر" },
    { id: 1, name: "تعداد اتاق ", description: "3" },
    { id: 1, name: "طبقه مورد نظر", description: "2" },
    { id: 1, name: "تعداد طبقات", description: "5" },
    { id: 1, name: "تعداد واحد در طبقه", description: "2" },
    { id: 1, name: "سال ساخت", description: "1400" },
    { id: 1, name: "آسانسور", description: "دارد" },
    { id: 1, name: "پارکینگ", description: "ندارد" },
    { id: 1, name: "انباری", description: "ندارد" },
    { id: 1, name: "آدرس ملک ", description: "ابتدای شهرک سعدی کوچه کیوان" },
    { id: 1, name: "قیمت ملک ", description: "3,850,000,000 تومان" },
    { id: 1, name: "مبلغ وام", description: "ندارد" },
]
const SellHouseId = () => {
    const [isBoxVisible, setIsBoxVisible] = useState(false);
    const toggleBox = () => {
        setIsBoxVisible(!isBoxVisible);
    };
    return (
        <div className='flex flex-col items-center'>
            <Header variant={'main'} />
            <div className="w-full h-fit  mobile:h-fit grid grid-cols-2 ">
                <div className="p-7 col-span-1 mobile:relative mobile:bottom-10  mobile:justify-start  mobile:col-span-2 mobile:order-2 mobile:p-0 flex flex-col justify-around">
                    <div className='w-full  h-[90%] mobile:p-2 p-4 mt-24 mobile:mt-0 mobile:h-fit flex flex-col gap-10 mobile:gap-4 items-start'>
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
                                <span className="flex items-center text-[#1E1E1E80] text-[16px] gap-1 ">
                                    <img src={MapPoint} alt="" width={20} className='-mr-4' />
                                    ابتدای شهرک سعدی کوچه کیوان
                                </span>
                            </div>
                        </div>
                        <div className='mt-2  flex w-full  mobile:justify-center'>
                            <span className='text-[40px] mobile:text-[30px]  font-bold'>ملک فروشی آپارتمانی</span>
                        </div>
                        <div className='flex w-full flex-col justify-start h-[855px] mobile:h-full bg-white border-[1px] shadow-md rounded-[12px] p-4 '>
                            <div className='w-full flex  justify-center h-12'>
                                <div className='w-[90%] bg-[#09A380] flex items-center justify-center rounded-[100px] text-white'>جزئیات ملک</div>
                            </div>
                            <div className='w-full h-fit overflow-auto   p-2'>
                                {Datas.map((item, index) => (
                                    <>
                                        <div className='w-full flex  justify-between items-center p-3'>
                                            <span className=''>
                                                {item.name}</span>
                                            <span className={`w-[65%]  ${index === 12 ? "min-w-[45%] max-w-[35%]" : index === 13 ? "w-[35%]" : ''}  border-[1px] h-0 border-[#1E1E1E33] border-dashed`}></span>
                                            <span className='mr-1 text-nowrap'>{item.description}</span>
                                        </div >
                                    </>
                                ))}
                            </div>

                        </div>
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
                <div className="col-span-1 mobile:col-span-2">
                    <ImageGallery ImageMainPage={ImageMainPage} Image2={Image2} Image3={Image3} />
                </div>
            </div >
        </div>
    )
}

export default SellHouseId;