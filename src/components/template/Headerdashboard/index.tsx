import ZhingeLogo from '../../../assets/images/Zhinge.svg'
import { navItems } from "./navItems";
import NavList from "../../ui/molecules/NavList";
import ImageProfile from '../../../assets/images/dashboardicons/Ellipse 381.svg'
export default function HeaderDashboard({ variant }: any) {
  return (
    <>
      <div className={`w-full  bg-transparent h-24  mobile:hidden flex items-center shadow-xl justify-center ${variant === "main" ? "absolute" : 'relative'}`}>
        <div className='flex w-full h-24  items-center justify-around   border-[1px] border-[#DEDEDE]  bg-white '>
          <div className='w-[10%] flex justify-center items-center p-3'>
            <img src={ZhingeLogo} alt="ZhingeLogo" width={100} />

          </div>
          <div className='p-3'>
            <NavList items={navItems} />
          </div>
          <div className='w-[38%]  z-50 flex justify-end'>
            <div className='w-[30%] flex justify-center gap-3 items-center '>
              <span>parsa</span>
              <div className="w-14 h-14 bg-red-500 rounded-full">
                <img src={ImageProfile} alt="" />
              </div>
              <div className="shadow-2xl -z-10  bg-[#09A3804D]  w-72 h-72 rounded-full absolute blur-xl opacity-90">1</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
