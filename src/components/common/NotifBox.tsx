import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";

const NotifBox = () => {
    return (
        <div className='absolute lg:top-24 top-32 lg:left-14 left-4 bg-white p-4 rounded-xl w-80' style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <IoMdNotificationsOutline size={24} />
                    <span className="text-black font-extrabold text-lg">اعلانات</span>
                </div>
                <Link to="" className="text-main-color text-sm">مشاهده لیست درخواست ها</Link>
            </div>
        </div>
    )
}

export default NotifBox
