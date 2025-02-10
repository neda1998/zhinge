import admin from "../../../assets/images/admin.png"
import { itemsNavLeft } from "../../../utils/data";
import { useState } from "react";
import { CgMenuRightAlt } from "react-icons/cg"; 
import SidebarMobile from "../sidebar/SidebarMobile";

const TopNavbarMobile = () => {
    const [notif, setToggleNotif] = useState(false);
    const [toggleMenu,setToggleMenu] = useState(false);

    return (
        <div className="container mx-auto lg:hidden block mt-7 relative z-[9999]">
            <div className="flex items-center justify-between">
                <CgMenuRightAlt color="#11a97f" size={32} onClick={()=>setToggleMenu(!toggleMenu)} />
                    {
                        toggleMenu && <SidebarMobile />
                    }
                <div className="flex items-center gap-1">
                    <div className="flex flex-col justify-center text-center">
                        <span className="text-black font-extrabold md:text-lg text-sm">Taher Zahedi</span>
                        <span className="text-gray-500 text-xs">main admin</span>
                    </div>
                    <img src={admin} alt="admin" className='w-12 h-12 object-cover rounded-full' />
                </div>
            </div>
            <div className="flex items-center justify-between my-6">
                <div className="flex items-center gap-1">
                    <span className="text-black font-extrabold md:text-xl text-sm">داشبورد مشاور املاک ژینگه</span>
                </div>
                <div className="flex items-center justify-end gap-5">
                    {
                        itemsNavLeft.map((item, idx) => (
                            <div className="bg-secondary-color rounded-full w-7 h-7 flex justify-center items-center cursor-pointer relative" key={item.id} onClick={() => {
                                if (idx === 0) {
                                    setToggleNotif(!notif)
                                }
                            }}>
                                {
                                    idx === 0 ? (<div>
                                        <div className="absolute w-4 h-4 bg-main-color rounded-full top-0 -right-2 text-white text-[8px] flex justify-center items-center text-center">10</div>
                                        <item.icon color="#11a97f" size={20} />

                                    </div>
                                    ) : (<item.icon color="#11a97f" size={20} />)
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default TopNavbarMobile
