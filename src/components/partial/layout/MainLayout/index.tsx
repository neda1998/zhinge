import { LayoutsInterface } from "../../../../@types/App/components.type";

const MainLayout: React.FC<LayoutsInterface> = ({ children }: LayoutsInterface) => {

    return (
        <>
            <main className="flex flex-col mx-auto">
                {/* <Header /> */}
                <div className="mb-5 tablet:mt-0 tablet:mb-0 mobile:mt-0 mobile:mb-0 ">
                    {children}
                </div>
            </main>
        </>


    )
}

export default MainLayout;