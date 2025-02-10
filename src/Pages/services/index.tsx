import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/template/Header";
import home from "../../assets/images/service/home.svg";
import scale from "../../assets/images/service/scales.svg";
import agreement from "../../assets/images/service/Agreement.svg";
import wallet from "../../assets/images/service/Wallet.svg";
import "../../App.css";
import Images from "../../components/ui/atoms/Image";
import backgrounimage from '../../assets/images/Rectangle 87.svg'

export interface IServicesList {
  img: string;
  title: string;
  path: string;
}

const servicesList: IServicesList[] = [
  {
    img: home,
    title: "کمیسیون املاک",
    path: "/services/commission",
  },
  {
    img: scale,
    title: "قوانین و شرایط",
    path: "/services/condition",
  },
  {
    img: agreement,
    title: "خدمات حقوقی",
    path: "/services/service",
  },
  {
    img: wallet,
    title: "بر آورد هزینه",
    path: "",
  },
];

export default function Services() {
  const navigate = useNavigate();
  return (
    <div>
      <Header />
      <div className="flex flex-col w-full mobile:h-screen mobile:justify-center pt-12 gap-12 mobile:p-0">
        <img src={backgrounimage} alt=" " className="absolute -z-10" />
        <div className="flex items-center w-full justify-center gap-2 font-bold text-[2.6rem] mobile:text-[24px] mobile:p-0">
          <p>خدمات</p>
          <p className="text-[#09A380]">ژینگه</p>
        </div>
        <div className="flex flex-row-reverse items-ceneter justify-around flex-wrap w-full  p-6 mobile:p-2 gap-4 ">
          {servicesList.map((item, index) => (
            <React.Fragment key={index}>
              <div
                onClick={() => navigate(`${item.path}`, { replace: true })}
                className="w-[300px] shadow-[0px_0px_20px_1px_rgba(0,0,0,0.3)] h-[17rem] bg-white gradient-box shadow-[#522f2f33] hover:text-white cursor-pointer rounded-[20px] flex flex-col items-center justify-center gap-4 mobile:w-[160px] mobile:h-[160px]"
              >
                <Images
                  src={item.img}
                  alt={item.title}
                  className={"mobile:w-[100px] mobile:h-[100px]"}
                />
                <p className="text-[1.2rem] mobile:text-[14px] font-bold">
                  {item.title}
                </p>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
