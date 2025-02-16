import { useFormik } from 'formik'
import Ellipse from '../../assets/images/Ellipse 384.svg'
import LayoutProfile from "../../components/profile/LayoutProfile"
import useUpdateUserMutatioin from '../../hooks/mutation/userPanel/useUpdateUserMutatioin'

const Dashboard = () => {
    const {mutate} = useUpdateUserMutatioin()
    const formik = useFormik({
        initialValues: {full_name: '', password: '', phone: ''},
        onSubmit: (values) => {
            mutate(values as any)
        }
    })
    return (
        <LayoutProfile>
            <div className="w-full h-screen  p-14 mobile:p-4 mobile:mt-20">
                <div className="w-[50%] mobile:w-full flex gap-5 items-center">
                    <img src={Ellipse} alt="icons" />
                    <span className="text-[28px]">اطلاعات حساب</span>
                </div>
                <div className="w-[50%] mobile:w-full mt-10 h-[90%]">
                    <form onSubmit={formik.handleSubmit} className="w-[500px] mobile:w-full p-14 mobile:p-7 mobile:gap-10 shadow-[0px_0px_20px_1px_rgba(0,0,0,0.3)] bg-white mt-2 gap-5 rounded-[20px] flex flex-col">
                        <div className="flex flex-col gap-4">
                            <span className="text-[#1E1E1E66] text-[18px]">نام و نام خانوادگی </span>
                            <input type="text" name="full_name" onChange={formik.handleChange} value={formik.values.full_name} className="h-[60px] rounded-[100px] border bg-[#D9D9D940] p-5" />
                        </div>
                        <div className="flex flex-col gap-4">
                            <span className="text-[#1E1E1E66] text-[18px]">رمز عبور</span>
                            <input type="password" name="password" onChange={formik.handleChange} value={formik.values.password} className="h-[60px]  rounded-[100px] border bg-[#D9D9D940] p-5" />
                        </div>
                        <div className="flex flex-col gap-4">
                            <span className="text-[#1E1E1E66] text-[18px]">شماره موبایل</span>
                            <input type="text" name="phone" onChange={formik.handleChange} value={formik.values.phone} className="h-[60px]  rounded-[100px] border bg-[#D9D9D940] p-5" />
                        </div>
                        <div className="w-full mt-4">
                            <button type='submit' className="text-white w-full h-[60px]  rounded-[100px] bg-gradient-to-r from-[#4CFCD4] bg-[#09A380B2]">ثبت تغییرات </button>
                        </div>
                    </form>
                </div>
            </div>
        </LayoutProfile>
    )
}
export default Dashboard