import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import House from "../../src/assets/images/Rectangle49.svg";
import MenuDots from "../../src/assets/images/MenuDotsSquare.svg";
import MapPoint from "../../src/assets/images/MapPointFavourite.svg";
import SearchBar from "./ui/molecules/SearchBar";
import Header from "./template/Header";
import search from "../assets/images/Magnifer.svg";
import { PuffLoader } from "react-spinners";

interface AnnouncementListProps {
  data: any[];
  isLoading: boolean;
  error: any;
  announcementType: "rent" | "sell";
  onAnnouncementClick?: (property: any) => void;
}

const AnnouncementList: React.FC<AnnouncementListProps> = ({ data, isLoading, announcementType, onAnnouncementClick }) => {
  const titleLabel = announcementType === "rent" ? "ملک اجاره ای آپارتمانی" : "ملک فروش آپارتمانی";

  // const filteredData = useMemo(() => {
  //   if (!data) return []; // اگر data هنوز نیامده، مقدار [] بده
  
  //   return data.filter((property) =>
  //     announcementType === "rent" ? property.type === "اجاره" : property.type === "فروش"
  //   );
  // }, [data, announcementType]);  

  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="w-full flex flex-col h-screen mobile:mt-20">
        <div className="w-full flex justify-center mobile:p-0 p-2">
          <SearchBar
            inputStyles="rounded-[50px]"
            customStyles="w-[70%] h-[50px] mobile:w-[80%]"
            placeholder="جست جو"
            iconSrc={search}
            iconAlt="custom search icon"
          />
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center min-h-screen">
            <PuffLoader color="#09A380" />
          </div>
        ) : data.length === 0 ? (
          <div className="flex justify-center items-center h-screen">
            <span className="text-[18px] font-bold">آگهی برای نمایش وجود ندارد</span>
          </div>
        ) : (
          <div className="w-full grid lg:grid-cols-4 sm:grid-cols-2 mobile:mt-5 mobile:gap-0 gap-4 place-items-center grid-cols-1">
            {data.map((property) => (
              <div key={property.id} className="flex flex-col justify-start items-center">
                <img src={House} alt="icons" width={350} />
                <div className="w-full flex gap-2 mt-2 mobile:w-full flex-col">
                  <div className="w-full">
                    <span className="text-[17px] mobile:text-[15px] font-bold">{titleLabel}</span>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <span className="flex text-[14px] gap-1">
                      <img src={MapPoint} alt="" width={20} />
                      شهرک بهاران
                    </span>
                    <Link to={`/house-details/${property.id}`} onClick={() => onAnnouncementClick?.(property)}>
                      <img src={MenuDots} alt="" width={30} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnouncementList;
