import ComboBox from "../common/Combo"
import InputState from "../ui/atoms/input/inputState"
import TitleCommon from "./TitleCommon"

const StepOne = () => {
    return (
        <div className="grid lg:grid-cols-4 grid-cols-1 lg:gap-x-5 lg:gap-y-10 gap-y-4 w-full">
            <TitleCommon text="مشخصات منظقه ایی ملک" />
            <ComboBox label="استان" options={["کردستان", "تهران", "ارومیه"]} />
            <ComboBox label="شهرستان" options={["کردستان", "تهران", "ارومیه"]} />
            <ComboBox label="منطقه" options={["کردستان", "تهران", "ارومیه"]} />
            <ComboBox label="نوع ملک" options={["کردستان", "تهران", "ارومیه"]} />
            <ComboBox label="نوع کاربری" options={["کردستان", "تهران", "ارومیه"]} />
            <ComboBox label="نوع مالکیت" options={["کردستان", "تهران", "ارومیه"]} />
            <ComboBox label="موقعیت ملک" options={["کردستان", "تهران", "ارومیه"]} />
            <InputState label="آدرس" placeholder="آدرس ملک"/>
        </div>
    )
}

export default StepOne
