import House from '../../../assets/images/Rectangle 49.svg'
import MenuDots from '../../../assets/images/Menu Dots Square.svg'
import MapPoint from '../../../assets/images/Map Point Favourite.svg'
import LayoutProfile from '../LayoutProfile'
import { useAppContext } from '../../../contexts/appContext'

const MyAdvertise = () => {
    const {showSidebar} = useAppContext()
    return (
        <LayoutProfile>
            <div className={`grid lg:grid-cols-3 gap-5 my-10 ${showSidebar ? "mr-16" : "mr-0"}`}>
            <div className="flex flex-col">
                    <img src={House} alt="icons" />
                    <div className="flex gap-2 mt-2 mobile:w-full flex-col ">
                        <div className="w-full ">
                            <span className="text-[17px] mobile:text-[15px] font-bold">ملک اجاره ای آپارتمانی</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="flex text-[14px] gap-1 ">
                                <img src={MapPoint} alt="" width={20} />
                                شهرک بهاران
                            </span>
                            <img src={MenuDots} alt="" width={30} />
                        </div>
                    </div>
            </div>
        </div>
        </LayoutProfile>
    )
}

export default MyAdvertise
