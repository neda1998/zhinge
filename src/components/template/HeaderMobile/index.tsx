import { useEffect, useState } from "react";
import Button from "../../ui/atoms/Button";
import { useNavigate } from "react-router-dom";
import User from '../../../assets/images/dashboardicons/User Rounded.svg'
import UserWhite from '../../../assets/images/dashboardicons/User Roundedwhite.svg'
import myads from '../../../assets/images/dashboardicons/Buildings.svg'
import myadswhite from '../../../assets/images/dashboardicons/Buildingswihte.svg'
import weight from '../../../assets/images/dashboardicons/Widget Add.svg'
import weightwhite from '../../../assets/images/dashboardicons/Widget Addwhite.svg'
import LogOut from '../../../assets/images/dashboardicons/User Minus.svg'
import ZhingeLogo from '../../../assets/images/Zhinge.svg'
import Logo from '../../../assets/images/Login.svg'
import menu from '../../../assets/images/menu.svg'
import ChangeTheme from "../../changeTheme";

const menuItems = [
    { name: 'خانه', href: '/', iconWhite: UserWhite, iconBlack: User },
    { name: 'داشبورد', href: '/dashboard', iconWhite: UserWhite, iconBlack: User },
    { name: 'آگهی های من ', href: '/dashboard/myads ', iconWhite: myadswhite, iconBlack: myads },
    { name: 'ثبت آگهی جدید', href: '/dashboard/realstate', iconWhite: weightwhite, iconBlack: weight },
    { name: 'آگهی فروش', href: '/SellHouse', iconWhite: UserWhite, iconBlack: User },
    { name: 'آگهی اجاره', href: '/RentHouse', iconWhite: UserWhite, iconBlack: User },
    { name: 'خدمات', href: '/services', iconWhite: UserWhite, iconBlack: User },
    { name: 'درخواست ملک', href: '/ContactUs', iconWhite: UserWhite, iconBlack: User },
    { name: 'خروج از حساب', href: '/logout', iconWhite: "", iconBlack: LogOut },
];

export default function HeaderMobile() {
    const [showModal, setShowModal] = useState(false);
    const [Active, setActive] = useState(false);
    const [Profile, setProfileforModal] = useState(false)
    const [NotProfile, setNotProfileforModal] = useState(false)

    const HanellModal = () => {
        if (Active) {
            setProfileforModal(true)
        } else {
            setNotProfileforModal(true)
        }
    }


    const [animationClass, setAnimationClass] = useState('');
    useEffect(() => {
        if (showModal) {
            setShowModal(true);
            setTimeout(() => {
                setAnimationClass('modal-enter-menu')
            }, 1000);
        } else {
            setAnimationClass('modal-enter-menu');
            const timer = setTimeout(() => setShowModal(false), 20);
            return () => clearTimeout(timer);
        }
    }, [showModal]);

    const navigate = useNavigate()

    return (
        <>

            <div className="w-[95%] rounded-[100px] z-10 lg:hidden absolute mt-2 bg-white flex  h-[54px]  justify-between  border-[1px] border-primary-border">
                <div onClick={HanellModal} className="flex sm:w-[25%] w-[17%] justify-center cursor-pointer sm:mr-2 items-center mr-0">
                    <img src={menu} alt="icons" width={25} />
                </div>
                <div className="flex items-center justify-center sm:w-[45%] w-[25%] ">
                    <img src={ZhingeLogo} alt="icons" width={80} />
                </div>
                <div className="flex items-center sm:gap-3 gap-2">
                    <ChangeTheme />
                    <div className="flex justify-center ml-2 items-center">
                        <Button onClick={() => navigate('/SignUp')} borderradius={'100px'} bgcolor={"#09A380"} height={'35px'} color='white' returnbtn={"true"} className={'flex items-center justify-center'}>
                            <img src={Logo} alt="logo" />
                            <span className=" text-[10px] font-bold ">
                                ورود  حساب
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
            {Profile ? (
                <>
                    <>

                        <div
                            onClick={() => setProfileforModal(false)}
                            className={`h-full  items-center mobile:flex tablet:flex hidden  overflow-auto fixed inset-0 z-[999]   outline-none focus:outline-none `}>
                            <div className={`w-[55%] bg-white  overflow-auto tablet:w-[30%] tablet:overflow-auto  h-full  relative  ${animationClass}`}>
                                <div className="w-full flex flex-col justify-center items-center  h-20  rounded-[30px]">
                                    <img alt="icon" src={ZhingeLogo} />
                                </div>
                                <div className="w-full flex flex-col items-center rounded-[30px] ">
                                    <ul className="w-full h-full  flex flex-col items-center rounded-[30px] ">
                                        {menuItems.map((item) => (
                                            <li
                                                key={item.name}
                                                className={`flex w-full gap-2 cursor-pointer items-center  justify-start transition-transform   duration-300 p-5 `}
                                                onClick={() => navigate(item.href)}
                                            >

                                                <img src={item.iconWhite} alt="icon" />

                                                <span onClick={() => setShowModal(false)} className="text-[14px] font-medium">{item.name}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                            </div>

                        </div>

                    </>
                </>
            ) : NotProfile && (<>
                <div
                    onClick={() => setNotProfileforModal(false)}
                    className={`h-full items-center flex overflow-x-hidden   overflow-y-auto fixed inset-0 z-[999]   transition-all duration-500  outline-none focus:outline-none `}>
                    <div className={`w-[55%] bg-white tablet:w-[30%] tablet:overflow-auto  h-full overflow-auto relative  ${animationClass}`}>
                        <div className="w-full flex items-center h-24 justify-between">
                            <div className="w-full mt-1 flex justify-center items-center">
                                <img src={ZhingeLogo} alt="icons" />
                            </div>

                        </div>

                        <div className="w-full flex flex-col items-center rounded-[30px] ">
                            <ul className="w-full h-full  flex flex-col items-center rounded-[30px] ">
                                {menuItems.map((item) => (
                                    <li
                                        key={item.name}
                                        className={`flex w-full gap-2 cursor-pointer items-center  justify-start transition-transform    duration-300 p-5 `}
                                        onClick={() => navigate(item.href)}
                                    >
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm shadow-[#09A38080] bg-[#09A380]">
                                            <img src={item.iconBlack} alt="icon" />
                                        </div>

                                        <span onClick={() => setShowModal(false)} className="text-[14px] font-medium">{item.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>

                </div>
            </>)
            }
        </>
    );
}
