  import InputState from "../ui/atoms/input/inputState";
  import ComboBox from "../common/Combo";

  const formatNumber = (value: number | string | undefined) =>
    value !== undefined && value !== null && value !== ""
      ? Number(value).toLocaleString("en-US")
      : "";

  function formatInputNumber(val: string) {
    const onlyNums = val.replace(/[^\d]/g, "");
    return onlyNums.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  interface StepOneProps {
      type: string; setType: (v: string) => void;
      usage: string; setUsage: (v: string) => void;
      region: string; setRegion: (v: string) => void;
      address: string; setAddress: (v: string) => void;
      price?: number; setPrice: (v: number) => void;
  }

  const StepOne = ({
      type, setType,
      usage, setUsage,
      region, setRegion,
      address, setAddress,
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
          <ComboBox options={["مسکونی","اداری"]} label="کاربرد" value={usage} onChange={setUsage} />
          <InputState placeholder="سنندج، خیابان پاسداران، کوچه ادب 2، پلاک 3" label="آدرس" value={address} onChange={(e) => setAddress(e.target.value)} />
          <InputState label="منطقه" value={region} onChange={(e) => setRegion(e.target.value)} placeholder="مثال: 2" />
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
            <span className="text-xs text-gray-400 my-1">لطفا اعداد را به انگلیسی وارد کنید</span>
            <span className="text-xs text-gray-500">{formatNumber(price)} تومان</span>
          </div>
        </form>
      </div>
    );
  };

  export default StepOne;
