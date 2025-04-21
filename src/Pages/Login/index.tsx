import Signup from '../../assets/images/undraw_fingerprint_login_re_t71l 1.svg';
import Input from '../../components/ui/atoms/input';
import Button from '../../components/ui/atoms/Button';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import useLoginMutation from '../../hooks/mutation/auth/UseLoginMutation';
import useSendForgetPassMutation from '../../hooks/mutation/auth/useSendForgetPassMutation';

const Login = () => {
  const { mutate: loginMutate } = useLoginMutation();
  const { mutate: sendForgetPass } = useSendForgetPassMutation();

  const loginFormik = useFormik({
    initialValues: { phone: "", password: "" },
    onSubmit: (values) => {
      loginMutate({ phone: values.phone, password: values.password });
    },
  });

  const handleForgetPass = () => {
    if (!loginFormik.values.phone.trim()) {
      alert("لطفا شماره تلفن را وارد کنید.");
      return;
    }
    sendForgetPass({ phone: loginFormik.values.phone });
  };

  return (
    <div className='w-full flex justify-center'>
      <div className="w-full h-fit mobile:h-fit mobile:flex-col-reverse flex">
        <div className='w-[50%] mobile:w-full mobile:p-0 p-4 h-screen flex mobile:h-[450px] justify-center'>
          <div className='flex justify-center flex-col w-[93%]'>
            <div className='w-full flex p-2 gap-2 items-center justify-start'>
              <div className='w-12 h-[4px] mt-5 bg-[#09A380]'></div>
              <span className='text-[45px] mobile:text-[30px] font-bold'>
                ورود به حساب <span className='text-[#09A380]'>ژینگه</span>
              </span>
            </div>
              <>
                <form onSubmit={loginFormik.handleSubmit} className='w-full h-[50%] flex flex-col justify-evenly'>
                  <div className='h-[60%] flex flex-col justify-evenly items-center gap-5'>
                    <Input
                      base={'true'}
                      width={'90%'}
                      placeholder='شماره موبایل'
                      height={'65px'}
                      borderradius={'100px'}
                      bgcolor={'#D9D9D926'}
                      name='phone'
                      type='tel'
                      onChange={loginFormik.handleChange}
                      value={loginFormik.values.phone}
                    />
                    <Input
                      base={'true'}
                      width={'90%'}
                      placeholder='پسورد'
                      height={'65px'}
                      borderradius={'100px'}
                      bgcolor={'#D9D9D926'}
                      name='password'
                      type='password'
                      onChange={loginFormik.handleChange}
                      value={loginFormik.values.password}
                    />
                  </div>
                  <div className='flex flex-col items-center gap-4 mt-5'>
                    <Button type='submit' bgcolor={'#09A380'} width={'90%'} borderradius={'100px'} color={'white'} height={'65px'}>
                      <span className='font-bold'>ورود</span>
                    </Button>
                  </div>
                </form>
                <div className='flex flex-col items-center gap-4 mt-4'>
                  <span className='font-bold'>
                    قبلا حساب ایجاد نکرده اید ؟ 
                    <Link to="/SignUp" className='text-[#09A380] mr-3'>ثبت نام</Link>
                  </span>
                  <span 
                    onClick={handleForgetPass} 
                    className='text-[#09A380] cursor-pointer'
                  >
                    رمز عبور خود را فراموش کرده اید؟
                  </span>
                </div>
              </>
          </div>
        </div>
        <div className='w-[50%] mobile:w-full mobile:h-fit mobile:mt-24 flex items-center justify-center h-screen'>
          <img src={Signup} className='w-[80%]' alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;