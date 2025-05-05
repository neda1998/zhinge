import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/images/Zhinge.svg";
import { itemsSidebar } from "../../../utils/data";

interface SidebarMobileProps {
    show: boolean;
    onClose: () => void;
}

const SidebarMobile: React.FC<SidebarMobileProps> = ({ show, onClose }) => {
    const sidebarRef = useRef<HTMLDivElement | null>(null);
    const location = useLocation();

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };
        if (show) {
            document.addEventListener("keydown", handleEsc);
        }
        return () => {
            document.removeEventListener("keydown", handleEsc);
        };
    }, [show, onClose]);

    if (!show) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-[99998] bg-black bg-opacity-40 sm:hidden block"
                onClick={onClose}
            />
            {/* Sidebar */}
            <nav
                ref={sidebarRef}
                className={`fixed top-0 right-0 sm:w-[25%] w-[65%] max-w-xs bg-white min-h-screen overflow-auto z-[99999] border-l border-l-gray-200 shadow-2xl pr-5 transition-transform duration-500 sm:hidden block
                ${show ? "translate-x-0" : "translate-x-full"}
                `}
                style={{ transform: show ? "translateX(0)" : "translateX(100%)" }}
            >
                <div className="sidebar-content">
                    <Link to="/" className="flex items-center justify-center">
                        <img src={logo} alt="logo" className="mt-14 mb-9" />
                    </Link>
                    <ul className="relative">
                        {itemsSidebar.map((item) => (
                            <div className="relative" key={item.id}>
                                <Link
                                    to={item.path ? item.path : "#"}
                                    className="relative"
                                    onClick={onClose}
                                >
                                    <li
                                        className={`sidebar-item ${location.pathname === item.path
                                            ? "bg-gradient-to-l from-secondary-color to-green-100 before:absolute before:bg-main-color before:right-0 before:w-1 before:h-[54px] before:rounded-full before:top-0"
                                            : "bg-transparent"
                                            }`}
                                    >
                                        <div className="sidebar-brand">
                                            <item.icon
                                                className={`${location.pathname === item.path ? "text-main-color" : "text-gray-600"}`}
                                            />
                                            <p className="text-brand">{item.item}</p>
                                        </div>
                                    </li>
                                </Link>
                            </div>
                        ))}
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default SidebarMobile;
