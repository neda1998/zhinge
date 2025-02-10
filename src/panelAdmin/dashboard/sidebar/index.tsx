import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../../../contexts/appContext";
import logo from "../../../assets/images/Zhinge.svg";
import { itemsSidebar } from "../../../utils/data";

const Sidebar = () => {
  const { showSidebar } = useAppContext();
  const [selectedItem, setSelectedItem] = useState<number>(1);
  const location = useLocation();

  const handleItemClick = (id: number) => {
    setSelectedItem(id);
  };

  return (
    <nav className={`sidebar ${!showSidebar ? "collapsed" : ""}`}>
      <div className="sidebar-content">
        <Link to="/" className="flex items-center justify-center">
          <img src={logo} alt="logo" className="mt-14 mb-9" />
        </Link>
        <ul className="relative">
          {itemsSidebar.map((item) => (
            <li key={item.id} className="relative">
              <Link to={item.path && item.path} className="relative">
                <div
                  className={`sidebar-item ${location.pathname === item.path
                    ? "bg-gradient-to-l from-[#E9F6F3] to-[#fefefe] before:absolute before:bg-main-color before:right-0 before:w-1 before:h-[54px] before:rounded-full before:top-0 text-main-color font-extrabold"
                    : "bg-transparent text-gray-500"
                    }`}
                  onClick={() => handleItemClick(item.id)}
                >
                  <div className="sidebar-brand">
                    <item.icon
                      className={`w-6 h-6 ${location.pathname === item.path ? "text-main-color" : "text-gray-600"}`}
                    />
                    <span className="text-brand">{item.item}</span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
