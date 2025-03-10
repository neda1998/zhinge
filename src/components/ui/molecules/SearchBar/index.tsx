import { useState, useRef } from "react";
import defaultSearchIcon from "../../../../assets/images/Login.svg";
import Filter from "../../../../assets/images/iconInput/Filter.svg";
import SearchWhite from "../../../../assets/images/iconInput/searchwhite.svg";
import ComboBox from "../../../common/Combo";
import InputState from "../../atoms/input/inputState";
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

  const searchMutation = useSearchMutation();

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!searchRef.current?.contains(e.relatedTarget)) {
      setIsOpen(false);
    }
  };

  const toggleDropdown = () => setIsOpen((prev) => !prev);

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

    const searchData = {
      id: propertyCode ? parseInt(propertyCode) : null,
      userID: "",
      tour3dRequest: false,
      tour3dlink: "",
      loan: loan ? parseInt(loan) : 0,
      type: propertyType, 
      region: region,
      address: "", 
      location: "",
      usage: usage,
      document_type: "",
      land_metrage: landMetrage ? parseInt(landMetrage) : 0,
      useful_metrage: 0,
      floor_number: floorNumber ? parseInt(floorNumber) : 0,
      floor: 0, 
      Unit_in_floor: 0, 
      year_of_build: yearOfBuild ? parseInt(yearOfBuild) : 0,
      full_name: "", 
      price: 0, 
      room_number: roomNumber ? parseInt(roomNumber) : 0,
      features: "", 
      photo: {},
      phone: "", 
      check: false,
      reject: false,
      state_code: "",
      Uid: "" 
    };

    searchMutation.mutate(searchData as any, {
      onSuccess: (response: any) => {
        const results = Array.isArray(response) ? response : response?.announce_search_bodyUp;
        setHasSearched(true);
        if (!results || results.length === 0) {
          setSearchResults([]);
          if (onSearchResults) onSearchResults([]);
        } else {
          setSearchResults(results);
          if (onSearchResults) onSearchResults(results);
        }
      }
    });
  };

  return (
    <div className="relative flex justify-center w-full pb-10" onBlur={handleBlur} ref={searchRef}>
      <div className={`relative flex flex-col items-center w-full lg:w-[50%] p-4 rounded-[20px] ${divStyles}`}>
        <div className={`flex h-[45px] w-full relative ${customStyles}`}>
          <input
            className={`w-full border border-gray-300 lg:pr-[8%] pr-[12%] bg-gray-main text-[14px] font-medium text-gray-700 outline-none transition-all focus:border-2 ${inputStyles}`}
            placeholder={placeholder}
            required
          />
          {showIcon && (
            <>
              <button className="absolute top-1/2 right-[2%] transform -translate-y-1/2 z-10" type="button">
                <img src={iconSrc} alt={iconAlt} width={20} />
              </button>
              <button className="absolute top-1/2 left-16 transform -translate-y-1/2 z-10" type="button" onClick={toggleDropdown}>
                <img src={Filter} alt="filter icon" width={25} />
              </button>
              <button className="absolute top-1/2 left-0 bg-[#09A380] h-full w-14 rounded-l-[50px] transform -translate-y-1/2 z-10" type="button" onClick={handleSearch}>
                <img src={SearchWhite} alt="search icon" width={25} className="mx-auto" />
              </button>
            </>
          )}
        </div>

        {isOpen && (
          <div id="dropdown" className="absolute top-full left-7 border border-gray-300 bg-white rounded-lg shadow z-10 p-3">
            <ComboBox options={["نوع ملک", "اجاره", "فروش", "other"]} value={propertyType} onChange={setPropertyType} />
            <ComboBox options={["انتخاب منطقه", "تهران", "ارومیه"]} value={region} onChange={setRegion} />
            <InputState placeholder="حداقل قیمت" margin="mb-4" onChange={(e) => setMinPrice(e.target.value)} />
            <InputState placeholder="حداکثر قیمت" margin="mb-4" onChange={(e) => setMaxPrice(e.target.value)} />
            <InputState placeholder="کد ملک" onChange={(e) => setPropertyCode(e.target.value)} />
            <InputState placeholder="سال ساخت" onChange={(e) => setYearOfBuild(e.target.value)} />
            <InputState placeholder="تعداد اتاق" onChange={(e) => setRoomNumber(e.target.value)} />
            <button className="bg-main-color rounded-full py-2 flex justify-center items-center w-full mt-4 text-white" onClick={handleSearch}>
              اعمال فیلتر
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
