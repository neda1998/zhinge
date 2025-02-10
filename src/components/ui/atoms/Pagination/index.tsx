/* eslint-disable react-hooks/rules-of-hooks */
/** @format */

import React, { useState } from "react";
import useEnglishToPersianNumber from "../../../../core/hooks/english2persian";
import { IPaginationProps } from "./type";


const Pagination = ({ data }: IPaginationProps) => {
  const [cur, setCur] = useState(1);

  const totalPages = data.length;

  const renderPagination = () => {
    return data.map((page, index) => {
      if (page.id <= 3 || page.id === totalPages) {
        return (
          <button
            dir="rtl"
            key={index}
            onClick={() => setCur(page.id)}
            className={`h-[25px] border-2  flex items-center justify-center border-[#D9D9D9] text-[#9E9E9E] font-[500] text-[16px] leading-4 w-[25px] ${cur === page.id && "bg-[#007C9A] text-[#fff] border-none"
              } rounded-full`}
          >
            {useEnglishToPersianNumber(page.id)}
          </button>
        );
      } else if (page.id === 4) {
        return (
          <span
            key={index}
            className='text-[#9E9E9E] font-[500] text-[16px] leading-4'
          >
            ...
          </span>
        );
      } else {
        return null;
      }
    });
  };

  return (
    <div>
      <div className='flex items-center justify-center gap-5 flex-row-reverse'>
        {renderPagination()}
      </div>
    </div>
  );
};

export default Pagination;
