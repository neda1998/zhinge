import logo_footer from '@/assets/images/logo/logo_3.png'
import Images from '../../ui/atoms/Image'
import instagram from '@/assets/images/Instagram.png'
import whatsapp from '@/assets/images/Whatsapp.png'
import telegram from '@/assets/images/Telegram.png'
import arrow from '@/assets/images/Arrow up.png'
import Logos from '@/assets/images/footerlogos.png'
export default function Footer() {
    return (
        <>
            <div className=' h-[315px]  items-center  relative border-[1px] border-[#DEDEDE]  bg-primary-footer rounded-[43px]'>
                <div className="w-full h-full grid grid-cols-4 ">
                    <div className="col-span-1 flex flex-col w-full justify-evenly items-end  rounded-[43px] ">
                        <div className='w-full text-justify flex flex-col p-5 justify-around h-64 '>
                            <Images src={logo_footer} alt={"icons"} />

                            <p className='font-thin w-72 text-[15px] text-white leading-[28.51px]'>
                                پخش عمده اپتیسان
                                بهترین کیفیت و مناسب ترین قیمت فقط در سنندج اسال سابقه واردات و پخش عینک در سراسر کشور
                            </p>
                            <div className='w-[40%] flex  justify-around'>
                                <Images  width={24} src={instagram} alt={"icon"} />
                                <Images  width={24} src={telegram} alt={"icon"} />
                                <Images  width={24} src={whatsapp} alt={"icon"} />
                            </div>
                        </div>
                        <div className='w-full'>
                            <Images  width={50} src={arrow} alt={"icon"} />
                        </div>
                    </div>
                    <div className="col-span-1 flex flex-col w-full justify-center  items-end  rounded-[43px] ">
                        <div className='h-[78%] flex w-full justify-center items-start'>
                            <div className='w-full text-justify flex flex-col  justify-around '>
                                <div className='w-full flex justify-center'>
                                    <h1 className='text-[24px] font-medium text-white'>راه های ارتباطی</h1>
                                </div>
                                <ul className='text-[#FFFFFF] mt-2  flex flex-col justify-start items-center'>
                                    <li className='p-3 text-[16px] w-40 text-start'>پشتیبانی فروش</li>
                                    <li className='p-3 text-[16px] w-40 text-start'>پشتیبانی فنی</li>
                                    <li className='p-3 text-[16px] w-40 text-start'>پشتیبانی مشتریان</li>
                                    <li className='p-3 text-[16px] w-40 text-start'>خدمات پس از فروش</li>
                                </ul>
                            </div>
                        </div>


                    </div>
                    <div className="col-span-1 flex flex-col w-full justify-center  items-end  rounded-[43px] ">
                        <div className='h-[78%] flex w-full justify-center items-start'>
                            <div className='w-full text-justify flex flex-col  justify-around '>
                                <div className='w-full flex justify-center'>
                                    <h1 className='text-[24px] font-medium text-white'>دیگر صفحات</h1>
                                </div>
                                <ul className='text-[#FFFFFF] mt-2  flex flex-col justify-start items-center'>
                                    <li className='p-3 text-[16px] w-40 text-start'>قوانین و مقررات</li>
                                    <li className='p-3 text-[16px] '>حریم خصوصی کاربران</li>
                                    <li className='p-3 text-[16px] w-40 text-start'>مجوز ها و افتخارات</li>
                                    <li className='p-3 text-[16px] w-40 text-start'>پنل کاربری</li>
                                </ul>
                            </div>
                        </div>


                    </div>
                    <div className="col-span-1 flex flex-col w-full justify-start items-start  rounded-[43px] ">
                        <div className='w-full text-justify flex flex-col p-5 justify-start h-64 '>
                            <div className='w-full '>
                                <Images src={Logos} alt={"icons"} />

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}