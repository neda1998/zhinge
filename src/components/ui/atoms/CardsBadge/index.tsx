/** @format */

import React from "react";
import { ICardsBadgeProps } from "./types";
import Badge from "../Badge";

function CardsBadge({ isOff, isNew, offPersont, cover }: ICardsBadgeProps) {
  return (
    <React.Fragment>
      {isNew && cover && isOff ? (
        <div className="flex items-center justify-between px-4 absolute top-[-0.6rem] w-full">
        <Badge text={"true"} bgcolor={"white"}>
          new
        </Badge>
        <Badge text={"true"} bgcolor={"white"}>
          همراه با جلد
        </Badge>
        <Badge text={"true"} color={"#FF0000"} bgcolor={"white"}>
          %{offPersont}
        </Badge>
      </div>
      ) : isNew && isOff ? (
        <div className="flex items-center justify-between px-4 absolute top-[-0.6rem] w-full">
        <Badge text={"true"} bgcolor={"white"}>
          new
        </Badge>
        <Badge text={"true"} color={"#FF0000"} bgcolor={"white"}>
          %{offPersont}
        </Badge>
      </div>
      ) : isNew ? (
        <div className="flex items-center justify-start px-4 absolute top-[-0.6rem] w-full">
          <Badge text={"true"} bgcolor={"white"}>
            new
          </Badge>
        </div>
      ) : cover ? (
        <div className="flex items-center justify-center px-4 absolute top-[-0.6rem] w-full">
          <Badge text={"true"} bgcolor={"white"}>
            همراه با جلد
          </Badge>
        </div>
      ) : (
        isOff && (
          <div className="flex items-center justify-end px-4 absolute top-[-0.6rem] w-full">
            <Badge text={"true"} color={"#FF0000"} bgcolor={"white"}>
              %{offPersont}
            </Badge>
          </div>
        )
      )}
    </React.Fragment>
  );
}

export default CardsBadge;
