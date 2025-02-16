import LayoutProfile from "../LayoutProfile"
import circle from "../../../assets/images/circle.png"
import InputState from "../../ui/atoms/input/inputState"
import { useFormik } from "formik"
import useUpdateUserMutatioin from "../../../hooks/mutation/userPanel/useUpdateUserMutatioin"

const AccountInformation = () => {
    const {mutate} = useUpdateUserMutatioin()
    const formik = useFormik({
        initialValues: {full_name: '', password: '', phone: ''},
        onSubmit: (values) => {
            mutate(values as any)
        }
    })
    return (
        <LayoutProfile>
            <div className="md:pr-10">
                <div className="flex items-center gap-2 my-10 lg:justify-start justify-center">
                    <img src={circle} alt="circle" width={20} height={20} />
                    <span className="text-xl">اطلاعات حساب</span>
                </div>
                <form onSubmit={formik.handleSubmit} className="shadow-xl rounded-xl py-12 px-6 lg:w-1/2 w-full">
                    <InputState name="full_name" onChange={formik.handleChange} value={formik.values.full_name}  label="نام و نام خانوادگی" margin="mb-4" />
                    <InputState name="password" onChange={formik.handleChange} value={formik.values.password}  label="پسورد" margin="mb-4" />
                    <InputState name="phone" onChange={formik.handleChange} value={formik.values.phone} label="شماره موبایل" margin="mb-4" />
                    <button className="bg-gradient-to-b from-[#45F0C9] to-main-color w-full rounded-full text-white mt-3 py-3">ثبت تغییرات</button>
                </form>
            </div>
        </LayoutProfile>
    )
}

export default AccountInformation
