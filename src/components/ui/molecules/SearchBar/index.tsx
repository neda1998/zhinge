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
  const [searchInput, setSearchInput] = useState(""); // <-- add this line

  const searchMutation = useSearchMutation();

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!searchRef.current?.contains(e.relatedTarget)) {
      setIsOpen(false);
    }
  };

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // تابع ساده برای خواندن مقدار کوکی
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

    // تابع کمکی برای جستجو
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
      // ابتدا با type
      const dataWithType = { ...baseSearchData, type: searchInput };
      console.log("payload (type)", dataWithType);
      doSearch(dataWithType, (results) => {
        if (results.length > 0) {
          setSearchResults(results);
          if (onSearchResults) onSearchResults(results);
        } else {
          // اگر نتیجه نداشت، با price
          const priceValue = isNaN(Number(searchInput)) ? searchInput : Number(searchInput);
          const dataWithPrice = { ...baseSearchData, price: priceValue };
          console.log("payload (price)", dataWithPrice);
          doSearch(dataWithPrice, (results2) => {
            if (results2.length > 0) {
              setSearchResults(results2);
              if (onSearchResults) onSearchResults(results2);
            } else {
              // اگر با price هم نتیجه نداشت، با year_of_build (به صورت عدد)
              const yearValue = isNaN(Number(searchInput)) ? searchInput : Number(searchInput);
              const dataWithYear = { year_of_build: yearValue };
              console.log("payload (year_of_build)", dataWithYear);
              doSearch(dataWithYear, (results3) => {
                if (results3.length > 0) {
                  setSearchResults(results3);
                  if (onSearchResults) onSearchResults(results3);
                } else {
                  // اگر با year_of_build هم نتیجه نداشت، با room_number (به صورت عدد)
                  const roomNumberValue = isNaN(Number(searchInput)) ? searchInput : Number(searchInput);
                  const dataWithRoomNumber = { room_number: roomNumberValue };
                  console.log("payload (room_number)", dataWithRoomNumber);
                  doSearch(dataWithRoomNumber, (resultsRoom) => {
                    if (resultsRoom.length > 0) {
                      setSearchResults(resultsRoom);
                      if (onSearchResults) onSearchResults(resultsRoom);
                    } else {
                      // اگر با room_number هم نتیجه نداشت، با region (string)
                      const dataWithRegion = { region: searchInput };
                      console.log("payload (region)", dataWithRegion);
                      doSearch(dataWithRegion, (resultsRegion) => {
                        setSearchResults(resultsRegion);
                        if (onSearchResults) onSearchResults(resultsRegion);
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    } else {
      // اگر searchInput نبود، فقط با baseSearchData جستجو کن
      console.log("payload", baseSearchData);
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
            className={`w-full border border-gray-300 lg:pr-[8%] pr-[12%] bg-gray-main text-[14px] font-medium text-gray-700 outline-none transition-all focus:border-2 ${inputStyles}`}
            placeholder={placeholder}
            required
            value={searchInput} // <-- bind value
            onChange={(e) => setSearchInput(e.target.value)} // <-- update state on change
          />
          {showIcon && (
            <>
              <button className="absolute top-1/2 right-[2%] transform -translate-y-1/2 z-10" type="button">
                <img src={iconSrc} alt={iconAlt} width={20} />
              </button>
              {/* <button className="absolute top-1/2 left-16 transform -translate-y-1/2 z-10" type="button" onClick={toggleDropdown}>
                <img src={Filter} alt="filter icon" width={25} />
              </button> */}
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
