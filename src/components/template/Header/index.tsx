import Button from "../../ui/atoms/Button";
import ZhingeLogo from '../../../assets/images/Zhinge.svg'
import { navItems } from "../../../utils/data";
import { Link, useNavigate } from "react-router-dom";
import HeaderMobile from "../HeaderMobile";
import ChangeTheme from "../../changeTheme";
import { useCookies } from "react-cookie";
import NavList from "../../ui/molecules/NavList";


export default function Header({ variant }: any) {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["accessToken", "refreshToken", "name", "role"]);
  const displayName = cookies.name || "";
  const isAdmin = cookies.role === "true" || cookies.role === true;
  return (
    <>
      <div className={`w-full lg:flex hidden bg-transparent h-28 items-center justify-center ${variant === "main" ? "absolute" : 'relative'}`}>
        <div className='flex w-full mx-10 items-center justify-between pl-[11px] bg-white rounded-[100px] header-top-light header-top-dark'>
          <Link to="/" className='flex justify-center items-center py-2'>
            <img src={ZhingeLogo} alt="ZhingeLogo" width={100} />
          </Link>
          <div className='w-[50%] p-3'>
            <NavList items={navItems} />
          </div>
          <div className='w-[38%] flex justify-end gap-3'>
            <ChangeTheme />
            {isAdmin && (
              <Button
                onClick={() => navigate('/panel-admin/dashboard/management-dashboard')}
                borderradius={'100px'}
                bgcolor={"#F59E42"}
                width={'150px'}
                height={'44px'}
                color='white'
                returnbtn={"true"}
                className={'flex items-center justify-center'}
              >
                <span className="text-[13px] font-bold">
                  داشبورد ادمین
                </span>
              </Button>
            )}
            {
              !displayName ? (
                <Button
                  onClick={() => navigate('/Login')}
                  borderradius={'100px'}
                  bgcolor={"#09A380"}
                  color='white'
                  returnbtn={"true"}
                  className={'flex items-center justify-center w-[140px] h-[44px] sm:w-[110px] sm:h-[38px] mobile:w-[90px] mobile:h-[34px] !px-0'}
                >
                  <span className="!text-[13px] font-bold ">
                    ورود به حساب
                  </span>
                </Button>
              ) : (
                <Button
                  onClick={() => navigate("/dashboard/register-new-advertise")}
                  borderradius={"100px"}
                  bgcolor={"#09A380"}
                  color="white"
                  returnbtn={"true"}
                  className={"flex items-center justify-center w-[140px] h-[44px] sm:w-[110px] sm:h-[38px] mobile:w-[90px] mobile:h-[34px] !px-0"}
                >
                  <span className="!text-[13px] font-bold whitespace-nowrap">
                    {displayName}
                  </span>
                </Button>
              )
            }
          </div>
        </div>
      </div>
      <HeaderMobile />
    </>
  );
}
