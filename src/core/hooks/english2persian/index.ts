/** @format */

import { useState, useEffect } from "react";

const englishToPersianMap: { [key: string]: string } = {
  "0": "۰",
  "1": "۱",
  "2": "۲",
  "3": "۳",
  "4": "۴",
  "5": "۵",
  "6": "۶",
  "7": "۷",
  "8": "۸",
  "9": "۹",
};

const useEnglishToPersianNumber = (number: number | string): string => {
  const [persianNumber, setPersianNumber] = useState<string>("");

  useEffect(() => {
    const convertNumber = (num: number | string): string => {
      return num
        .toString()
        .split("")
        .map((char) => englishToPersianMap[char] || char)
        .join("");
    };

    setPersianNumber(convertNumber(number));
  }, [number]);

  return persianNumber;
};

export default useEnglishToPersianNumber;
