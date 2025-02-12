import ImageMainPage from '../../assets/images/Rectangle 38.svg'
import ZhingeLogo from '../../assets/images/Zhinge.svg'
import Button from '../../components/ui/atoms/Button';
import MagniFair from '../../assets/images/Magnifer.svg'
import HomeIcons from '../../assets/images/Home Add Angle.svg'
import Image1 from '../../assets/images/Rectangle 42.svg'
import Image2 from '../../assets/images/Rectangle 43.svg'
import Image3 from '../../assets/images/Rectangle 44.svg'
import Header from '../../components/template/Header';
import MapPoint from '../../assets/images/Map Point FavouriteWhite.svg'
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
    const navigate = useNavigate()
    return (
        <div className='w-full flex justify-center'>
            <Header variant={'main'} />
            <div className="w-full h-[110vh] tablet:h-fit mobile:h-fit grid grid-cols-2  ">
                <div className=" col-span-1 mobile:col-span-2 tablet:col-span-2 tablet:order-2 mobile:order-2 mobile:p-0 p-7 flex flex-col justify-start dark:bg-dark">
                    <div className='w-full  p-4 mt-24 flex flex-col items-start mobile:mt-0'>
                        <div className='flex flex-col items-start justify-start mobile:items-center'>
                            <span className='text-[60px] font-bold flex justify-start items-center dark:text-white'>
                                با
                                <img src={ZhingeLogo} alt="icons" width={150} />
                            </span>
                            <span className='text-[60px] font-bold text-center dark:text-white'>راحت خونه پیدا کن</span>
                        </div>
                        <div className='flex items-center mt-5 justify-start mobile:h-fit mobile:justify-center'>
                            <span className='text-[22px] lorem-dark w-full  mobile:leading-8 mobile:text-[20px] mobile:text-center leading-[45px] dark:text-white'>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است.لورم ایپسوم متن ساختگی با تولید سادگی</span>
                        </div>

                        <div className='w-full flex gap-4 mt-4 p-3 '>
                            <Button bgcolor={"#09A380"} width={'180px'} height={'50px'} borderradius={'96px'} color='white' returnbtn={"true"} className={'flex items-center justify-center'}>
                                <img src={MagniFair} alt="logo" className="mobile:w-[20px]" />
                                <span className="text-[15px] mobile:text-[13px] mobile:p-1 font-bold dark:text-white ">
                                    جست و جوی ملک
                                </span>
                            </Button>

                            <Button onClick={() => navigate('/realState')} borderradius={'96px'} width={'180px'} variant='outlined' height={'50px'} submit={"true"} className={'flex w-[180px] items-center border-[1px] border-[#09A380] justify-center text-[#09A380] bg-white dark:bg-black'}>
                                <img src={HomeIcons} alt="logo" />
                                <p className="text-[15px] mobile:text-[13px] mobile:p-1 font-bold dark:text-white ">
                                    ایجاد آگهی جدید
                                </p>
                            </Button>
                        </div>
                    </div>
                    <div className='w-[70%] -bottom-5 mobile:hidden mobile:w-full mobile:right-0 tablet:relative tablet:w-full tablet:justify-center  mobile:justify-center tablet:right-0 mobile:flex-col flex justify-end last-of-type:-bottom-16 mobile:last-of-type:bottom-24 right-32 items-end h-fit  absolute '>
                        <div className='w-[25%] mobile:hidden h-0 mb-[12px] border-[2px]  border-dashed border-[#1E1E1E66]'>
                            <span className='lorem-dark text-[18px] relative bottom-16 flex flex-col'>معامله های اخیر
                                <span className='text-[18px] font-bold dark:text-white'>ژینگه</span>
                            </span>
                        </div>
                        <div className='w-full flex'>
                            <div>
                                <img src={Image1} alt="" className='w-[240px] mobile:w-[130px]' />
                                <span className='text-white absolute text-[14px] bottom-12 mr-4 mobile:bottom-8 flex gap-2 mobile:gap-1 '>
                                    <img src={MapPoint} alt="" width={20} />
                                    شهرک سعدی
                                </span>
                                <span className='text-white absolute text-[17px] mobile:text-[12px]   font-bold mr-4 bottom-4 mobile:bottom-[8px]  flex '>
                                    ملک  آپارتمانی
                                </span>
                            </div>
                            <div>
                                <img src={Image2} alt="" className='w-[240px] mobile:w-[130px]' />
                                <span className='text-white absolute text-[14px] bottom-12 mr-4 mobile:bottom-8  flex gap-2 mobile:gap-1 '>
                                    <img src={MapPoint} alt="" width={20} />
                                    شهرک سعدی
                                </span>
                                <span className='text-white absolute text-[17px] mobile:text-[12px]   font-bold mr-4 bottom-4 mobile:bottom-[8px]  flex '>
                                    ملک  آپارتمانی
                                </span>
                            </div>
                            <div>
                                <img src={Image3} alt="" className='w-[240px] mobile:w-[130px]' />
                                <span className='text-white absolute text-[14px] bottom-12 mr-4 mobile:bottom-8  flex gap-2 mobile:gap-1 '>
                                    <img src={MapPoint} alt="" width={20} />
                                    شهرک سعدی
                                </span>
                                <span className='text-white absolute text-[17px] mobile:text-[12px] font-bold mr-4 bottom-4 mobile:bottom-[8px]  flex '>
                                    ملک  آپارتمانی
                                </span>
                            </div>
                            <div className='w-0 h-28 hidden mobile:flex border-dashed absolute top-32 mr-3 -z-10 border-[1px]'>

                            </div>
                            <span className='text-[#1E1E1E66] hidden mobile:flex absolute top-48 mr-6 text-[18px]   flex-col'>معامله های اخیر
                                <span className='text-black text-[18px] font-bold'>ژینگه</span>
                            </span>
                        </div>
                    </div>


                </div>
                <div className="col-span-1 mobile:col-span-2 tablet:col-span-2 tablet:hidden ">
                    <img src={ImageMainPage} className='object-contain' alt="" />
                    <div className='w-[70%] -bottom-5 -mt-20 mobile:flex hidden mobile:w-full  mobile:right-0 tablet:relative tablet:w-full tablet:justify-center  mobile:justify-center tablet:right-0 mobile:flex-col  justify-end last-of-type:-bottom-16  items-end h-fit   '>
                        <div className='w-[25%] mobile:hidden h-0 mb-[12px] border-[2px]  border-dashed border-[#1E1E1E66]'>
                            <span className='lorem-dark text-[18px] relative bottom-16 flex flex-col'>معامله های اخیر
                                <span className='text-black text-[18px] font-bold'>ژینگه</span>
                            </span>
                        </div>
                        <div className='w-full flex'>
                            <div>
                                <img src={Image1} alt="" className='w-[240px] mobile:w-[160px]' />
                                <span className='text-white  text-[14px] -mt-16  mr-4 mobile:bottom-8  flex gap-2 mobile:gap-1 '>
                                    <img src={MapPoint} alt="" width={20} />
                                    شهرک سعدی
                                </span>
                                <span className='text-white  text-[17px] mobile:text-[12px]  mt-2 font-bold mr-4 bottom-4 mobile:bottom-[8px]  flex '>
                                    ملک  آپارتمانی
                                </span>
                            </div>
                            <div >
                                <img src={Image2} alt="" className='w-[240px] mobile:w-[160px]' />
                                <span className='text-white  text-[14px] -mt-16  mr-4 mobile:bottom-8  flex gap-2 mobile:gap-1 '>
                                    <img src={MapPoint} alt="" width={20} />
                                    شهرک سعدی
                                </span>
                                <span className='text-white  text-[17px] mobile:text-[12px]  mt-2 font-bold mr-4 bottom-4 mobile:bottom-[8px]  flex '>
                                    ملک  آپارتمانی
                                </span>
                            </div>
                            <div>
                                <img src={Image3} alt="" className='w-[240px] mobile:w-[160px]' />
                                <span className='text-white  text-[14px] -mt-16  mr-4 mobile:bottom-8  flex gap-2 mobile:gap-1 '>
                                    <img src={MapPoint} alt="" width={20} />
                                    شهرک سعدی
                                </span>
                                <span className='text-white  text-[17px] mobile:text-[12px]  mt-2 font-bold mr-4 bottom-4 mobile:bottom-[8px]  flex '>
                                    ملک  آپارتمانی
                                </span>
                            </div>


                        </div>
                        <div className='w-full'>
                            <div className='w-0 h-28 hidden mobile:flex border-dashed  top-32 mr-3 -z-10 border-[1px]'>
                            </div>
                            <span className='text-[#1E1E1E66] hidden mobile:flex  -mt-10 mr-6 text-[18px]   flex-col'>معامله های اخیر
                                <span className='text-black text-[18px] font-bold'>ژینگه</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPage;