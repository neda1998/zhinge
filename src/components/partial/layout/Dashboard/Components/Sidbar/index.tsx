import React from "react"
import primisson from '../../../../../../assets/images/Frame 2.svg'
import { Link, useLocation } from "react-router-dom"
import Button from "../../../../../ui/atoms/Button"
import User from '../../../../../../assets/images/dashboardicons/User Rounded.svg'
import UserWhite from '../../../../../../assets/images/dashboardicons/User Roundedwhite.svg'
import myads from '../../../../../../assets/images/dashboardicons/Buildings.svg'
import myadswhite from '../../../../../../assets/images/dashboardicons/Buildingswihte.svg'
import weight from '../../../../../../assets/images/dashboardicons/Widget Add.svg'
import weightwhite from '../../../../../../assets/images/dashboardicons/Widget Addwhite.svg'
import LogOut from '../../../../../../assets/images/dashboardicons/User Minus.svg'
const urlSplit = (path: string): string => {
    const splitUrl = path.split("/dashboard/");
    const newText = splitUrl[1];
    return newText;
};

const menuItems = [
    { name: 'داشبورد', href: '/dashboard', iconWhite: UserWhite, iconBlack: User },
    { name: 'آگهی های من ', href: '/dashboard/myads', iconWhite: myadswhite, iconBlack: myads },
    { name: 'ثبت آگهی جدید', href: '/dashboard/realState', iconWhite: weightwhite, iconBlack: weight },
    { name: 'خروج از حساب', href: '/dashboard/logout', iconWhite: "", iconBlack: LogOut },
];
export default function Sidbars() {
    const { pathname } = useLocation();

    return (
        <>
            <div className=" max-w-[252px] h-[762px] mobile:hidden tablet:hidden  border-l-[1px] 0 min-w-[252px]">
                <div className="w-full flex flex-col  h-[75.8%] items-center  rounded-[30px] ">
                    <ul className="w-full h-full p-6 flex flex-col items-center rounded-[30px] justify-around">
                        {menuItems.map((item) => (
                            <Link to={item.href} className="w-full h-full">
                                <li
                                    key={item.name}
                                    className={`flex w-full gap-2 cursor-pointer items-center justify-start transition-transform duration-300 p-5 ${urlSplit(pathname) === urlSplit(item.href) ? 'text-[#09A380]' : 'bg-white'}`}
                                >
                                    {urlSplit(pathname) === urlSplit(item.href) ? (<>
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-xl shadow-[#09A38080] bg-[#09A380]">
                                            <img src={item.iconWhite} alt="icon" />
                                        </div>

                                    </>) : (<>
                                        <img src={item.iconBlack} alt="icon" />

                                    </>)}
                                    <span className="text-[16px] font-bold">{item.name}</span>
                                </li>
                            </Link>
                        ))}
                    </ul>

                </div>
                <div className="shadow-2xl -z-10 bg-[#09A3804D]  w-72 h-72 rounded-full  absolute blur-xl opacity-90">1</div>
            </div>
        </>
    );
}
