import { Link } from "react-router-dom";
import House from '../../../assets/images/Rectangle 49.svg'
import MenuDots from '../../../assets/images/Menu Dots Square.svg'
import MapPoint from '../../../assets/images/Map Point Favourite.svg'
import LayoutProfile from "../../../components/profile/LayoutProfile";
const navItems = [
    { id: 1, text: 'صفحه اصلی', url: '/' },
    { id: 91, text: 'آگهی فروش', url: '/SellHouse' },
    { id: 12, text: 'آگهی اجاره', url: '/blogs' },
    { id: 1344, text: 'خدمات', url: '/faq' },
    { id: 1, text: 'بازدید', url: '/ContactUssd' },
    { id: 51, text: 'بازدید', url: '/ContactUssd' },
    { id: 14, text: 'بازدید', url: '/ContactUssd' },
    { id: 1, text: 'بازدید', url: '/ContactUssd' },
    { id: 71, text: 'بازدید', url: '/ContactUssd' },
    { id: 12, text: 'درخواست ملک', url: '/ContactUs' }
];

const MyAds = () => {
    return (
        <LayoutProfile>
            <div className="w-full mt-4 mobile:mt-28 grid grid-cols-3 gap-4 h-fit  place-items-center ">
                {navItems.map((item, index) => (
                    <>
                        <div key={index} className="col-span-1 mobile:col-span-3 flex flex-col justify-start items-center w-[80%] min-h-[400px] max-h-fit">
                            <Link to={`/RentHouse/${item.id}`} className="w-full h-full ">
                                <img src={House} alt="icons" width={350} />
                                <div className="w-[89%] flex gap-2 mt-2  flex-col ">
                                    <div className="w-full ">
                                        <span className="text-[17px] font-bold">ملک اجاره ای آپارتمانی</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="flex text-[14px] gap-1 ">
                                            <img src={MapPoint} alt="" width={20} />
                                            شهرک بهاران
                                        </span>
                                        <img src={MenuDots} alt="" width={30} />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </>
                ))}
            </div>
        </LayoutProfile>
    )
}
export default MyAds