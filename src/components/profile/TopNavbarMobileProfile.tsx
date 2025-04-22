import admin from "../../assets/images/avatar-person.svg";
import { useState } from "react";
import { CgMenuRightAlt } from "react-icons/cg";
import SidebarMobileProfile from "./SidebarMobileProfile";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

const TopNavbarMobileProfile = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    const [cookies, setCookies] = useCookies(["accessToken", "refreshToken", "name"]);
    const displayName = cookies.name || "";
    return (
        <div className="lg:hidden block py-2 lg:px-0 px-5 shadow-xl relative z-10 bg-white">
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                    <CgMenuRightAlt color="11a97f" size={32} onClick={() => setToggleMenu(true)} />
                    {
                        toggleMenu && <SidebarMobileProfile onClose={() => setToggleMenu(false)} />
                    }
                    <div className="flex items-center justify-between my-6">
                        <div className="flex items-center gap-1">
                            <span className="text-black dark:text-white font-extrabold md:text-xl text-sm">داشبورد مشاور املاک ژینگه</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-end gap-4">
                    <div className="flex flex-col justify-center text-center">
                        {
                            cookies.accessToken ? (
                                <span className="font-extrabold md:text-lg text-sm">
                                    {displayName ? displayName : "خروج"}
                                </span>
                            ) : (
                                <Link to="/Login" className="font-extrabold md:text-lg text-sm">ورود به حساب</Link>
                            )}
                    </div>
                    <img src={admin} alt="admin" className='w-12 h-12 object-cover rounded-full' />
                </div>
            </div>
        </div>
    )
}

export default TopNavbarMobileProfile
