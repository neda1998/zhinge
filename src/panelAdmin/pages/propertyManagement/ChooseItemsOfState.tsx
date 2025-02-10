import { Link } from "react-router-dom"
import { newStates } from "../../../utils/data"

const ChooseItemsOfState = () => {
    return (
        <div className="grid lg:grid-cols-4 grid-cols-2 items-center lg:gap-10 gap-5 justify-center mx-auto mb-14">
            {
                newStates.map(item => (
                    <Link key={item.id} to={item.path}>
                        <div className="flex items-center justify-center flex-col gap-3">
                            <div className="bg-white rounded-lg p-5" style={{ boxShadow: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px" }}>
                                <img src={item.img} alt="state" />
                            </div>
                            <span className="text-black text-center lg:text-sm text-[13px]">{item.text}</span>
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}

export default ChooseItemsOfState
