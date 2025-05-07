import InputState from "../ui/atoms/input/inputState"

interface StepTwoProps {
    loan?: number; setLoan: (v: number) => void;
    year_of_build?: number; setYearOfBuild: (v: number) => void;
    room_number?: number; setRoomNumber: (v: number) => void;
    floor_number?: number; setFloorNumber: (v: number) => void;
    floor?: number; setFloor: (v: number) => void;
}

const StepTwo = ({
    loan, setLoan,
    year_of_build, setYearOfBuild,
    room_number, setRoomNumber,
    floor_number, setFloorNumber,
    floor, setFloor
}: StepTwoProps) => {

    return (
        <div className="grid lg:grid-cols-4 grid-cols-1 w-full gap-5">
            <div className="flex flex-col items-start">
                <InputState
                    label="وام"
                    value={loan !== undefined && loan !== null ? String(loan) : ""}
                    onChange={(e) => setLoan(Number(e.target.value.replace(/,/g, "")))}
                />
            <span className="text-xs text-red-600 my-1">اگر وام ندارید، عدد 0 رو وارد کنید</span>
            </div>
            <InputState
                label="سال ساخت"
                value={year_of_build !== undefined && year_of_build !== null ? String(year_of_build) : ""}
                onChange={(e) => setYearOfBuild(Number(e.target.value.replace(/,/g, "")))}
            />
            <InputState
                label="تعداد اتاق"
                value={room_number !== undefined && room_number !== null ? String(room_number) : ""}
                onChange={(e) => setRoomNumber(Number(e.target.value.replace(/,/g, "")))}
            />
            <InputState
                label="طبقه مورد نظر"
                value={floor_number !== undefined && floor_number !== null ? String(floor_number) : ""}
                onChange={(e) => setFloorNumber(Number(e.target.value.replace(/,/g, "")))}
            />
            <InputState
                label="تعداد طبقات"
                value={floor !== undefined && floor !== null ? String(floor) : ""}
                onChange={(e) => setFloor(Number(e.target.value.replace(/,/g, "")))}
            />
        </div>
    )
}

export default StepTwo
