import TitleCommon from "./TitleCommon"

const StepThree = () => {
    return (
        <div>
            <TitleCommon text="امکانات ملک" />
            <span className="text-lg">ملک من دارای امکانات :</span>
            <div className="flex items-center justify-between my-6">
                <div className="flex items-center gap-2">
                    <input type="checkbox" />
                    <label>آسانسور</label>
                </div>
                <div className="flex items-center gap-2">
                    <input type="checkbox" />
                    <label>پارکینگ</label>
                </div>
                <div className="flex items-center gap-2">
                    <input type="checkbox" />
                    <label>انباری</label>
                </div>
                <div className="flex items-center gap-2">
                    <input type="checkbox" />
                    <label>بالکن</label>
                </div>
            </div>
            <div className="flex items-center flex-col gap-5">
                <label className="text-[14px]">ملک شما اگر از امکانات بیشتر برخوردار است، در توضیحات آن را بنویسید:</label>
                <textarea className="appearance-none w-full text-black py-3 px-4 border border-gray-300 rounded-xl focus:outline-none"></textarea>
            </div>
        </div>
    )
}

export default StepThree
