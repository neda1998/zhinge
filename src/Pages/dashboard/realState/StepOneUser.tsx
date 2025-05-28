import React, { useState, useRef, useEffect } from 'react';
import InputState from "../../../components/ui/atoms/input/inputState";
import ComboBox from '../../../components/common/Combo';
import UseGetAllregionsQuery from "../../../hooks/queries/admin/getAllregions/UseGetAllregionsQuery";
import UseSearchRegionMutation from "../../../hooks/mutation/search_region/UseSearchRegionMutation";

interface StepOneUserProps {
  type: string; setType: (v: string) => void;
  region: string; setRegion: (v: string) => void;
  address: string; setAddress: (v: string) => void;
  Unit_in_floor?: number; setUnitInFloor: (v: number) => void;
  document_type: string; setDocumentType: (v: string) => void;
  floor_number?: number; setFloorNumber: (v: number) => void; 
  floor?: string; setFloor: (v: string) => void;
  room_number?: number; setRoomNumber: (v: number) => void;
  usage: string; setUsage: (v: string) => void;
}

const shouldHideFields = (type: string) =>
    type === "مغازه" || type === "زمین مسکونی" || type === "زمین کشاورزی";

const StepOneUser = ({
    type, setType,
    region, setRegion,
    address, setAddress,
    Unit_in_floor, setUnitInFloor,
    floor_number, setFloorNumber,
    floor, setFloor,
    document_type, setDocumentType,
    room_number, setRoomNumber,
    usage, setUsage
}: StepOneUserProps) => {
   const hideFields = shouldHideFields(usage);

   const { data: regionsData } = UseGetAllregionsQuery();
   const regionOptions = Array.isArray(regionsData) ? regionsData.map((item: any) => item.name) : [];

   const [regionSearch, setRegionSearch] = useState("");
   const [filteredRegions, setFilteredRegions] = useState<string[]>([]);
   const [showRegionDropdown, setShowRegionDropdown] = useState(false);
   const searchRegionMutation = UseSearchRegionMutation({
     onSuccess: (response: any) => {
       setFilteredRegions(Array.isArray(response) ? response.map((item: any) => item.name) : []);
     }
   });

   const regionInputRef = useRef<HTMLInputElement>(null);

   useEffect(() => {
     function handleClickOutside(event: MouseEvent) {
       if (
        regionInputRef.current &&
        !regionInputRef.current.contains(event.target as Node)
      ) {
        setShowRegionDropdown(false);
      }
    }
    if (showRegionDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showRegionDropdown]);

   const handleRegionInput = (e: React.ChangeEvent<HTMLInputElement>) => {
     const value = e.target.value;
     setRegionSearch(value);
     setShowRegionDropdown(true);
     if (value.trim().length > 0) {
       searchRegionMutation.mutate({ name: value });
     } else {
       setFilteredRegions([]);
     }
   };

   const handleRegionSelect = (name: string) => {
     setRegion(name);
     setRegionSearch(name);
     setShowRegionDropdown(false);
   };

   const displayRegionOptions = regionSearch.trim().length > 0 ? filteredRegions : regionOptions;

    return (
        <div className="w-full grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
            <ComboBox
                label="نوع ملک"
                value={usage}
                onChange={(value) => {
                    setUsage(value); 
                }}
                options={["آپارتمان", "ویلایی", "مغازه", "زمین مسکونی", "زمین کشاورزی", "سایر"]}
            />
            <div className="relative" ref={regionInputRef}>
                <InputState
                    label="محله مورد نظر"
                    value={regionSearch}
                    onChange={handleRegionInput}
                    placeholder="مثال: پاسداران"
                    onFocus={() => {
                        if (
                            regionSearch.trim().length > 0 &&
                            (filteredRegions.length > 0 || searchRegionMutation.isLoading || regionSearch.trim().length > 0)
                        )
                            setShowRegionDropdown(true);
                    }}
                />
                {showRegionDropdown && (
                    <div className="absolute z-20 w-full bg-white border border-gray-200 rounded shadow mt-1 max-h-48 overflow-auto">
                        {searchRegionMutation.isLoading ? (
                            <div className="px-4 py-2 text-gray-400 text-right select-none">
                                در حال جستجو...
                            </div>
                        ) : filteredRegions.length > 0 ? (
                            filteredRegions.map((name, idx) => (
                                <div
                                    key={idx}
                                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-right"
                                    onClick={() => handleRegionSelect(name)}
                                >
                                    {name}
                                </div>
                            ))
                        ) : (
                            regionSearch.trim().length > 0 && (
                                <div className="px-4 py-2 text-gray-400 text-right select-none">
                                    نتیجه‌ای یافت نشد
                                </div>
                            )
                        )}
                    </div>
                )}
            </div>
            <InputState
                label="آدرس"
                placeholder="سنندج، خیابان پاسداران، کوچه ادب 2، پلاک 3"
                value={address}
                onChange={e => setAddress(e.target.value)}
            />

            {!hideFields && (
          <>
                <InputState
                  label="طبقه مورد نظر"
                  value={floor !== undefined && floor !== null ? String(floor) : ""}
                  onChange={e => setFloor(e.target.value)}
                  placeholder="مثال: 5"
                  numeric
                />
                <InputState
                    label="تعداد طبقات"
                    value={floor_number !== undefined && floor_number !== null ? String(floor_number) : ""}
                    onChange={(e) => setFloorNumber(Number(e.target.value.replace(/,/g, "")))}
                    placeholder="مثال: 3"
                    numeric
                />
                <InputState
                    label="تعداد واحد در طبقه"
                    value={Unit_in_floor !== undefined && Unit_in_floor !== null ? String(Unit_in_floor) : ""}
                    onChange={e => setUnitInFloor(Number(e.target.value.replace(/,/g, "")))}
                    placeholder="مثال: 2"
                    numeric
                />
                <InputState
                    label="تعداد اتاق ها"
                    value={room_number !== undefined && room_number !== null ? String(room_number) : ""}
                    onChange={(e) => setRoomNumber(Number(e.target.value.replace(/,/g, "")))}
                    placeholder="مثال: 3"
                    numeric
                />
          </>
        )}
            <ComboBox
                label="نوع سند"
                value={document_type}
                onChange={setDocumentType}
                options={["سند تک برگ", "سند واگذاری", "مبایعه نامه (قولنامه‌ای)", "نسق", "اوقافی", "سایر"]}
            />
        </div>
    );
};

export default StepOneUser;