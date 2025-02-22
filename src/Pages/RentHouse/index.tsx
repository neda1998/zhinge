import Header from "../../components/template/Header"
import SearchBar from "../../components/ui/molecules/SearchBar";
import search from '../../assets/images/icon input/Magnifer.svg'
import House from '../../assets/images/Rectangle 49.svg'
import MenuDots from '../../assets/images/Menu Dots Square.svg'
import MapPoint from '../../assets/images/Map Point Favourite.svg'
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { createProperty } from "../../services/propertyService";

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

const RentHouse = () => {
    useEffect(() => {
        const sampleRentProperty = {
            loan: 2199,
            usage: "any",
            floor_number: 2,
            type: "rent",
            userID: "09181711690",
            features: "any",
            year_of_build: 1998,
            price: 20000,
            reject: false,
            tour3dRequest: false,
            id: 1,
            floor: 1,
            document_type: "any",
            address: "any",
            useful_metrage: 150,
            Unit_in_floor: 1,
            room_number: 4,
            photo: {},
            check: false,
            Uid: "1731598770627",
            full_name: "any",
            phone: "user ID",
            location: "any",
            region: "any",
            state_code: "",
            tour3dlink: "",
            land_metrage: 200
        };
        // createProperty(sampleRentProperty);
    }, []);

    return (
        <div className="flex flex-col items-center">
            <Header />
            <div className="w-full flex flex-col h-screen mobile:mt-20">
                <div className="w-full flex justify-center mobile:p-0 p-2 ">
                    <SearchBar
                        inputStyles={"rounded-[50px] "}
                        customStyles={"w-[70%] h-[50px] mobile:w-[80%] "}
                        placeholder="جست جو"
                        iconSrc={search}
                        iconAlt="custom search icon"
                    />
                </div>
                <div className="w-full  grid grid-cols-3 mobile:grid-cols-4 mobile:mt-5 mobile:gap-0 gap-4 h-screen place-items-center ">
                    {navItems.map((item, index) => (
                        <>
                            <div className="col-span-1 mobile:col-span-2 flex flex-col justify-start items-center w-[80%] min-h-[400px] mobile:min-h-[280px] max-h-fit">
                                <Link to={`/RentHouse/${item.id}`} className="w-full h-full ">

                                    <img src={House} alt="icons" width={350} />
                                    <div className="w-[89%] flex gap-2 mt-2 mobile:w-full flex-col ">
                                        <div className="w-full ">
                                            <span className="text-[17px] mobile:text-[15px] font-bold">ملک اجاره ای آپارتمانی</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="flex text-[14px] gap-1 ">
                                                <img src={MapPoint} alt="" width={20} />
                                                شهرک بهاران
                                            </span>
                                            <img src={MenuDots} alt="" width={30} />
                                        </div>
                                    </div>
                                </Link >
                            </div>
                        </>
                    ))}
                </div>
            </div >
        </div>
    )
}
export default RentHouse