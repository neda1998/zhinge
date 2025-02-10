import Signup from '../../assets/images/undraw_fingerprint_login_re_t71l 1.svg'
import Header from '../../components/template/Header';
import Input from '../../components/ui/atoms/input';
import Button from '../../components/ui/atoms/Button';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate()
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
                            <div className='flex flex-col justify-around items-center gap-7'>
                                <Input
                                    base={'true'}
                                    width={'90%'}
                                    placeholder='نام'
                                    height={'65px'}
                                    borderradius={'100px'}
                                    bgcolor={'#D9D9D926'}
                                />
                                <Input
                                    base={'true'}
                                    width={'90%'}
                                    placeholder='نام خانوادگی'
                                    height={'65px'}
                                    borderradius={'100px'}
                                    bgcolor={'#D9D9D926'}
                                />
                                <Input
                                    base={'true'}
                                    width={'90%'}
                                    placeholder='شماره موبایل'
                                    height={'65px'}
                                    borderradius={'100px'}
                                    bgcolor={'#D9D9D926'}
                                />
                            </div>

                            <div className='flex flex-col items-center gap-4'>
                                <Button onClick={() => navigate('/Login')} bgcolor={'#09A380'} width={'90%'} borderradius={'100px'} color={'white'} height={'65px'}>
                                    <span className='font-bold'>
                                        دریافت کد یکبار مصرف
                                    </span>
                                </Button>
                                <span className='font-bold' >
                                    قبلا حساب ایجاد کرده ام ؟ <span className='text-[#09A380]'>ورود به حساب </span>
                                </span>
                            </div>

                        </div>
                    </div>

                </div>
                <div className='w-[50%] mobile:w-full  flex items-center justify-center mobile:h-fit mobile:mt-24 h-screen'>
                    <img src={Signup} className='w-[80%]' alt="" />
                </div>
            </div >
        </div>
    )
}
export default SignUp