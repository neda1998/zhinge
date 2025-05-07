import React, { useState } from 'react';
import InputState from "../../../components/ui/atoms/input/inputState";
import Button from "../../../components/ui/atoms/Button";

const FEATURES_OPTIONS = [
  "آسانسور", "پارکینگ", "انباری", "تراس", "حیاط", "سرویس بهداشتی", "سرویس حمام", "کمد دیواری", "کابینت", "کولر", "پکیج", "شومینه", "دوربین مداربسته", "سیستم گرمایش", "سیستم سرمایش", "سونا", "جکوزی", "استخر", "زمین بازی", "باشگاه ورزشی",
  "سالن اجتماعات", "سالن کنفرانس", "کتابخانه", "لابی", "آتش‌نشانی", "سیستم اعلام حریق", "سیستم تهویه مطبوع", "سیستم امنیتی", "سیستم کنترل دسترسی", "سیستم روشنایی هوشمند", "سیستم صوتی و تصویری", "سیستم اینترنت پرسرعت", "سیستم تلویزیون مرکزی ", "سیستم گرمایش از کف", "سیستم سرمایش از سقف", "سیستم تصفیه آب", "سیستم تصفیه هوا", "سیستم گرمایش و سرمایش مرکزی", "سیستم گرمایش و سرمایش مستقل", "سیستم گرمایش و سرمایش هوشمند", "سیستم گرمایش و سرمایش خودکار", "سیستم گرمایش و سرمایش دستی"
];

interface StepThreeUserProps {
  full_name: string; setFullName: (v: string) => void;
  room_number: string; setRoomNumber: (v: string) => void;
  features: string; setFeatures: (v: string) => void;
  onSubmit: () => void;
  isAnnouncementSubmitted: boolean;
}

function formatInputNumber(val: string) {
  const onlyNums = val.replace(/[^\d]/g, "");
  return onlyNums.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const StepThreeUser = ({
  full_name, setFullName,
  room_number, setRoomNumber,
  features, setFeatures,
  onSubmit,
  isAnnouncementSubmitted
}: StepThreeUserProps) => {
  const [showFeaturePanel, setShowFeaturePanel] = useState(false);
  const selectedFeatures: string[] = features ? features.split(",").map(f => f.trim()).filter(f => f) : [];

  const handleFeatureSelect = (feature: string) => {
    if (selectedFeatures.includes(feature)) {
      const newFeatures = selectedFeatures.filter(f => f !== feature);
      setFeatures(newFeatures.join(","));
    } else {
      const newFeatures = [...selectedFeatures, feature];
      setFeatures(newFeatures.join(","));
    }
  };

  return (
    <form
      className="w-full grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5"
      onSubmit={e => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <InputState
        label="نام مالک"
        placeholder="مثال: علی احمدی"
        value={full_name}
        onChange={e => setFullName(e.target.value)}
      />
      <InputState
        label="تعداد اتاق‌ها"
        placeholder="مثال: 3"
        value={room_number}
        onChange={e => setRoomNumber(formatInputNumber(e.target.value))}
      />
      <div className="flex flex-col col-span-1">
        <label className="mb-1 text-sm font-medium">امکانات</label>
        <div className="flex overflow-x-auto gap-1 mb-2 pb-1 max-w-full">
          {selectedFeatures.map((feature) => (
            <span
              key={feature}
              className="bg-main-color text-white px-2 py-1 rounded-full text-xs flex items-center whitespace-nowrap"
            >
              {feature}
              <button
                type="button"
                className="ml-1 text-white"
                onClick={() => handleFeatureSelect(feature)}
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <button
          type="button"
          className="border border-main-color text-main-color px-2 py-1 rounded-full text-xs w-fit mt-2"
          onClick={() => setShowFeaturePanel(true)}
        >
          انتخاب امکانات
        </button>
        {showFeaturePanel && (
          <div className="fixed inset-0 flex items-center justify-center bg-[#302b2b66] bg-opacity-40 z-[9999]">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-[350px] max-h-[80vh] overflow-y-auto relative">
              <button
                type="button"
                className="absolute top-2 left-2 text-gray-500 hover:text-red-500 text-xl font-bold"
                onClick={() => setShowFeaturePanel(false)}
                aria-label="بستن"
              >
                ×
              </button>
              <div className="flex flex-wrap gap-2">
                {FEATURES_OPTIONS.map((feature) => (
                  <button
                    type="button"
                    key={feature}
                    className={`border px-2 py-1 rounded-full text-xs transition
                      ${selectedFeatures.includes(feature)
                        ? "bg-main-color text-white border-main-color"
                        : "border-main-color text-main-color hover:bg-main-color hover:text-white"}`}
                    onClick={() => handleFeatureSelect(feature)}
                  >
                    {feature}
                  </button>
                ))}
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  className="bg-main-color text-white px-4 py-1 rounded-full"
                  onClick={() => setShowFeaturePanel(false)}
                >
                  تایید
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="col-span-4 flex justify-end mt-4">
        <Button
          submit="true"
          width="100px"
          height="45px"
          bgcolor="#09A380"
          borderradius="30px"
          color="white"
          type="submit"
          className="font-bold"
          disabled={isAnnouncementSubmitted}
        >
          ثبت
        </Button>
      </div>
    </form>
  );
};

export default StepThreeUser;