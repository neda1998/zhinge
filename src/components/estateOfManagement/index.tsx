import { estats } from "../../utils/data";


const EstateOfManagement = () => {
    return (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-14 gap-10">
            {
                estats.map(estat => (
                    <div className="shadow-lg rounded-xl py-6">
                        <div className={`${estat.bgClass} rounded-full flex justify-center items-center w-14 h-14 -translate-y-10 -translate-x-6`}>
                            <img src={estat.img} alt="estates" />
                        </div>
                        <div className="flex items-center justify-center flex-col">
                            <div className="border-dashed border-b border-b-gray-300 pb-1 mb-1 flex justify-center items-center w-full">
                                <span className="text-gray-300 text-center">{estat.text}</span>
                            </div>
                            <span className="text-black text-center font-extrabold pt-3 text-2xl">{estat.count}</span>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default EstateOfManagement
