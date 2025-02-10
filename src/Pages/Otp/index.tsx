import Signup from '../../assets/images/undraw_fingerprint_login_re_t71l 1.svg'
import Header from '../../components/template/Header';
import { useState } from 'react';
import Button from '../../components/ui/atoms/Button';
import { useNavigate } from 'react-router-dom';
import OtpInput from '../../components/ui/molecules/OtpInput';

const Otp = () => {
    const [Ch, setChange] = useState()
    const navigate = useNavigate()
    return (
        <div className='w-full flex justify-center'>
            <Header variant={'main'} />
            <div className="w-full h-fit mobile:flex-col-reverse  mobile:h-fit  flex ">
                <div className='w-[50%] mobile:w-full p-4 mobile:p-0 mobile:h-[450px] h-screen flex justify-center'>
                    <div className='flex justify-center  flex-col w-[93%]'>
                        <div className='w-full  flex p-2 gap-2 items-center justify-start'>
                            <div className='w-12 h-[4px] mt-5 bg-[#09A380]'></div>
                            <span className='text-[45px] mobile:text-[30px] font-bold'>ورود به حساب <span className='text-[#09A380]'>ژینگه</span></span>
                        </div>
                        <div className='w-full h-[50%] flex flex-col justify-evenly '>
                            <div className='h-[60%] flex flex-col justify-evenly items-center'>
                                <span className='font-bold' >
                                    کد تایید برای شماره موبایل شما ارسال گردید
                                </span>
                                <OtpInput
                                    numInputs={5}
                                    onChange={(e: any) => setChange(e.target.value)}
                                />
                            </div>
                            <div className='flex flex-col items-center gap-4'>
                                <Button onClick={() => navigate('/Otp')} bgcolor={'#09A380'} width={'80%'} borderradius={'100px'} color={'white'} height={'65px'}>
                                    <span className='font-bold'>
                                        تایید
                                    </span>
                                </Button>

                            </div>

                        </div>
                    </div>

                </div>
                <div className='w-[50%] mobile:w-full mobile:h-fit mobile:mt-24 flex items-center justify-center h-screen'>

                    <img src={Signup} className='w-[80%]' alt="" />
                </div>
            </div >
        </div>
    )
}
export default Otp