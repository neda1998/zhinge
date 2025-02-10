import React, { useState } from "react";
import defaultSearchIcon from "../../../../assets/images/Login.svg";
import Filter from '../../../../assets/images/icon input/Filter.svg'
import SearchWhite from '../../../../assets/images/icon input/searchwhite.svg'
import ComboBox from "../../../common/Combo";
import InputState from "../../atoms/input/inputState";
export default function SearchBar({
  placeholder = "Search by brand, model, or functionality",
  showIcon = true,
  iconSrc = defaultSearchIcon,
  iconAlt = "search icon",
  customStyles = {},
  divStyles = {},
  inputStyles = {},
  resultContainerStyles = {},
  resultItemStyles = {},
}) {
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleBlur = (e: any) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsSearching(false);
    }
    return setResults([]);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  return (
    <>
      {isSearching && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50"></div>
      )}
      <div className="relative flex justify-center w-full pb-10" onBlur={handleBlur}>
        <div
          className={`relative flex flex-col items-center lg:w-[70%] w-full sm:mt-14 lg:mt-0 mx-4 mobile:w-full justify-center p-4 rounded-[20px] ${isSearching ? "z-50" : ""
            } ${divStyles}`}
        >
          <div className={`flex h-[45px] w-[70%] mobile:ml-8 mobile:w-full ${customStyles} relative`}>
            <input
              className={`w-full  border border-blue-gray-200 lg:pr-[8%] pr-[12%] mobile:pr-[16%] bg-gray-main text-[14px] font-medium text-blue-gray-700 outline-none transition-all focus:border-2 ${inputStyles}`}
              placeholder={placeholder}
              required
            />
            {showIcon && (
              <>
                <button
                  className="absolute top-1/2 right-[1%] transform -translate-y-1/2 z-10 select-none py-2 px-4 text-center align-middle text-xs font-bold text-white transition-opacity focus:opacity-85 active:opacity-85"
                  type="button"
                  data-ripple-light="true"
                >
                  <img src={iconSrc} alt={iconAlt} width={20} />
                </button>
                <button
                  className="absolute top-1/2 right-[86%] mobile:right-[75%] transform -translate-y-1/2 z-10 select-none py-2 px-4 text-center align-middle text-xs font-bold text-white transition-opacity focus:opacity-85 active:opacity-85"
                  type="button"
                  onClick={toggleDropdown}
                  data-ripple-light="true"
                >
                  <img src={Filter} alt={iconAlt} width={25} />
                </button>

                <button
                  className="absolute top-1/2 right-[93%] bg-[#09A380] h-full w-14 rounded-l-[50px] transform -translate-y-1/2 z-10 select-none py-2 px-4 text-center align-middle text-xs font-bold text-white transition-opacity focus:opacity-85 active:opacity-85"
                  type="button"
                  data-ripple-light="true"
                >
                  <img src={SearchWhite} alt={iconAlt} width={25} />
                </button>
              </>
            )}
          </div>
          {isOpen && (
            <div
              id="dropdown"
              className="absolute top-full left-40 mobile:left-5 border border-gray-300 bg-white rounded-lg shadow z-10 p-3"
            >
              <div
                className={`w-0 h-0 -z-10 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] absolute top-[-10px] left-[26%] transform -translate-x-1/2`}
              />
              <ComboBox options={["نوع ملک", "تهران", "ارومیه"]} />
              <ComboBox options={["انتخاب منطقه", "تهران", "ارومیه"]} />
              <InputState placeholder="حداقل قیمت" margin="mb-4" />
              <InputState placeholder="حداکثر قیمت" margin="mb-4" />
              <InputState placeholder="کد ملک" />
              <button className="bg-main-color rounded-full py-2 flex justify-center items-center text-center w-full mt-4 text-white">اعمال فیلتر</button>
            </div>
          )}

          {results.length > 0 && (
            <div
              className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-50"
              style={resultContainerStyles}
            >
              {results.map((result, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  style={resultItemStyles}
                >
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
