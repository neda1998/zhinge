import Button from "../../../components/ui/atoms/Button";
import { useNavigate } from "react-router-dom";
import Happy from '../../../assets/images/congratulations-0UvPfxrW4h.svg'
import LayoutProfile from "../../../components/profile/LayoutProfile";
export default function SuccessfullyAddDashboard() {
  const navigate = useNavigate();
  return (
    <LayoutProfile>
      <div className="w-full flex flex-col items-center justify-center mt-20">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-[1.5rem]">آگهی شما با موفقیت ثبت شد </h1>
          <span className="h-[2px] w-[70%] bg-[#09A380]"></span>
        </div>
      </div>
      <div className="w-full h-[40vh] flex items-center justify-center">
        <img src={Happy} alt="" width={800} className="absolute mt-8 " />
        <Button
          submit={"true"}
          width={"250px"}
          height={"50px"}
          bgcolor={"#09A380"}
          borderradius={"30px"}
          onClick={() => navigate("/", { replace: true })}
        >
          <p className="text-[1rem] font-bold">مشاهده آگهی</p>
        </Button>
      </div>
    </LayoutProfile>
  );
}
