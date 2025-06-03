import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import House from "../../src/assets/images/Rectangle49.svg";
import MenuDots from "../../src/assets/images/MenuDotsSquare.svg";
import MapPoint from "../../src/assets/images/MapPointFavourite.svg";
import Header from "../components/template/Header";
import { PuffLoader } from "react-spinners";
import useSearchMutation from "../hooks/mutation/announce/useSearchMutation";
import InputState from "../components/ui/atoms/input/inputState";
import UseSearchRegionMutation from "../hooks/mutation/search_region/UseSearchRegionMutation";

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
  const [form, setForm] = useState<{ id?: string; usage?: string; document_type?: string; region?: string | string[]; price?: string | number }>({});
  const [results, setResults] = useState<any[] | null>(null);
  const [regionSearch, setRegionSearch] = useState("");
  const [filteredRegions, setFilteredRegions] = useState<string[]>([]);
  const [showRegionDropdown, setShowRegionDropdown] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // استفاده از هوک سرچ
  const searchMutation = useSearchMutation();
  const searchRegionMutation = UseSearchRegionMutation();

  let titleLabel = "آگهی آپارتمانی";
  if (announcementType === "rent") titleLabel = "ملک اجاره ای آپارتمانی";
  else if (announcementType === "sell") titleLabel = "ملک فروش آپارتمانی";
  else titleLabel = "همه آگهی‌های آپارتمانی";

  const TYPE_OPTIONS = [
    "آپارتمان",
    "ویلایی",
    "مغازه",
    "زمین مسکونی",
    "زمین کشاورزی",
    "سایر"
  ];
  const LOCATION_OPTIONS = [
    "شمالی",
    "جنوبی",
    "شمالی دو نبش",
    "جنوبی دو نبش",
    "دوکله",
    "سه نبش"
  ];
  const DOCUMENT_TYPE_OPTIONS = [
    "سند تک برگ",
    "سند واگذاری",
    "مبایعه نامه (قولنامه‌ای)",
    "نسق",
    "اوقافی",
    "سایر"
  ];

  const usageOptions = Array.from(
    new Set([...TYPE_OPTIONS, ...data.map((item) => item.type).filter(Boolean)])
  );
  const documentTypeOptions = Array.from(
    new Set([...DOCUMENT_TYPE_OPTIONS, ...data.map((item) => item.document_type).filter(Boolean)])
  );
  const regionOptions = Array.from(new Set(data.map((item) => item.region).filter(Boolean)));

  const handleChange = (key: string, value: string) => {
    // اگر price بود، اعداد فارسی را به انگلیسی تبدیل کن
    let newValue = value;
    if (key === "price") {
      newValue = persianToEnglishDigits(value.replace(/[^\d]/g, ""));
    }
    const updatedForm = { ...form, [key]: newValue };
    setForm(updatedForm);
    triggerSearch(updatedForm);
  };

  const triggerSearch = (payload: typeof form) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const cleaned = Object.fromEntries(Object.entries(payload).filter(([_, v]) => v && v !== ""));
      if (Object.keys(cleaned).length === 0) {
        setResults(null);
        return;
      }

      let finalPayload = { ...cleaned };
      let regions: string[] = [];
      if (finalPayload.region) {
        if (typeof finalPayload.region === "string") {
          regions = finalPayload.region
            .split(/,|،/)
            .map((r: string) => r.trim())
            .filter(Boolean);
        } else if (Array.isArray(finalPayload.region)) {
          regions = finalPayload.region;
        }
      }

      // تبدیل price به عدد صحیح و حذف اگر نامعتبر بود
      if (finalPayload.price) {
        const priceNum = Number(persianToEnglishDigits(finalPayload.price.toString().replace(/[^\d]/g, "")));
        if (!isNaN(priceNum) && priceNum > 0) {
          finalPayload.price = priceNum;
        } else {
          delete finalPayload.price;
        }
      }

      if (regions.length > 1) {
        let allResults: any[] = [];
        let done = 0;
        regions.forEach(region => {
          searchMutation.mutate(
            {
              ...finalPayload,
              region,
              id: finalPayload.id ? Number(finalPayload.id) : undefined,
            },
            {
              onSuccess: (response: any) => {
                let resultArr: any[] = [];
                if (Array.isArray(response)) {
                  resultArr = response;
                } else if (response?.data && Array.isArray(response.data)) {
                  resultArr = response.data;
                } else if (response?.data && typeof response.data === "object") {
                  resultArr = [response.data];
                } else if (typeof response === "object") {
                  resultArr = [response];
                }
                allResults = [...allResults, ...resultArr];
                done++;
                if (done === regions.length) {
                  const uniqueResults = Array.from(
                    new Map(allResults.map(item => [item.id, item])).values()
                  );
                  setResults(uniqueResults);
                }
              },
              onError: () => {
                done++;
                if (done === regions.length) {
                  setResults(allResults.length > 0 ? allResults : []);
                }
              }
            }
          );
        });
      } else {
        searchMutation.mutate(
          {
            ...finalPayload,
            region: regions[0],
            id: finalPayload.id ? Number(finalPayload.id) : undefined,
          },
          {
            onSuccess: (response: any) => {
              let resultArr: any[] = [];
              if (Array.isArray(response)) {
                resultArr = response;
              } else if (response?.data && Array.isArray(response.data)) {
                resultArr = response.data;
              } else if (response?.data && typeof response.data === "object") {
                resultArr = [response.data];
              } else if (typeof response === "object") {
                resultArr = [response];
              }
              setResults(resultArr);
            },
            onError: () => {
              setResults([]);
            }
          }
        );
      }
    }, 400);
  };

  const handleRegionInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRegionSearch(value);

    const regionList = value
      .split(/,|،/)
      .map((r) => r.trim())
      .filter(Boolean);

    if (regionList.length > 0) {
      searchRegionMutation.mutate({ region: regionList.length === 1 ? regionList[0] : regionList });
      setShowRegionDropdown(true);
    } else {
      setFilteredRegions([]);
      setShowRegionDropdown(false);
    }

    handleChange("region", value);
  };

  const handleRegionSelect = (selectedRegion: string) => {
    const regionList = regionSearch
      .split(/,|،/)
      .map((r) => r.trim());

    regionList[regionList.length - 1] = selectedRegion;
    const newRegionValue = regionList.filter(Boolean).join(", ");
    setRegionSearch(newRegionValue);
    setShowRegionDropdown(false);
    handleChange("region", newRegionValue);
  };

  const persianToEnglishDigits = (str: string) =>
    str.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));

  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="w-full flex flex-col h-screen mobile:mt-20">
        <div className="w-full flex flex-col items-center gap-6 mb-8 md:mt-24 lg:mt-8">
          <div
            className="
              bg-gradient-to-br from-green-100 via-blue-50 to-blue-100
              rounded-3xl
              shadow-2xl
              border border-blue-100
              p-8
              w-[97%]
              max-w-6xl
              transition-all
              duration-300
              hover:shadow-blue-200
              hover:scale-[1.01]
              flex flex-col gap-4
            "
          >
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="flex flex-col">
                <label className="mb-2 text-gray-600 font-bold text-sm">کد ملک</label>
                <InputState
                  placeholder="کد ملک"
                  value={form.id || ""}
                  onChange={e => handleChange("id", e.target.value)}
                  type="text"
                  numeric
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-2 text-gray-600 font-bold text-sm">نوع ملک</label>
                <select
                  className="rounded-xl border border-gray-200 px-3 py-2 font-bold text-gray-800 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition outline-none shadow-sm hover:shadow-md"
                  value={form.usage || ""}
                  onChange={e => handleChange("usage", e.target.value)}
                >
                  <option value="">انتخاب کنید</option>
                  {usageOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label className="mb-2 text-gray-600 font-bold text-sm">نوع سند</label>
                <select
                  className="rounded-xl border border-gray-200 px-3 py-2 font-bold text-gray-800 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition outline-none shadow-sm hover:shadow-md"
                  value={form.document_type || ""}
                  onChange={e => handleChange("document_type", e.target.value)}
                >
                  <option value="">انتخاب کنید</option>
                  {documentTypeOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col relative">
                <label className="mb-2 text-gray-600 font-bold text-sm">محله مورد نظر</label>
                <InputState
                  value={regionSearch}
                  onChange={handleRegionInput}
                  placeholder="مثال: مبارک آباد"
                  onFocus={() => {
                    const regionList = regionSearch.split(/,|،/).map(r => r.trim());
                    const lastRegion = regionList[regionList.length - 1] || "";
                    if (
                      lastRegion.length > 0 &&
                      (Array.isArray(searchRegionMutation.data) && searchRegionMutation.data.length > 0 || searchRegionMutation.isLoading)
                    )
                      setShowRegionDropdown(true);
                  }}
                  autoComplete="off"
                  style={{ position: "relative", zIndex: 30 }}
                />
                {showRegionDropdown && (
                  <div
                    className="absolute z-20 w-full bg-white border border-gray-200 rounded shadow mt-1 max-h-48 overflow-auto"
                    style={{ top: "100%", left: 0, right: 0, zIndex: 20 }}
                  >
                    {searchRegionMutation.isLoading ? (
                      <div className="px-4 py-2 text-gray-400 text-right select-none">
                        در حال جستجو...
                      </div>
                    ) : Array.isArray(searchRegionMutation.data) && searchRegionMutation.data.length > 0 ? (
                      (typeof searchRegionMutation.data[0] === "object"
                        ? searchRegionMutation.data.map((item: any, idx: number) => (
                            <div
                              key={idx}
                              className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-right"
                              onMouseDown={e => e.preventDefault()}
                              onClick={() => handleRegionSelect(item.name)}
                            >
                              {item.name}
                            </div>
                          ))
                        : searchRegionMutation.data.map((name: string, idx: number) => (
                            <div
                              key={idx}
                              className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-right"
                              onMouseDown={e => e.preventDefault()}
                              onClick={() => handleRegionSelect(name)}
                            >
                              {name}
                            </div>
                          ))
                      )
                    ) : (
                      (regionSearch.split(/,|،/).map(r => r.trim()).pop() || "").length > 0 && (
                        <div className="px-4 py-2 text-gray-400 text-right select-none">
                          نتیجه‌ای یافت نشد
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <label className="mb-2 text-gray-600 font-bold text-sm">قیمت</label>
                <InputState
                  placeholder="قیمت (تومان)"
                  value={form.price || ""}
                  onChange={e => handleChange("price", e.target.value)}
                  type="text"
                  numeric
                />
              </div>
            </div>
          </div>
        </div>
        {isLoading || searchMutation.isLoading ? (
          <div className="flex justify-center items-center min-h-screen">
            <PuffLoader color="#09A380" />
          </div>
        ) : results !== null ? (
          results.length > 0 ? (
            <div className="w-full grid lg:grid-cols-4 sm:grid-cols-2 gap-4 place-items-center grid-cols-1 px-4 pb-16">
              {results.map((property) => (
                <div key={property.id} className="flex flex-col justify-start items-center border rounded-xl shadow p-2 bg-white w-full">
                  {(Array.isArray(property.photo) && property.photo.length > 0) ? (
                    <img src={property.photo[0]} alt="عکس ملک" className="rounded-xl w-full h-48 object-cover" />
                  ) : (typeof property.photo === "string" && property.photo) ? (
                    <img src={property.photo} alt="عکس ملک" className="rounded-xl w-full h-48 object-cover" />
                  ) : (
                    <img src={House} alt="icons" width={350} className="rounded-xl w-full h-48 object-cover" />
                  )}
                  <div className="w-full flex flex-col gap-2 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[17px] mobile:text-[15px] font-bold">{property.usage || "-"}</span>
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
              <span className="text-lg font-bold">نتیجه‌ای یافت نشد</span>
            </div>
          )
        ) : (
          data.length === 0 ? null : (
            <div className="w-full grid lg:grid-cols-4 sm:grid-cols-2 gap-4 place-items-center grid-cols-1 px-4 pb-16">
              {data.map((property) => (
                <div key={property.id} className="flex flex-col justify-start items-center border rounded-xl shadow p-2 bg-white w-full">
                  {(Array.isArray(property.photo) && property.photo.length > 0) ? (
                    <img src={property.photo[0]} alt="عکس ملک" className="rounded-xl w-full h-48 object-cover" />
                  ) : (typeof property.photo === "string" && property.photo) ? (
                    <img src={property.photo} alt="عکس ملک" className="rounded-xl w-full h-48 object-cover" />
                  ) : (
                    <img src={House} alt="icons" width={350} className="rounded-xl w-full h-48 object-cover" />
                  )}
                  <div className="w-full flex flex-col gap-2 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[17px] mobile:text-[15px] font-bold">{property.usage || "-"}</span>
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