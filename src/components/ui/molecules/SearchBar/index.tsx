import { useState, useRef } from "react";
import defaultSearchIcon from "../../../../assets/images/Login.svg";
import SearchWhite from "../../../../assets/images/iconInput/searchwhite.svg";
import useSearchMutation from "../../../../hooks/mutation/announce/useSearchMutation";
import Swal from "sweetalert2";

interface SearchBarProps {
  placeholder?: string;
  showIcon?: boolean;
  iconSrc?: string;
  iconAlt?: string;
  customStyles?: string;
  divStyles?: string;
  inputStyles?: string;
  resultContainerStyles?: React.CSSProperties;
  resultItemStyles?: React.CSSProperties;
  onSearchResults?: (results: any[]) => void; 
}

export default function SearchBar({
  placeholder = "جستجو بر اساس برند، مدل یا امکانات",
  showIcon = true,
  iconSrc = defaultSearchIcon,
  iconAlt = "آیکون جستجو",
  customStyles = "",
  divStyles = "",
  inputStyles = "",
  onSearchResults,
}: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [propertyType, setPropertyType] = useState("نوع ملک");
  const [region, setRegion] = useState("انتخاب منطقه");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [propertyCode, setPropertyCode] = useState("");
  const [usage, setUsage] = useState("any");
  const [loan, setLoan] = useState("");
  const [yearOfBuild, setYearOfBuild] = useState("");
  const [floorNumber, setFloorNumber] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [landMetrage, setLandMetrage] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchInput, setSearchInput] = useState(""); 

  const searchMutation = useSearchMutation();

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!searchRef.current?.contains(e.relatedTarget)) {
      setIsOpen(false);
    }
  };

  function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || "";
    return "";
  }

  const handleSearch = () => {
    if (minPrice && maxPrice) {
      const min = parseFloat(minPrice);
      const max = parseFloat(maxPrice);
      if (min > max) {
        Swal.fire({
          title: "!خطا",
          text: "حداقل مقدار نباید از حداکثر بیشتر باشد",
          icon: "error",
          confirmButtonText: "باشه",
        });
        return;
      }
    }

    const baseSearchData: any = {};
    if (propertyCode) baseSearchData.id = isNaN(Number(propertyCode)) ? propertyCode : Number(propertyCode);
    if (minPrice) baseSearchData.minPrice = isNaN(Number(minPrice)) ? minPrice : Number(minPrice);
    if (maxPrice) baseSearchData.maxPrice = isNaN(Number(maxPrice)) ? maxPrice : Number(maxPrice);
    if (roomNumber) baseSearchData.room_number = isNaN(Number(roomNumber)) ? roomNumber : Number(roomNumber);
    if (yearOfBuild) baseSearchData.year_of_build = isNaN(Number(yearOfBuild)) ? yearOfBuild : Number(yearOfBuild);
    if (loan) baseSearchData.loan = isNaN(Number(loan)) ? loan : Number(loan);
    if (landMetrage) baseSearchData.land_metrage = isNaN(Number(landMetrage)) ? landMetrage : Number(landMetrage);
    if (floorNumber) baseSearchData.floor_number = isNaN(Number(floorNumber)) ? floorNumber : Number(floorNumber);
    if (propertyType && propertyType !== "نوع ملک") baseSearchData.type = propertyType;
    if (region && region !== "انتخاب منطقه") baseSearchData.region = region;

    const doSearch = (data: any, cb: (results: any[]) => void) => {
      searchMutation.mutate(data, {
        onSuccess: (response: any) => {
          const results = Array.isArray(response) ? response : [];
          setHasSearched(true);
          cb(results);
        }
      });
    };

    if (searchInput) {
      const trySearchChain = [
        { key: "usage", value: searchInput },
        { key: "Uid", value: isNaN(Number(searchInput)) ? searchInput : Number(searchInput) },
        { key: "region", value: searchInput }, 
        { key: "land_metrage", value: isNaN(Number(searchInput)) ? searchInput : Number(searchInput) }, 
        { key: "features", value: searchInput }, 
        { key: "address", value: searchInput }, 
        { key: "price", value: isNaN(Number(searchInput)) ? searchInput : Number(searchInput) },
        { key: "year_of_build", value: isNaN(Number(searchInput)) ? searchInput : Number(searchInput) },
        { key: "room_number", value: isNaN(Number(searchInput)) ? searchInput : Number(searchInput) }
      ];

      const searchRecursive = (index: number) => {
        if (index >= trySearchChain.length) {
          setSearchResults([]);
          if (onSearchResults) onSearchResults([]);
          return;
        }
        const { key, value } = trySearchChain[index];
        const data = { ...baseSearchData, [key]: value };
        doSearch(data, (results) => {
          if (results.length > 0) {
            setSearchResults(results);
            if (onSearchResults) onSearchResults(results);
          } else {
            searchRecursive(index + 1);
          }
        });
      };

      searchRecursive(0);
    } else {
      doSearch(baseSearchData, (results) => {
        setSearchResults(results);
        if (onSearchResults) onSearchResults(results);
      });
    }
  };

  return (
    <div className="relative flex justify-center w-full pb-10 pt-12 sm:pt-6" onBlur={handleBlur} ref={searchRef}>
      <div className={`relative flex flex-col items-center w-full lg:w-[50%] p-4 rounded-[20px] ${divStyles}`}>
        <div className={`flex h-[45px] w-full relative ${customStyles}`}>
          <input
            className={`w-full border border-gray-300 lg:pr-[8%] pr-[12%] bg-gray-main text-[14px] font-medium outline-none transition-all focus:border-2 ${inputStyles}`}
            placeholder={placeholder}
            required
            value={searchInput} 
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {showIcon && (
            <>
              <button className="absolute top-1/2 right-[2%] transform -translate-y-1/2 z-10" type="button">
                <img src={iconSrc} alt={iconAlt} width={20} />
              </button>
              <button className="absolute top-1/2 left-0 bg-[#09A380] h-full w-14 rounded-l-[50px] transform -translate-y-1/2 z-10" type="button" onClick={handleSearch}>
                <img src={SearchWhite} alt="search icon" width={25} className="mx-auto" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
