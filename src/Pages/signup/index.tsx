import Signup from '../../assets/images/undraw_fingerprint_login_re_t71l 1.svg'
import Header from '../../components/template/Header';
import Input from '../../components/ui/atoms/input';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { validationSchemaSignup } from '../../helpers/validation/auth';
import useSignupMutation from '../../hooks/mutation/auth/UseRegisterMutation';

const SignUp = () => {
    const { mutate } = useSignupMutation()
    const formik = useFormik({
        initialValues: {
            full_name: '',
            password: '',
            phone: ''
        },
        validationSchema: validationSchemaSignup,
        onSubmit: (values: any) => {
            console.log(values);
            mutate({
                full_name: values.full_name,
                password: values.password,
                phone: values.phone
            } as any);
        }
    });
    return (
        <div className='w-full flex justify-center'>
            <Header variant={'main'} />
            <div className="w-full h-fit mobile:h-fit flex mobile:flex-col-reverse">
                <div className='w-[50%] mobile:w-full mobile:p-0 flex justify-center'>
                    <div className='flex justify-center flex-col gap-4'>
                        <div className='w-full flex p-2 gap-2 items-center justify-start'>
                            <div className='w-12 h-[4px] bg-[#09A380]'></div>
                            <span className='text-[45px] mobile:text-[30px] font-bold'>ایجاد حساب <span className='text-[#09A380]'>ژینگه</span></span>
                        </div>
                        <div className='w-full flex flex-col justify-evenly gap-12'>
                            <form onSubmit={formik.handleSubmit} className='flex flex-col justify-around items-center gap-7'>
                                <Input
                                    base={'true'}
                                    width={'90%'}
                                    placeholder='نام و نام خانوادگی'
                                    height={'65px'}
                                    borderradius={'100px'}
                                    bgcolor={'#D9D9D926'}
                                    name='full_name'
                                    type='text'
                                    onChange={formik.handleChange}
                                    value={formik.values.full_name}
                                />
                                <Input
                                    base={'true'}
                                    width={'90%'}
                                    placeholder='رمز عبور'
                                    height={'65px'}
                                    borderradius={'100px'}
                                    bgcolor={'#D9D9D926'}
                                    name='password'
                                    type='password'
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                />
                                <Input
                                    base={'true'}
                                    width={'90%'}
                                    placeholder='شماره موبایل'
                                    height={'65px'}
                                    borderradius={'100px'}
                                    bgcolor={'#D9D9D926'}
                                    name='phone'
                                    type='text'
                                    onChange={formik.handleChange}
                                    value={formik.values.phone}
                                />
                                <button type="submit" className='bg-[#09A380]' style={{ width: '90%', height: '65px', borderRadius: '100px' }}>
                                    <span className='font-bold'>
                                        دریافت کد یکبار مصرف
                                    </span>
                                </button>
                            </form>
                            <div className='flex flex-col items-center gap-4'>
                                <span className='font-bold'>
                                    قبلا حساب ایجاد کرده ام ؟ <Link to="/Login" className='text-[#09A380]'>ورود به حساب </Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-[50%] mobile:w-full  flex items-center justify-center mobile:h-fit mobile:mt-24 h-screen'>
                    <img src={Signup} className='w-[80%]' alt="" />
                </div>
            </div>
        </div>
    )
}
export default SignUp;