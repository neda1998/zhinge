import React from 'react';
import Header from "../../components/template/Header";
import SearchBar from "../../components/ui/molecules/SearchBar";
import search from '../../assets/images/iconInput/Magnifer.svg';
import House from '../../assets/images/Rectangle49.svg';
import MenuDots from '../../assets/images/MenuDotsSquare.svg';
import MapPoint from '../../assets/images/MapPointFavourite.svg';
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';
import UseGetAllAnnouncementQuery from '../../hooks/queries/getAnnounce/UseAnnounceQuery';

const SellHouse = () => {
    const { data, isLoading, error } = UseGetAllAnnouncementQuery();
    const [cookies, setCookie] = useCookies(['Uid']);

    if (isLoading) return <p>در حال بارگذاری...</p>;
    if (error) return <p>خطا: {(error as any)?.response?.data || error}</p>;

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
                <div className="w-full grid grid-cols-3 mobile:grid-cols-4 mobile:mt-5 mobile:gap-0 gap-4 h-screen place-items-center">
                    {data && data.map((property: any) => (
                        <div key={property.id} className="flex flex-col justify-start items-center">
                            <Link 
                                to={`/house-details/${property.id}`} 
                                onClick={() => setCookie("Uid", property.Uid, { path: "/" })}
                                className="w-full h-full ">
                                <img src={House} alt="icons" width={350} />
                                <div className="w-full flex gap-2 mt-2 mobile:w-full flex-col ">
                                    <div className="w-full ">
                                        <span className="text-[17px] mobile:text-[15px] font-bold">ملک فروش آپارتمانی</span>
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
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SellHouse;