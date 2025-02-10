const GraphicalReportsCircle = () => {
    return (
        <div className="shadow-lg flex items-start justify-between rounded-xl py-4 px-5 lg:flex-nowrap flex-wrap">
            <div className="flex flex-col lg:gap-10">
                <h2 className="text-black font-extrabold lg:text-xl">گزارشات نموداری</h2>
                <div className="legend">
                    <div className="flex items-center gap-3 text-gray-600"><span className="green"></span>کل ملک های تایید شده</div>
                    <div className="flex items-center gap-3 text-gray-600"><span className="light-green"></span>کل ملک های تایید نشده</div>
                </div>
            </div>
            <div className="circular-chart">
                <svg viewBox="0 0 36 36" className="donut">
                    <circle className="donut-ring" cx="18" cy="18" r="15.9155"></circle>
                    <circle className="donut-segment" cx="18" cy="18" r="15.9155" style={{ strokeDasharray: 50 }}></circle>
                </svg>
            </div>
        </div>
    )
}

export default GraphicalReportsCircle
