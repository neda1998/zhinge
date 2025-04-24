import admin from "../../../assets/images/avatar-person.svg"
import { useState } from "react";
import { CgMenuRightAlt } from "react-icons/cg";
import SidebarMobile from "../sidebar/SidebarMobile";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

const TopNavbarMobile = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    const [cookies, setCookies] = useCookies(["accessToken", "refreshToken", "name"]);
    const displayName = cookies.name || "";
    const handleCloseMenu = () => setToggleMenu(false);

    return (
        <div className=" lg:hidden m-7 mb-0 relative z-[9999] flex items-center justify-between">
            <div className="flex items-center justify-between gap-2">
                <CgMenuRightAlt color="#11a97f" size={32} onClick={() => setToggleMenu(true)} />
                {
                    toggleMenu && (
                        <SidebarMobile show={toggleMenu} onClose={handleCloseMenu} />
                    )
                }
                <div className="flex items-center gap-1">
                    <span className="text-black font-extrabold md:text-xl text-sm">داشبورد مشاور املاک ژینگه</span>
                </div>
            </div>
            <div className="flex items-center justify-between my-6">
                <div className="flex items-center justify-end gap-5">
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

export default TopNavbarMobile
