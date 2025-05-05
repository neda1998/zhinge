import { LayoutsInterface } from "../../../../@types/App/components.type";

const MainLayout: React.FC<LayoutsInterface> = ({ children }: LayoutsInterface) => {

    return (
        <>
            <main className="flex flex-col mx-auto">
                {/* <Header /> */}
                <div>
                    {children}
                </div>
            </main>
        </>


    )
}

export default MainLayout;