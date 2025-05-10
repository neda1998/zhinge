import { Link, useLocation } from "react-router-dom"
import { newStates } from "../../../utils/data"

const ChooseItemsOfState = () => {
    const location = useLocation();
    return (
        <div className="grid lg:grid-cols-4 grid-cols-2 items-center lg:gap-10 gap-5 justify-center mx-auto mb-14">
            {
                newStates.map(item => {
                    const isActive = location.pathname === item.path;
                    return (
                         <Link key={item.id} to={item.path}>
                            <div
                                className={
                                    `flex items-center justify-center flex-col gap-3 transition-all duration-300 cursor-pointer
                                    ${isActive
                                        ? "bg-gradient-to-b from-[#09A380] to-green-700 shadow-xl scale-105 text-white"
                                        : "bg-white hover:bg-gradient-to-b hover:from-[#09A380]/10 hover:to-green-100 shadow-md text-gray-700 hover:scale-105"
                                    }
                                    rounded-2xl p-6`
                                }
                                style={{
                                    boxShadow: isActive
                                        ? "0 8px 32px 0 rgba(9,163,128,0.25)"
                                        : "0 4px 12px 0 rgba(0,0,0,0.10)"
                                }}
                            >
                                <div className={`rounded-lg p-5 transition-all duration-300
                                    ${isActive ? "bg-white bg-opacity-20" : "bg-white"}
                                `}>
                                    <img
                                        src={item.img}
                                        alt="state"
                                        className={`w-12 h-12 object-contain transition-all duration-300
                                            ${isActive ? "filter brightness-150 drop-shadow-lg" : ""}
                                        `}
                                    />
                                </div>
                                <span className={`text-center lg:text-base text-[15px] font-semibold transition-all duration-300
                                    ${isActive ? "text-white drop-shadow" : "text-gray-700"}
                                `}>
                                    {item.text}
                                </span>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default ChooseItemsOfState
