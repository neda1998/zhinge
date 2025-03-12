import admin from "../../assets/images/admin.png"
import { useState } from "react";
import { CgMenuRightAlt } from "react-icons/cg";
import SidebarMobileProfile from "./SidebarMobileProfile";

const TopNavbarMobileProfile = () => {
    const [toggleMenu, setToggleMenu] = useState(false);

    return (
        <div className="lg:hidden block py-2 lg:px-0 px-5 shadow-xl relative z-10 bg-white">
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                    <CgMenuRightAlt color="11a97f" size={32} onClick={() => setToggleMenu(!toggleMenu)} />
                    {
                        toggleMenu && <SidebarMobileProfile />
                    }
                    <div className="flex items-center justify-between my-6">
                        <div className="flex items-center gap-1">
                            <span className="text-black font-extrabold md:text-xl text-sm">داشبورد مشاور املاک ژینگه</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <div className="flex flex-col justify-center text-center">
                        <span className="text-black font-extrabold md:text-lg text-sm">Taher Zahedi</span>
                        <span className="text-gray-500 text-xs">main admin</span>
                    </div>
                    <img src={admin} alt="admin" className='w-12 h-12 object-cover rounded-full' />
                </div>
            </div>
        </div>
    )
}

export default TopNavbarMobileProfile
