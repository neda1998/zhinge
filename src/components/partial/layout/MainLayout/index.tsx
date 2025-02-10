import { LayoutsInterface } from "../../../../@types/App/components.type";

const MainLayout: React.FC<LayoutsInterface> = ({ children }: LayoutsInterface) => {

    return (
        <>
            <main className="flex flex-col mobile:hidden lg:w-full mx-auto">
                {/* <Header /> */}
                <div className="">
                    {children}
                </div>
            </main>
            <main className=" mobile:flex flex-col hidden mx-auto p-4 mobile:p-0 tablet:p-0 overflow-hidden">
                {/* <Header /> */}
                <div className="mt-3 mb-5 tablet:mt-0 tablet:mb-0 mobile:mt-0 mobile:mb-0 ">
                    {children}
                </div>
            </main>
        </>


    )
}

export default MainLayout;