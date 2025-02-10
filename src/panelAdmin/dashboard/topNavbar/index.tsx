import React, { useState } from 'react';
import { IoChevronBackOutline } from "react-icons/io5";
import { useAppContext } from '../../../contexts/appContext';
import admin from "../../../assets/images/admin.png"
import NotifBox from '../../../components/common/NotifBox';
import { itemsNavLeft } from '../../../utils/data';
import Search from '../../../components/common/Search';

const TopNavbar = () => {
    const { toggleSidebar, showSidebar } = useAppContext();
    const [notif, setToggleNotif] = useState(false);
    return (
        <div className="shadow-md lg:block hidden relative z-[9999]">
            <div className="container mx-auto">
                <nav className="grid lg:grid-cols-3 items-center justify-between md:py-8">
                    <div className="flex items-center gap-1 cursor-pointer" onClick={toggleSidebar}>
                            <IoChevronBackOutline color='#11a97f' size={20} className={`transition-all duration-500 ${showSidebar ? "-rotate-180" : ""}`} />
                        <span className="font-extrabold md:text-xl text-sm">داشبورد مشاور املاک ژینگه</span>
                    </div>
                    <Search className='w-full' searchClass="w-9 h-8" />
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
                        {
                            notif && (
                                <NotifBox />
                            )
                        }
                        <div className="flex items-center gap-1">
                            <div className="flex flex-col justify-center text-center">
                                <span className="font-extrabold md:text-lg text-sm">Taher Zahedi</span>
                                <span className="text-gray-500 text-xs">main admin</span>
                            </div>
                            <img src={admin} alt="admin" className='w-12 h-12 object-cover rounded-full' />
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default TopNavbar
