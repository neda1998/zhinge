import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/images/Zhinge.svg";
import { itemsSidebar } from "../../../utils/data";

const SidebarMobile = () => {
    const [selectedItem, setSelectedItem] = useState<number | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [animationClass, setAnimationClass] = useState('');
    const sidebarRef = useRef<HTMLDivElement | null>(null);
    const location = useLocation();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                setAnimationClass('modal-exit-menu');
                setTimeout(() => setShowModal(false), 500);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (showModal) {
            setAnimationClass('modal-enter-menu');
        } else {
            setAnimationClass('');
        }
    }, [showModal]);

    return (
        <nav
            ref={sidebarRef}
            className={`sm:w-[25%] w-[60%] bg-white min-h-screen overflow-auto fixed inset-0 -z-10 top-0 border-l border-l-gray-200 shadow-2xl pr-5 transition-all duration-500 ${animationClass} ${showModal ? 'opacity-100' : 'opacity-0'}`}
        >
            <div className="sidebar-content">
                <button onClick={() => setShowModal(!showModal)} className="flex items-center justify-center">
                    <img src={logo} alt="logo" className="mt-14 mb-9" />
                </button>
                <ul className="relative">
                    {itemsSidebar.map((item) => (
                        <React.Fragment key={item.id}>
                            <div className="relative">
                                <Link to={item.path ? item.path : "#"} className="relative">
                                    <li
                                        className={`sidebar-item ${selectedItem === item.id
                                            ? "bg-gradient-to-l from-secondary-color to-green-100 before:absolute before:bg-main-color before:right-0 before:w-1 before:h-[54px] before:rounded-full before:top-0"
                                            : "bg-transparent"
                                            }`}
                                    >
                                        <div className="sidebar-brand">
                                            <item.icon
                                                className={`${location.pathname === item.path ? "text-main-color" : "text-gray-600"}`}
                                            />
                                            <span className="text-brand">{item.item}</span>
                                        </div>
                                    </li>
                                </Link>
                            </div>
                        </React.Fragment>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default SidebarMobile;
