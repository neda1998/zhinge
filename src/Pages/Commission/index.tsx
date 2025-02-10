import React, { useState } from "react";
import Header from "../../components/template/Header";
import Tabbars from "../../components/ui/molecules/Tabbar";
import commsionPic from "../../assets/images/service/commision.svg";
import Images from "../../components/ui/atoms/Image";
import CustomTabPanel from "../../components/ui/atoms/TabPanel";
import PageOne from "../../components/template/pageOne";
import PageTwo from "../../components/template/PageTwo";

const tabList = [
  {
    title: "ملک فروشی ",
  },
  {
    title: "ملک اجاره ایی ",
  },
];

const pageList = [
  {
    page: <PageOne />,
    title: "page one",
  },
  {
    page: <PageTwo />,
    title: "page tow",
  },
];

export default function Commission() {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const [value, setValue] = useState(0);
  return (
    <React.Fragment>
      <Header />

      <div className="flex flex-col w-full lg:mt-16 mt-24 px-12 gap-4 mobile:px-3">
        <div className="w-full flex items-center h-[fit-content] gap-2 mobile:justify-center">
          <div className="w-10 h-2 rounded-3xl bg-[#09A380] mobile:hidden"></div>
          <p className="text-[30px] mobile:text-[20px] font-bold">محاسبه</p>
          <p className="text-[30px] mobile:text-[20px] font-bold text-[#09A380]">
            {" "}
            کمیسیون ملک
          </p>
        </div>
        <div className="flex items-start justify-center w-full flex-wrap mobile:flex-col-reverse mobile:gap-8">
          <div className="w-[50%] flex flex-col items-center mobile:w-full">
            <div className="w-[70%] mobile:w-full">
              <Tabbars
                tabList={tabList}
                state={activeTabIndex}
                dispatch={setActiveTabIndex}
              />
            </div>
            <div className="w-[85%] mt-8 mobile:w-full">
              {pageList.map((item: any, index: number) => (
                <React.Fragment key={index}>
                  <CustomTabPanel index={index} value={activeTabIndex}>
                    {item.page}
                  </CustomTabPanel>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="w-[50%] flex items-center justify-center mobile:w-full">
            <Images
              width={"560px"}
              height={"500px"}
              src={commsionPic}
              className={"object-cover mobile:w-full mobile:h-[300px]"}
              alt="commsion"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
