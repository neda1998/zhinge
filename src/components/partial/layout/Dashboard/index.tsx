import * as React from "react";
import Sidbars from "./Components/Sidbar";
import { LayoutsInterface } from "../../../../@types/App/components.type";
import Header from "../../../template/Header";
import HeaderDashboard from "../../../template/Headerdashboard";
const DashboardLayout: React.FC<LayoutsInterface> = ({ children }: LayoutsInterface) => {
    return (
        <>
            <div className="flex flex-col mobile:hidden w-full desktop:w-[97%]" >
                <HeaderDashboard />
                <div className=" flex  xl:w-[79%] mobile:w-[100%] laptop:w-full desktop:w-full ">
                    <div className="mobile:hidden">
                        <Sidbars />
                    </div>
                    {children}
                </div>
            </div >
            <main className=" mobile:flex flex-col  hidden mx-auto p-4 overflow-hidden">
                <Header />
                <HeaderDashboard />
                <div className="mt-3 mb-5 ">
                    {children}
                </div>
            </main>

        </>
    )
}
export default DashboardLayout