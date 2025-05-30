import UseDashboardQuery from "../../hooks/queries/admin/dashboard/UseDashboardQuery";
import user from "../../assets/images/Users-Group-Two-Rounded.png";
import close from "../../assets/images/Close-Circle.png";
import users from "../../assets/images/dashboardicons/User Rounded.svg";
import request from "../../assets/images/Chat-Square-Arrow.png";
import houreGlass from "../../assets/images/Hourglass.png";
import ChatRoundUnread from "../../assets/images/Chat-Round-Unread.png";
import trashbin from "../../assets/images/Trash-Bin.png";
import { PuffLoader } from "react-spinners";

const EstateOfManagement = () => {
    const { data, isLoading, isError } = UseDashboardQuery();
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <PuffLoader color="#09A380" />
            </div>
        );
    }

    if (isError) {
        return <div>Error occurred</div>;
    }

    const estateData = data
        && [
              { id: 1, count: data["all users"], text: "کل کاربران ما", bgClass: "bg-[#17C3A5]", img: user },
              { id: 2, count: data["in progress "], text: "در حال انجام", bgClass: "bg-[#5096F7]", img: close },
              { id: 3, count: data["all visitors"], text: "بازدیدکنندگان کل", bgClass: "bg-[#17C3A5]", img: users },
              { id: 4, count: data["daily visitors"], text: "بازدیدکنندگان روزانه", bgClass: "bg-[#EA5A92]", img: request },
              { id: 5, count: data["unchecked requests"], text: "درخواست‌های تایید نشده", bgClass: "bg-[#E95991]", img: houreGlass },
              { id: 6, count: data["all announcements"], text: "تمام اعلامیه‌ها", bgClass: "bg-[#7DBCE3]", img: ChatRoundUnread },
              { id: 7, count: data["deleted or not confirmed"], text: "ملک‌های تایید نشده", bgClass: "bg-[#FB7F35]", img: trashbin },
          ]
        ;

    return (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-14 gap-10">
            {estateData.map((estat:any) => (
                <div key={estat.id} className="shadow-lg rounded-xl py-6">
                    <div className={`${estat.bgClass} rounded-full flex justify-center items-center w-14 h-14 -translate-y-10 -translate-x-6`}>
                        <img src={estat.img} alt="estates" />
                    </div>
                    <div className="flex items-center justify-center flex-col">
                        <div className="border-dashed border-b border-b-gray-300 pb-1 mb-1 flex justify-center items-center w-full">
                            <span className="text-gray-300 text-center">{estat.text}</span>
                        </div>
                        <span className="text-black text-center font-extrabold pt-3 text-2xl">{estat.count}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EstateOfManagement;
