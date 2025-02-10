import InputState from "../ui/atoms/input/inputState"
import TitleCommon from "./TitleCommon"

const StepTwo = () => {
    return (
        <div className="grid lg:grid-cols-4 grid-cols-1 w-full gap-5">
            <TitleCommon text="مشخصات ساختاری ملک" />
            <InputState label="مساحت کل زمین(متر مربع)" />
            <InputState label="مساحت زیر بنا(تر مربع)" />
            <InputState label="سال ساخت ملک" />
            <InputState label="تعداد اتاق" />
        </div>
    )
}

export default StepTwo
