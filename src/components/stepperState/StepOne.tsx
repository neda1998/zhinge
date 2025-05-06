  import InputState from "../ui/atoms/input/inputState";
  import ComboBox from "../common/Combo";

  const formatNumber = (value: number | string | undefined) =>
    value !== undefined && value !== null && value !== ""
      ? Number(value).toLocaleString("en-US")
      : "";

  // helper for formatting input as user types
  function formatInputNumber(val: string) {
    // حذف هر چیزی غیر از عدد
    const onlyNums = val.replace(/[^\d]/g, "");
    // افزودن ویرگول سه‌رقمی
    return onlyNums.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  interface StepOneProps {
      type: string; setType: (v: string) => void;
      usage: string; setUsage: (v: string) => void;
      region: string; setRegion: (v: string) => void;
      address: string; setAddress: (v: string) => void;
      location: string; setLocation: (v: string) => void;
      price?: number; setPrice: (v: number) => void;
  }

  const StepOne = ({
      type, setType,
      usage, setUsage,
      region, setRegion,
      address, setAddress,
      location, setLocation,
      price, setPrice
  }: StepOneProps) => {
    return (
      <div className="w-full">
        <form
          className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-x-5 lg:gap-y-10 gap-y-4"
        >
          <ComboBox
            label="نوع ملک"
            value={type}
            onChange={setType}
            options={["آپارتمان", "ویلایی","مغازه", "زمین مسکونی", "زمین کشاورزی", "سایر"]}
          />
          <InputState label="شهرستان" value={usage} onChange={(e) => setUsage(e.target.value)} />
          <InputState label="استان" value={region} onChange={(e) => setRegion(e.target.value)} />
          <InputState label="آدرس" value={address} onChange={(e) => setAddress(e.target.value)} />
          <InputState label="منطقه" value={location} onChange={(e) => setLocation(e.target.value)} />

          {/* قیمت */}
          <div className="flex flex-col">
            <InputState
              label="قیمت"
              placeholder="مثال: 2,000,000 تومان"
              value={price !== undefined && price !== null ? formatInputNumber(String(price)) : ""}
              onChange={(e) => {
                const formatted = formatInputNumber(e.target.value);
                e.target.value = formatted;
                setPrice(Number(formatted.replace(/,/g, "")));
              }}
            />
            <span className="text-xs text-gray-400">لطفا اعداد را به انگلیسی وارد کنید</span>
            <span className="text-xs text-gray-500">{formatNumber(price)} تومان</span>
          </div>
        </form>
      </div>
    );
  };

  export default StepOne;
