import { Link, useParams } from "react-router-dom";
import UploadSiteLogo from "../UploadLogoOfEstate/UploadSiteLogo";
import { AiOutlineDashboard } from "react-icons/ai";
import InitialLayout from "../../dashboard/initialLayoutAdmin";
import UploadAttach from "../UploadLogoOfEstate/UploadAttach";
import ManagementAboutUs from "../UploadLogoOfEstate/ManagementAboutUs";
import JingeTeamManagement from "../UploadLogoOfEstate/JingeTeamManagement";
import UploadLogoOfEstate from "../UploadLogoOfEstate";
import { FiChevronLeft } from "react-icons/fi";
import { useState } from "react";

interface Submenu {
    id: number;
    item: string;
    icon: React.ElementType;
    path: string;
}

const submenus: Submenu[] = [
    {
        id: 1,
        item: "آپلود لوگوی ملک ها",
        icon: AiOutlineDashboard,
        path: "/panel-admin/dashboard/manage-setting/upload-logo",
    },
    {
        id: 2,
        item: "آپلود تصویر پیوستی ملک ها",
        icon: AiOutlineDashboard,
        path: "/panel-admin/dashboard/manage-setting/upload-attach",
    },
    {
        id: 3,
        item: "آپلود لوگوی سایت",
        icon: AiOutlineDashboard,
        path: "/panel-admin/dashboard/manage-setting/upload-site-logo",
    },
    {
        id: 4,
        item: "مدیریت درباره ما",
        icon: AiOutlineDashboard,
        path: "/panel-admin/dashboard/manage-setting/management-about-us",
    },
    { id: 5, item: "مدیریت تماس با ما", icon: AiOutlineDashboard, path: "#" },
    {
        id: 6,
        item: "مدیریت تیم ژینگه",
        icon: AiOutlineDashboard,
        path: "/panel-admin/dashboard/manage-setting/jinge-team-management",
    },
    { id: 7, item: "تنظیمات عمومی", icon: AiOutlineDashboard, path: "#" },
];

const ManageSetting = () => {
    const { id } = useParams<{ id: string }>();
    const [activeItem, setActiveItem] = useState<string | null>(null);

    const handleItemClick = (path: string) => {
        setActiveItem(path)
    }
    const renderContent = () => {
        switch (id) {
            case "upload-logo":
                return <UploadLogoOfEstate />;
            case "upload-attach":
                return <UploadAttach />;
            case "upload-site-logo":
                return <UploadSiteLogo />;
            case "management-about-us":
                return <ManagementAboutUs />;
            case "jinge-team-management":
                return <JingeTeamManagement />;
            default:
                return <div>لطفاً یکی از گزینه‌ها را انتخاب کنید.</div>;
        }
    };

    return (
        <InitialLayout>
            <div className="flex items-start lg:flex-row flex-col lg:gap-9 lg:p-5 gap-3">
                {/* sidebar */}
                <div className="lg:flex lg:flex-col lg:gap-6 grid sm:grid-cols-3 grid-cols-2 gap-3 lg:min-w-[200px] lg:pl-5 lg:border-l border-l-gray-200 lg:h-screen w-full lg:w-fit">
                    {submenus.map((item) => (
                        <div className="flex items-center gap-2">
                            {activeItem === item.path && item.path !== "#" ? <FiChevronLeft color="#11a97f"/> : null}
                            <Link
                                key={item.id}
                                to={item.path}
                                className={`block p-2 text-black lg:text-lg sm:text-sm text-xs ${id === item.path.split("/").pop() ? "text-main-color" : ""
                                    }`}
                                onClick={() => handleItemClick(item.path)}
                            >
                                {item.item}
                            </Link>
                        </div>
                    ))}
                </div>
                {/* content */}
                <div className="lg:flex-1 w-full lg:w-fit">{renderContent()}</div>
            </div>
        </InitialLayout>
    );
};

export default ManageSetting;
