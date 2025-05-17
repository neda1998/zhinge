import { useEffect, useState } from "react";
import Button from "../../ui/atoms/Button";
import { useNavigate } from "react-router-dom";
import User from '../../../assets/images/dashboardicons/User Rounded.svg'
import UserWhite from '../../../assets/images/dashboardicons/User Roundedwhite.svg'
import ZhingeLogo from '../../../assets/images/Zhinge.svg'
import menu from '../../../assets/images/menu.svg'
import ChangeTheme from "../../changeTheme";
import { useCookies } from "react-cookie";

const menuItems = [
    { name: 'خانه', href: '/', iconWhite: UserWhite, iconBlack: User },
    { name: 'آگهی فروش', href: '/Announcement-list/sell', iconWhite: UserWhite, iconBlack: User },
    { name: 'آگهی اجاره', href: '/Announcement-list/rent', iconWhite: UserWhite, iconBlack: User },
    { name: 'خدمات', href: '/services', iconWhite: UserWhite, iconBlack: User },
    { name: 'درخواست ملک', href: '/request-state', iconWhite: UserWhite, iconBlack: User },
];

export default function HeaderMobile() {
    const [cookies, setCookies, removeCookie] = useCookies(["accessToken", "refreshToken", "name", "full_name", "role"]);
    const displayName = cookies.name || "";
    const [showModal, setShowModal] = useState(false);
    const [Active, setActive] = useState(false);
    const [Profile, setProfileforModal] = useState(false)
    const [NotProfile, setNotProfileforModal] = useState(false)
    const isAdmin = cookies.role === "true" || cookies.role === true;

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
            <div className="rounded-[100px] z-10 lg:hidden fixed top-0 left-3 right-3 mt-3 bg-white flex  h-[54px]  justify-between  border-[1px] border-primary-border pl-1 pr-2">
                <div
                    onClick={() => setShowModal(true)}
                    className="flex sm:w-[25%] justify-start cursor-pointer items-center"
                >
                    <img src={menu} alt="icons" width={25} />
                </div>
                <div className="flex items-center justify-center sm:w-[45%] w-[25%] ">
                    <img src={ZhingeLogo} alt="icons" width={80} />
                </div>
                <div className="flex items-center sm:gap-3 gap-1">
                    <ChangeTheme />
                    {isAdmin && (
                        <Button
                            onClick={() => navigate('/panel-admin/dashboard/management-dashboard')}
                            borderradius={'100px'}
                            bgcolor={"#F59E42"}
                            color='white'
                            returnbtn={"true"}
                            className={'flex items-center justify-center w-[150px] h-[44px] sm:w-[120px] sm:h-[38px] mobile:w-[100px] mobile:h-[34px]'}
                        >
                            <span className="text-[13px] font-bold">
                                داشبورد ادمین
                            </span>
                        </Button>
                    )}
                    {
                        !displayName ? (
                            <Button
                                onClick={() => navigate('/Login')}
                                borderradius={'100px'}
                                bgcolor={"#09A380"}
                                color='white'
                                returnbtn={"true"}
                                className={'flex items-center justify-center w-[140px] h-[44px] sm:w-[110px] sm:h-[38px] mobile:w-[90px] mobile:h-[34px]'}
                            >
                                <span className=" text-[13px] font-bold ">
                                    ورود به حساب
                                </span>
                            </Button>
                        ) : (
                            <Button
                                onClick={() => navigate("/dashboard/register-new-advertise")}
                                borderradius={"100px"}
                                bgcolor={"#09A380"}
                                color="white"
                                returnbtn={"true"}
                                className={"flex items-center justify-center w-[140px] h-[44px] sm:w-[110px] sm:h-[38px] mobile:w-[90px] mobile:h-[34px]"}
                            >
                                <span className="text-[13px] font-bold">
                                    {displayName}
                                </span>
                            </Button>
                        )
                    }
                </div>
            </div>
            {/* منوی موبایل */}
            {showModal && (
                <div className={`fixed inset-0 z-50 bg-gray-600 bg-opacity-40 flex`}>
                    <div className={`bg-white dark:bg-gray-600 w-3/4 h-full shadow-lg p-4 ${animationClass} relative`}>
                        <button
                            className="absolute top-2 left-2 text-gray-500 text-2xl"
                            onClick={() => setShowModal(false)}
                        >
                            ×
                        </button>
                        <ul className="flex flex-col gap-4 mt-8">
                            {menuItems.map(item => (
                                <li key={item.href}>
                                    <button
                                        className="flex items-center gap-2 w-full text-right"
                                        onClick={() => {
                                            navigate(item.href);
                                            setShowModal(false);
                                        }}
                                    >
                                        <img src={item.iconBlack} alt="" width={20} />
                                        <span>{item.name}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* کلیک روی پس‌زمینه برای بستن منو */}
                    <div className="flex-1" onClick={() => setShowModal(false)} />
                </div>
            )}
        </>
    );
}
