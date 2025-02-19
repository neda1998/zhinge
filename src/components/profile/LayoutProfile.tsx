import { useAppContext } from "../../contexts/appContext";
import Sidebar from "./Sidebar"
import TopNavbar from "./TopNavbar";
import hide from "../../assets/images/hide.png"
import TopNavbarMobile from "./TopNavbarMobileProfile";
import SidebarMobileProfile from "./SidebarMobileProfile";

interface Props {
    children?: React.ReactNode;
}

const LayoutProfile = ({ children }: Props) => {
    const { showSidebar } = useAppContext();
    return (
        <div className="wrapper flex z-10 relative">
            <Sidebar />
            <SidebarMobileProfile />
            <div className="flex justify-end relative">
                <img src={hide} alt="hide" width={330} height={330} className={`absolute top-56 right-32 z-[9999] ${showSidebar ? "mr-0" : "mr-[16rem]"}`} />
            </div>
            <div className={`main w-full md:overflow-y-hidden ${showSidebar ? "mr-0" : "mr-[16rem]"}`}>
                <div className="flex justify-end relative">
                    <img src={hide} alt="hide" width={330} height={330} className="absolute -top-4 left-0 -z-10" />
                </div>
                <TopNavbar />
                <TopNavbarMobile />
                <main className={`container mx-auto ${showSidebar ? "pr-0" : "md:pr-10"}`}>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default LayoutProfile
