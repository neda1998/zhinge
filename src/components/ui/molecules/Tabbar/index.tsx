/** @format */

import React from "react";
import Tabs from "../../atoms/Tabs";
import Button from "../../atoms/Button";
import { ITabbarsProps } from "./types";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Tabbars({ tabList, state, dispatch }: ITabbarsProps) {
  return (
    <Tabs>
      {tabList.map((item: any, index: number) => (
        <React.Fragment key={index}>
          <Button
            tab="true"
            index={index}
            state={state}
            onClick={() => dispatch(index)}
            {...a11yProps(index)}
          >
            <div
              className={`text-[18px] flex flex-col items-center h-16 mobile:h-8 mobile:text-[16px] justify-end bg-cover no-scrollbar text-nowrap font-bold`}
            >
              {item.title}
            </div>
          </Button>
        </React.Fragment>
      ))}
    </Tabs>
  );
}

export default Tabbars;
