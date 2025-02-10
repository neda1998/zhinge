import ComboBox from "../common/Combo"
import InputState from "../ui/atoms/input/inputState"
import TitleCommon from "./TitleCommon"

const StepFour = () => {
    return (
        <div className="grid lg:grid-cols-4 grid-cols-1 lg:gap-x-5 lg:gap-y-10 gap-y-4 w-full">
            <TitleCommon text="مشخصات ملک" />
            <InputState label="نام مالک" />
            <InputState label="شماره همراه" />
            <ComboBox label="درخواست تور مجازی" options={["کردستان", "تهران", "ارومیه"]} />
            <InputState label="آدرس تور مجازی(url)" />
            <InputState label="قیمت فروش" />
            <InputState label="پست الکترونیک" />
            <ComboBox label="نوع معامله" options={["کردستان", "تهران", "ارومیه"]} />
            <ComboBox label="وضعیت وام ملک" options={["کردستان", "تهران", "ارومیه"]} />
        </div>
    )
}

export default StepFour
