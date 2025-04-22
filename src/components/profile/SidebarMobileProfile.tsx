import { Link } from "react-router-dom";
import logo from "../../assets/images/Zhinge.svg";
import React, { useEffect, useRef, useState } from "react";
import { itemsProfile } from "../../utils/data";
import { Button, Modal } from "flowbite-react";
import axios from "axios";
import { useCookies } from "react-cookie";

interface SidebarMobileProfileProps {
    onClose: () => void;
}

const SidebarMobileProfile = ({ onClose }: SidebarMobileProfileProps) => {
    const [selectedItem, setSelectedItem] = useState<number | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [animationClass, setAnimationClass] = useState('');
    const sidebarRef = useRef<HTMLDivElement | null>(null);
    const [cookies, , removeCookie] = useCookies(["refreshToken", "accessToken"]);

    const logoutUser = async () => {
        try {
            const refreshToken = cookies.refreshToken;
            if (!refreshToken) {
                removeCookie("refreshToken", { path: "/" });
                removeCookie("accessToken", { path: "/" });
                window.location.href = "/Login";
                return;
            }
            await axios.delete("http://185.231.115.236:3000/api/V1/auth/logout", {
                data: { refreshToken },
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            });
            removeCookie("refreshToken", { path: "/" });
            removeCookie("accessToken", { path: "/" });
            window.location.href = "/Login";
        } catch (error: any) {
            removeCookie("refreshToken", { path: "/" });
            removeCookie("accessToken", { path: "/" });
            window.location.href = "/Login";
        }
    };
    const handleItemClick = (itemId: number, hasModal: boolean = false) => {
        setSelectedItem(itemId);
        if (hasModal) {
            setOpenModal(true);
        }
    };

    const handleLogout = logoutUser;

    return (
        <div
            ref={sidebarRef}
            className={`w-[60%] bg-white min-h-screen overflow-auto fixed inset-0 z-[999] top-0 border-l border-l-gray-200 shadow-2xl pr-5 transition-all duration-500 modal-enter-menu`}>
            <div className="sidebar-content">
                <Link to="/" className="flex items-center justify-center">
                    <img src={logo} alt="logo" className="mt-14 mb-9" />
                </Link>
            </div>
            <ul className="relative">
                {itemsProfile.map((item) => (
                    <React.Fragment key={item.id}>
                        <div className="relative">
                            {item.path ? (
                                <Link to={item.path ? item.path : "#"} className="relative">
                                    <li
                                        className={`sidebar-item ${selectedItem === item.id
                                            ? "bg-gradient-to-l from-secondary-color to-green-100 before:absolute before:bg-main-color before:right-0 before:w-1 before:h-[54px] before:rounded-full before:top-0"
                                            : "bg-transparent"
                                            }`}
                                    >
                                        <div className="sidebar-brand">
                                            <item.icon color="#11a97f" size={20} />
                                            <span className="text-brand">{item.item}</span>
                                        </div>
                                    </li>
                                </Link>
                            ) : (
                                <div className="relative" onClick={() => handleItemClick(item.id, true)}>
                                    <li
                                        className={`sidebar-item ${selectedItem === item.id
                                            ? "bg-gradient-to-l from-secondary-color to-green-100 before:absolute before:bg-main-color before:right-0 before:w-1 before:h-[54px] before:rounded-full before:top-0"
                                            : "bg-transparent"
                                            }`}
                                    >
                                        <div className="sidebar-brand">
                                            <item.icon color="#11a97f" size={20} />
                                            <span className="text-brand">{item.item}</span>
                                        </div>
                                    </li>
                                </div>
                            )}
                        </div>
                    </React.Fragment>
                ))}
            </ul>
            {openModal && (
                <Modal className="z-50 relative" show={openModal} onClose={() => setOpenModal(false)}>
                    <Modal.Body>
                        <div className="space-y-6">
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                {`خروج از حساب خود مطمئن هستید؟`}
                            </p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="gap-6">
                        <Button
                            onClick={handleLogout}
                            className="bg-red-200 hover:!text-white hover:!bg-red-200 relative hover:bg-gradient-to-r hover:from-bg-color-btn hover:to-bg-color-btn cursor-pointer transition-all ease-out duration-300 overflow-hidden group"
                        >
                            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease shadow"></span>
                            خروج از حساب
                        </Button>
                        <Button
                            className="hover:!text-black text-black hover:bg-white shadow"
                            color="gray"
                            onClick={() => setOpenModal(false)}
                        >
                            انصراف
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    )
}

export default SidebarMobileProfile
