/** @format */

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const toastify = ({ type, message, position, rtl }: any) => {
  toast(message, {
    position: position,
    type: type,
    pauseOnFocusLoss: false,
    rtl: rtl,
    autoClose: 2000,
    // hideProgressBar:true
  });
};
