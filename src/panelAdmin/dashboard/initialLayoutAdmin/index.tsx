import React, { useState } from "react";
import Sidebar from "../sidebar";
import TopNavbar from "../topNavbar";
import { useAppContext } from "../../../contexts/appContext";
import TopNavbarMobile from "../topNavbar/TopNavbarMobile";
import SidebarMobile from "../sidebar/SidebarMobile";

interface Props {
  children?: React.ReactNode;
}

const InitialLayout = ({ children }: Props) => {
  const { showSidebar } = useAppContext();
  const [isSubmenu, setIsSubmenu] = useState(false); 

  return (
    <div className={`wrapper always-light overflow-x-hidden ${isSubmenu ? "grid grid-cols-2" : "flex items-stretch"}`}>
      <Sidebar />
      <SidebarMobile show={showSidebar} onClose={() => {}} />
      <div className={`col-span-2 panelAdmin always-light main w-full md:overflow-x-hidden ${showSidebar ? "-mr-[15rem]" : "mr-0"}`}>
        <TopNavbar />
        <TopNavbarMobile />
        <main className="container sm:mx-auto panelAdmin always-light">
          {children}
        </main>
      </div>
    </div>
  );
};

export default InitialLayout;
