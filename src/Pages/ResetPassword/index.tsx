import SignupImg from '../../assets/images/undraw_fingerprint_login_re_t71l 1.svg'
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import Input from '../../components/ui/atoms/input';
import Button from '../../components/ui/atoms/Button';
import useResetPasswordMutation from "../../hooks/mutation/auth/useResetPasswordMutation";

const ResetPassword = () => {
  const { state } = useLocation();
  const phone = state?.phone || "";
  const { mutate: resetPass } = useResetPasswordMutation();

  const formik = useFormik({
    initialValues: { code: "", password: "" },
    onSubmit: (values) => {
      resetPass({
        phone,
        code: parseInt(values.code, 10),
        password: values.password,
      });
    },
  });

  return (
    <div className='w-full flex justify-center'>
      <div className="w-full h-fit mobile:h-fit flex mobile:flex-col-reverse">
        <div className='w-full mobile:p-0 flex justify-center'>
          <div className='flex justify-center flex-col gap-4'>
            <div className='w-full flex p-2 gap-2 items-center justify-start'>
              <div className='w-12 h-[4px] bg-[#09A380]'></div>
              <span className='text-[45px] mobile:text-[30px] font-bold'>
                تغییر رمز عبور <span className='text-[#09A380]'>ژینگه</span>
              </span>
            </div>
            <div className='w-full flex flex-col justify-evenly gap-12'>
              <form onSubmit={formik.handleSubmit} className='flex flex-col justify-around items-center gap-7'>
                <Input
                  base={'true'}
                  width={'90%'}
                  placeholder="کد تایید"
                  height={'65px'}
                  borderradius={'100px'}
                  bgcolor={'#D9D9D926'}
                  name="code"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.code}
                />
                <Input
                  base={'true'}
                  width={'90%'}
                  placeholder="رمز عبور جدید"
                  height={'65px'}
                  borderradius={'100px'}
                  bgcolor={'#D9D9D926'}
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                <Button
                  type="submit"
                  bgcolor={'#09A380'}
                  width={'90%'}
                  borderradius={'100px'}
                  color={'white'}
                  height={'65px'}
                >
                  <span className="font-bold">تغییر رمز عبور</span>
                </Button>
              </form>
            </div>
          </div>
        </div>
        <div className='w-full flex items-center justify-center mobile:h-fit mobile:mt-24 h-screen'>
          <img src={SignupImg} className='w-[80%]' alt="" />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;