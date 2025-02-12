import { forwardRef } from "react";
import InputProps from "./type";
import useClassNames from "../../../../core/hooks/classnames";
const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    variant,
    bgcolor,
    width,
    fullwidth,
    fullheight,
    height,
    bookmark,
    color,
    borderradius,
    error,
    children,
    login,
    submit,
    returnbtn,
    base,
    name, 
    type, 
  } = props;
  const baseClasses = `font-iranSans flex items-center font-[500] leading-[17.77px] justify-evenly`;
  const sizeClasses = useClassNames({
    "w-full": fullwidth,
    "h-full": fullheight,
    [`w-[${width}]`]: width && !fullwidth,
    [`h-[${height}]`]: height && !fullheight,
  });


  const BaseInput = useClassNames(
    baseClasses,
    sizeClasses,
    `peer h-full w-full rounded-[7px] border-0 ${
      variant === "Date" ? "icon" : ""
    }  border ${
      error ? "border-red-500" : ""
    }  bg-transparent px-3 py-2.5  text-sm outline outline-0 transition-all placeholder-shown:${
      error ? "border-primary-red" : ""
    }  focus:border-1  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50`
  );

  const SubmitBtn = useClassNames(
    baseClasses,
    sizeClasses,
    ` rounded-[17px]   h-[51.21px]  text-[14px]  `
  );

  const ReturnBtn = useClassNames(
    baseClasses,
    sizeClasses,
    ` rounded-[96px] w-[206px]  h-[40px]  text-[14px]  `
  );

  const BookMark = useClassNames(
    baseClasses,
    sizeClasses,
    `rounded-[96px] w-[41px] border border-[1px] border-[#D3D3D3]  h-[41px]  text-[14px]  `
  );

  const Login = useClassNames(
    baseClasses,
    sizeClasses,
    `w-full remove-arrow tracking-[0.10rem] text-left pl-[19%] rounded-[13px] ${
      error ? "border-red-500" : " "
    }  placeholder-shown:${
      error ? "border-primary-red" : "border-primary-border "
    } placeholder-shown:border  bg-gray-main text-[14px] font-medium text-blue-gray-700 outline-none transition-all focus:border-1`
  );
  const buttonClasses = useClassNames(
    base && BaseInput,
    submit && SubmitBtn,
    returnbtn && ReturnBtn,
    bookmark && BookMark,
    login && Login
  );

  const inlineStyles = {
    backgroundColor: bgcolor,
    color: color,
    borderRadius: borderradius,
    width: fullwidth ? "100%" : width,
    height: fullheight ? "100%" : height,
  };

  return (
    <input {...props} name={name} type={type} className={buttonClasses} style={inlineStyles}>
      {children}
    </input>
  );
});
Input.displayName = "Input";
export default Input;