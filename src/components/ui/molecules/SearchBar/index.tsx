import { useState, useRef } from "react";
import defaultSearchIcon from "../../../../assets/images/Login.svg";
import Filter from "../../../../assets/images/iconInput/Filter.svg";
import SearchWhite from "../../../../assets/images/iconInput/searchwhite.svg";
import ComboBox from "../../../common/Combo";
import InputState from "../../atoms/input/inputState";
import useSearchMutation from "../../../../hooks/mutation/announce/useSearchMutation";

type FilterData = {
  type: string;
  region: string;
  minPrice: string;
  maxPrice: string;
  propertyCode: string;
  Uid: string;
};

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
}

export default function SearchBar({
  placeholder = "Search by brand, model, or functionality",
  showIcon = true,
  iconSrc = defaultSearchIcon,
  iconAlt = "search icon",
  customStyles = "",
  divStyles = "",
  inputStyles = "",
  resultContainerStyles = {},
  resultItemStyles = {},
}: SearchBarProps) {
  const [results, setResults] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Filter state
  const [propertyType, setPropertyType] = useState("نوع ملک");
  const [region, setRegion] = useState("انتخاب منطقه");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [propertyCode, setPropertyCode] = useState("");

  const { mutate: searchMutate } = useSearchMutation();

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!searchRef.current?.contains(e.relatedTarget)) {
      setIsSearching(false);
      setIsOpen(false);
      setResults([]);
    }
  };

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const applyFilter = () => {
    const filterData: FilterData = {
      type: propertyType !== "نوع ملک" ? propertyType : "any",
      region: region !== "انتخاب منطقه" ? region : "any",
      minPrice,
      maxPrice,
      propertyCode,
      Uid: "1731598770627",
    };

    searchMutate(filterData, {
      onSuccess: (response: any) => {
        setResults(response.data || []);
        setIsOpen(false);
      },
      onError: () => {
        setResults([]);
      },
    });
  };

  return (
    <>
      {isSearching && <div className="fixed inset-0 z-40 bg-black bg-opacity-50"></div>}
      <div className="relative flex justify-center w-full pb-10" onBlur={handleBlur} ref={searchRef}>
        <div className={`relative flex flex-col items-center lg:w-[50%] w-full sm:mt-14 lg:mt-0 md:mx-4 mobile:w-full justify-center p-4 rounded-[20px] ${isSearching ? "z-50" : ""} ${divStyles}`}>
          <div className={`flex h-[45px] w-full mobile:w-full ${customStyles} relative`}>
            <input
              className={`w-full border border-blue-gray-200 lg:pr-[8%] pr-[12%] mobile:pr-[16%] bg-gray-main text-[14px] font-medium text-blue-gray-700 outline-none transition-all focus:border-2 ${inputStyles}`}
              placeholder={placeholder}
              required
            />
            {showIcon && (
              <>
                <button className="absolute top-1/2 right-[1%] transform -translate-y-1/2 z-10" type="button">
                  <img src={iconSrc} alt={iconAlt} width={20} />
                </button>
                <button
                  className="absolute top-1/2 left-16 transform -translate-y-1/2 z-10"
                  type="button"
                  onClick={toggleDropdown}
                >
                  <img src={Filter} alt="filter icon" width={25} />
                </button>
                <button
                  className="absolute top-1/2 left-0 bg-[#09A380] h-full w-14 rounded-l-[50px] transform -translate-y-1/2 z-10"
                  type="button"
                  onClick={applyFilter}
                >
                  <img src={SearchWhite} alt="search icon" width={25} className="mx-auto" />
                </button>
              </>
            )}
          </div>
          {isOpen && (
            <div
              id="dropdown"
              className="absolute top-full left-7 mobile:left-5 border border-gray-300 bg-white rounded-lg shadow z-10 p-3"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <ComboBox 
                options={["نوع ملک", "اجاره", "فروش", "other"]} 
                value={propertyType}
                onChange={(val) => setPropertyType(val)} 
              />
              <ComboBox 
                options={["انتخاب منطقه", "تهران", "ارومیه"]}
                value={region}
                onChange={(val) => setRegion(val)} 
              />
              <InputState placeholder="حداقل قیمت" margin="mb-4" onChange={(e) => setMinPrice(e.target.value)} />
              <InputState placeholder="حداکثر قیمت" margin="mb-4" onChange={(e) => setMaxPrice(e.target.value)} />
              <InputState placeholder="کد ملک" onChange={(e) => setPropertyCode(e.target.value)} />
              <button className="bg-main-color rounded-full py-2 flex justify-center items-center w-full mt-4 text-white" onClick={applyFilter}>
                اعمال فیلتر
              </button>
            </div>
          )}

          {results.length > 0 && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-50" style={resultContainerStyles}>
              {results.map((result, index) => (
                <div key={index} className="px-4 py-2 hover:bg-gray-100 cursor-pointer" style={resultItemStyles}>
                  {result}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
