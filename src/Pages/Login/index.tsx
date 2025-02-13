import Signup from '../../assets/images/undraw_fingerprint_login_re_t71l 1.svg'
import Input from '../../components/ui/atoms/input';
import Button from '../../components/ui/atoms/Button';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/template/Header';
import { useFormik } from 'formik';
import useLoginMutation from '../../hooks/mutation/auth/UseLoginMutation';

const Login = () => {
    const navigate = useNavigate();
    const {mutate} = useLoginMutation();
    const formik = useFormik({
        initialValues: {
            phone: "",
            password: ""
        },
        onSubmit: (values) => {
            mutate({
                phone: values.phone,
                password: values.password
            } as any)
        }
    })
    return (
        <div className='w-full flex justify-center'>
            <Header variant={'main'} />
            <div className="w-full h-fit mobile:h-fit mobile:flex-col-reverse flex">
                <div className='w-[50%] mobile:w-full mobile:p-0 p-4 h-screen flex mobile:h-[450px] justify-center'>
                    <div className='flex justify-center flex-col w-[93%]'>
                        <div className='w-full  flex p-2 gap-2 items-center justify-start'>
                            <div className='w-12 h-[4px] mt-5 bg-[#09A380]'></div>
                            <span className='text-[45px] mobile:text-[30px] font-bold'>ورود به حساب <span className='text-[#09A380]'>ژینگه</span></span>
                        </div>
                        <form onSubmit={formik.handleSubmit} className='w-full h-[50%] flex flex-col justify-evenly'>
                            <div className='h-[60%] flex flex-col justify-evenly items-center'>
                                <span className='font-bold' >
                                    برای دریافت کد یکبار مصرف ، شماره موبایل خود را وارد کنید
                                </span>
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
                                <Input
                                    base={'true'}
                                    width={'90%'}
                                    placeholder='پسورد'
                                    height={'65px'}
                                    borderradius={'100px'}
                                    bgcolor={'#D9D9D926'}
                                    name='password'
                                    type='password'
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                />
                            </div>
                            <div className='flex flex-col items-center gap-4'>
                                <Button type='submit' bgcolor={'#09A380'} width={'90%'} borderradius={'100px'} color={'white'} height={'65px'}>
                                    <span className='font-bold'>
                                        ورود
                                    </span>
                                </Button>

                            </div>
                        </form>
                    </div>
                </div>
                <div className='w-[50%] mobile:w-full mobile:h-fit mobile:mt-24 flex items-center justify-center h-screen'>
                    <img src={Signup} className='w-[80%]' alt="" />
                </div>
            </div >
        </div>
    )
}
export default Login