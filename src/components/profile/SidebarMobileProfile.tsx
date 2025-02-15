import { Link } from "react-router-dom";
import logo from "../../assets/images/Zhinge.svg";
import React, { useEffect, useRef, useState } from "react";
import { itemsProfile } from "../../utils/data";
import { Button, Modal } from "flowbite-react";

const SidebarMobileProfile = () => {
    const [selectedItem, setSelectedItem] = useState<number | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [animationClass, setAnimationClass] = useState('');
    const sidebarRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                setAnimationClass('modal-exit-menu');
                setTimeout(() => {
                    setOpenModal(false)
                }, 500);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    useEffect(() => {
        if (openModal) {
            setAnimationClass('modal-enter-menu');
        } else {
            setAnimationClass('');
        }
    }, [openModal]);

    const handleItemClick = (itemId: number, hasModal: boolean = false) => {
        setSelectedItem(itemId);
        if (hasModal) {
            setOpenModal(true);
        }
    };
    return (
        <div
            ref={sidebarRef}
            className={`sm:w-[25%] w-[40%] bg-white min-h-screen overflow-auto fixed inset-0 z-[999] top-0 border-l border-l-gray-200 shadow-2xl pr-5 transition-all modal-exit-menu duration-500 ${animationClass} ${openModal ? 'flex' : 'flex-none'}`}>
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
