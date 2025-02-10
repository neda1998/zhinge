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
    <div className={`wrapper ${isSubmenu ? "grid grid-cols-3" : "flex items-stretch"}`}>
      <Sidebar />
      <SidebarMobile />
      <div className={`col-span-2 main w-full md:overflow-y-hidden ${showSidebar ? "mr-0" : "mr-[16rem]"}`}>
        <TopNavbar />
        <TopNavbarMobile />
        <main className="container mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default InitialLayout;
