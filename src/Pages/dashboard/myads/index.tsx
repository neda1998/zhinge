import House from '../../../assets/images/Rectangle49.svg';
import MapPoint from '../../../assets/images/MapPointFavourite.svg';
import LayoutProfile from "../../../components/profile/LayoutProfile";
import UseMyAnnouncementsQuery from "../../../hooks/queries/userPanel/UseMyAnnouncementsQuery";

const MyAds = () => {
    const { isLoading, data } = UseMyAnnouncementsQuery();
    return (
        <LayoutProfile>
            <div className="w-full mt-4 mobile:mt-8 grid grid-cols-3 gap-4 h-fit place-items-center ">
                {
                    !isLoading && data?.map((item:any) => (
                        <div key={item.id} className="col-span-1 mobile:col-span-3 flex flex-col justify-start items-center w-[80%] sm:min-h-[400px] max-h-fit my-10">
                            <div className="w-full h-full ">
                                <img src={House} alt="icons" width={350} />
                                <div className="w-[89%] flex gap-2 mt-2 flex-col ">
                                    <div className="w-full ">
                                        <span className="text-[17px] font-bold">ملک اجاره ای آپارتمانی</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="flex text-[14px] gap-1 ">
                                            <img src={MapPoint} alt="" width={20} />
                                            شهرک بهاران
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </LayoutProfile>
    );
}

export default MyAds;