import { useEffect, useState } from "react";
import Button from "../../ui/atoms/Button";
import { useNavigate, useLocation } from "react-router-dom";
import User from '../../../assets/images/dashboardicons/User Rounded.svg'
import UserWhite from '../../../assets/images/dashboardicons/User Roundedwhite.svg'
import ZhingeLogo from '../../../assets/images/Zhinge.svg'
import menu from '../../../assets/images/menu.svg'
import ChangeTheme from "../../changeTheme";
import { useCookies } from "react-cookie";

const menuItems = [
    { name: 'خانه', href: '/', iconWhite: UserWhite, iconBlack: User },
    { name: 'آگهی ها', href: '/Announcement-list', iconWhite: UserWhite, iconBlack: User },
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
    const location = useLocation()

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
            {showModal && (
                <div className="fixed inset-0 z-50 bg-[#4e4e4e94] dark:bg-[#323436a8] bg-opacity-40 flex transition-all duration-300">
                    <div className={`bg-gray-900 w-4/5 max-w-xs h-full shadow-2xl p-6 flex flex-col relative animate-slide-in-right`}>
                        <button
                            className="absolute top-3 left-3 text-gray-400 hover:text-red-500 text-3xl transition"
                            onClick={() => setShowModal(false)}
                            aria-label="بستن"
                        >
                            <svg width="28" height="28" viewBox="0 0 20 20" fill="none">
                                <path d="M6 6L14 14M14 6L6 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </button>
                        <div className="flex items-center justify-center mb-8 mt-2">
                            <img src={ZhingeLogo} alt="logo" width={90} />
                        </div>
                        <ul className="flex flex-col gap-3">
                            {menuItems.map(item => (
                                <li key={item.href}>
                                    <button
                                        className={`
                                            flex items-center gap-3 w-full px-4 py-3 rounded-lg transition
                                            text-right hover:bg-main-color/10 dark:hover:bg-main-color/20
                                            hover:text-main-color dark:hover:text-main-color
                                            font-medium
                                            ${location.pathname === item.href ? "bg-main-color/10 text-main-color dark:bg-main-color/20 dark:text-main-color" : ""}
                                        `}
                                        onClick={() => {
                                            navigate(item.href);
                                            setShowModal(false);
                                        }}
                                    >
                                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800">
                                            <img src={item.iconBlack} alt="" width={22} />
                                        </span>
                                        <span className="text-base dark:text-white">{item.name}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex-1" onClick={() => setShowModal(false)} />
                </div>
            )}
            <style>{`
                @keyframes slide-in-right {
                    0% { transform: translateX(100%);}
                    100% { transform: translateX(0);}
                }
                .animate-slide-in-right {
                    animation: slide-in-right 0.3s cubic-bezier(0.4,0,0.2,1);
                }
            `}</style>
        </>
    );
}
