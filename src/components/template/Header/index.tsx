import Button from "../../ui/atoms/Button";
import Logo from '../../../assets/images/Login.svg'
import ZhingeLogo from '../../../assets/images/Zhinge.svg'
import { navItems } from "../../../utils/data";
import NavList from "../../ui/molecules/NavList";
import { Link, useNavigate } from "react-router-dom";
import HeaderMobile from "../HeaderMobile";
import ChangeTheme from "../../changeTheme";
import { useCookies } from "react-cookie";



export default function Header({ variant }: any) {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["accessToken", "refreshToken", "full_name"]);
  const displayName = cookies.full_name || "";
  return (
    <>
      <div className={`w-full mobile:hidden tablet:hidden bg-transparent h-28 flex items-center justify-center ${variant === "main" ? "absolute" : 'relative'}`}>
        <div className='flex w-[95%] items-center justify-around bg-white rounded-[100px] pl-1 header-top-light'>
          <Link to="/" className='w-[10%] flex justify-center items-center py-2'>
            <img src={ZhingeLogo} alt="ZhingeLogo" width={100} />
          </Link>
          <div className='w-[50%] p-3'>
            <NavList items={navItems} />
          </div>
          <div className='w-[38%] flex justify-end gap-3'>
            <ChangeTheme />
            {
              cookies.accessToken ? (
                <Button
                  onClick={() => {
                    // Clear cookies correctly by setting them to an empty string
                    setCookies("accessToken", "", { path: "/" });
                    setCookies("refreshToken", "", { path: "/" });
                    navigate("/Login");
                  }}
                  borderradius={"100px"}
                  bgcolor={"#09A380"}
                  width={"140px"}
                  height={"44px"}
                  color="white"
                  returnbtn={"true"}
                  className={"flex items-center justify-center"}
                >
                  <span className="text-[13px] font-bold">
                    {displayName ? displayName : "خروج"}
                  </span>
                </Button>
              ) : (
                <Button onClick={() => navigate('/Login')} borderradius={'100px'} bgcolor={"#09A380"} width={'140px'} height={'44px'} color='white' returnbtn={"true"} className={'flex items-center justify-center'}>
                  <span className=" text-[13px] font-bold ">
                    ورود به حساب
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
