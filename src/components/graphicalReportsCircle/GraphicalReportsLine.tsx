interface Props {

}
const GraphicalReportsLine = ({ }: Props) => {
    return (
        <div className="shadow-lg py-3 px-5 rounded-xl">
            <div className="flex flex-col mb-5">
                <span className="text-black font-extrabold lg:text-xl">آمار گزارش نموداری پرسنل های سایت</span>
                <span className="text-gray-500 font-extralight">گزارش های ثبت شده بر حسب روز</span>
            </div>
            <div className="mb-4">
                <span className="mb-1 text-sm block">خانم موسوی</span>
                <div className="progress relative w-full h-5 rounded-full bg-gray-100">
                    <div className="progress-fill fill-1 h-full rounded-full absolute top-0 right-0 w-[80%] bg-main-color"></div>
                </div>
            </div>
            <div className="mb-4">
                <span className="mb-1 text-sm block">خانم طاهر نژاد</span>
                <div className="progress relative w-full h-5 rounded-full bg-gray-100">
                    <div className="progress-fill fill-1 h-full rounded-full absolute top-0 right-0 w-[80%] bg-main-color"></div>
                </div>
            </div>
        </div>
    )
}

export default GraphicalReportsLine
