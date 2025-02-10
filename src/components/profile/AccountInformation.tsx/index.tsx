import LayoutProfile from "../LayoutProfile"
import circle from "../../../assets/images/circle.png"
import InputState from "../../ui/atoms/input/inputState"

const AccountInformation = () => {
    return (
        <LayoutProfile>
            <div className="md:pr-10">
                <div className="flex items-center gap-2 my-10 lg:justify-start justify-center">
                    <img src={circle} alt="circle" width={20} height={20} />
                    <span className="text-xl">اطلاعات حساب</span>
                </div>
                <div className="shadow-xl rounded-xl py-12 px-6 lg:w-1/2 w-full">
                    <InputState label="نام و نام خانوادگی" margin="mb-4" />
                    <InputState label="شماره موبایل" margin="mb-4" />
                    <InputState label="ایمیل" margin="mb-4" />
                    <button className="bg-gradient-to-b from-[#45F0C9] to-main-color w-full rounded-full text-white mt-3 py-3">ثبت تغییرات</button>
                </div>
            </div>
        </LayoutProfile>
    )
}

export default AccountInformation
