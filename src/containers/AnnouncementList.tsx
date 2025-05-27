import React, { useState } from "react";
import { Link } from "react-router-dom";
import House from "../../src/assets/images/Rectangle49.svg";
import MenuDots from "../../src/assets/images/MenuDotsSquare.svg";
import MapPoint from "../../src/assets/images/MapPointFavourite.svg";
import Header from "../components/template/Header";
import search from "../assets/images/Magnifer.svg";
import { PuffLoader } from "react-spinners";
import SearchBar from "../components/ui/molecules/SearchBar";

interface AnnouncementListProps {
  data: any[];
  isLoading: boolean;
  error: any;
  announcementType?: "rent" | "sell"; 
  onAnnouncementClick?: (property: any) => void;
}

const AnnouncementList: React.FC<AnnouncementListProps> = ({
  data,
  isLoading,
  announcementType,
  onAnnouncementClick,
}) => {
  const [searchResults, setSearchResults] = useState<any[] | null>(null);
  console.log("searchResults", searchResults);
  

  let titleLabel = "آگهی آپارتمانی";
  if (announcementType === "rent") titleLabel = "ملک اجاره ای آپارتمانی";
  else if (announcementType === "sell") titleLabel = "ملک فروش آپارتمانی";
  else titleLabel = "همه آگهی‌های آپارتمانی";

  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="w-full flex flex-col h-screen mobile:mt-20">
        <div className="w-full flex justify-center">
          <SearchBar
            inputStyles="rounded-[50px]"
            customStyles="w-[70%] h-[50px] mobile:w-[80%]"
            placeholder="جست جو"
            iconSrc={search}
            iconAlt="custom search icon"
            onSearchResults={setSearchResults}
          />
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center min-h-screen">
            <PuffLoader color="#09A380" />
          </div>
        ) : searchResults !== null ? (
          searchResults.length > 0 ? (
            <div className="w-full grid lg:grid-cols-4 sm:grid-cols-2 gap-4 place-items-center grid-cols-1 px-4 pb-16">
              {searchResults.map((property) => (
                <div key={property.id} className="flex flex-col justify-start items-center border rounded-xl shadow p-2 bg-white w-full max-w-xs">
                  {(Array.isArray(property.photo) && property.photo.length > 0) ? (
                    <img src={property.photo[0]} alt="عکس ملک" className="rounded-xl w-full h-48 object-cover" />
                  ) : (typeof property.photo === "string" && property.photo) ? (
                    <img src={property.photo} alt="عکس ملک" className="rounded-xl w-full h-48 object-cover" />
                  ) : (
                    <img src={House} alt="icons" width={350} className="rounded-xl w-full h-48 object-cover" />
                  )}
                  <div className="w-full flex flex-col gap-2 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[17px] mobile:text-[15px] font-bold">{property.type || "-"}</span>
                      <span className="text-[15px] font-bold text-main-color">{property.price?.toLocaleString() || "-"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex text-[14px] gap-1 items-center">
                        <img src={MapPoint} alt="" width={20} />
                        {property.region || "-"}، {property.address || "-"}
                      </span>
                      <Link to={`/house-details/${property.Uid}`} onClick={() => onAnnouncementClick?.(property)}>
                        <img src={MenuDots} alt="" width={30} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full flex justify-center">
              <span className="text-lg font-bold">نتیجه ای یافت نشد</span>
            </div>
          )
        ) : (
          data.length === 0 ? null : (
            <div className="w-full grid lg:grid-cols-4 sm:grid-cols-2 gap-4 place-items-center grid-cols-1 px-4 pb-16">
              {data.map((property) => (
                <div key={property.id} className="flex flex-col justify-start items-center border rounded-xl shadow p-2 bg-white w-full max-w-xs">
                  {(Array.isArray(property.photo) && property.photo.length > 0) ? (
                    <img src={property.photo[0]} alt="عکس ملک" className="rounded-xl w-full h-48 object-cover" />
                  ) : (typeof property.photo === "string" && property.photo) ? (
                    <img src={property.photo} alt="عکس ملک" className="rounded-xl w-full h-48 object-cover" />
                  ) : (
                    <img src={House} alt="icons" width={350} className="rounded-xl w-full h-48 object-cover" />
                  )}
                  <div className="w-full flex flex-col gap-2 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[17px] mobile:text-[15px] font-bold">{property.type || "-"}</span>
                      <span className="text-[15px] font-bold text-main-color">{property.price?.toLocaleString() || "-"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex text-[14px] gap-1 items-center">
                        <img src={MapPoint} alt="" width={20} />
                        {property.region || "-"}، {property.address || "-"}
                      </span>
                      <Link to={`/house-details/${property.Uid}`} onClick={() => onAnnouncementClick?.(property)}>
                        <img src={MenuDots} alt="" width={30} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AnnouncementList;