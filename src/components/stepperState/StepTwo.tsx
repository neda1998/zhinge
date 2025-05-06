import InputState from "../ui/atoms/input/inputState"
import ComboBox from "../common/Combo"
import React from "react";
import TitleCommon from "./TitleCommon"

interface StepTwoProps {
    loan: number; setLoan: (v: number) => void;
    year_of_build?: number; setYearOfBuild: (v: number) => void;
    room_number?: number; setRoomNumber: (v: number) => void;
    land_metrage?: number; setLandMetrage: (v: number) => void;
    floor_number?: number; setFloorNumber: (v: number) => void;
    floor?: number; setFloor: (v: number) => void;
}

const StepTwo = ({
    loan, setLoan,
    year_of_build, setYearOfBuild,
    room_number, setRoomNumber,
    land_metrage, setLandMetrage,
    floor_number, setFloorNumber,
    floor, setFloor
}: StepTwoProps) => {

    return (
        <div className="grid lg:grid-cols-4 grid-cols-1 w-full gap-5">
            <div className="flex items-center gap-5">
                <InputState
                    label="وام"
                    value={loan !== undefined && loan !== null ? Number(loan) : ""}
                    onChange={(e) => setLoan(Number(e.target.value.replace(/,/g, "")))}
                />
                
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
                label="متراژ مفید"
                value={land_metrage !== undefined && land_metrage !== null ? String(land_metrage) : ""}
                onChange={(e) => setLandMetrage(Number(e.target.value.replace(/,/g, "")))}
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
