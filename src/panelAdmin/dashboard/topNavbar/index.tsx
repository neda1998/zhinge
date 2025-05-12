import { IoChevronBackOutline } from "react-icons/io5";
import { useAppContext } from '../../../contexts/appContext';
import admin from "../../../assets/images/avatar-person.svg"
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';

const TopNavbar = () => {
    const { toggleSidebar, showSidebar } = useAppContext();
    const [cookies, setCookies] = useCookies(["accessToken", "refreshToken", "name"]);
    const displayName = cookies.name || "";
    return (
        <div className="shadow-md lg:block hidden relative z-[999]">
            <div className="container mx-auto">
                <nav className="grid lg:grid-cols-2 items-center justify-between md:py-8">
                    <div className="flex items-center gap-1 cursor-pointer" onClick={toggleSidebar}>
                        <IoChevronBackOutline color='#11a97f' size={20} className={`transition-all duration-500 ${showSidebar ? "-rotate-180" : ""}`} />
                        <span className="font-extrabold md:text-xl text-sm">داشبورد مشاور املاک ژینگه</span>
                    </div>
                    <div className="flex items-center justify-end gap-5">
                        <Link to="/dashboard/register-new-advertise" className="flex items-center gap-2">   
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
                        </Link>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default TopNavbar
