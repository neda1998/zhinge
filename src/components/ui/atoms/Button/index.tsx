import React, { forwardRef } from "react";

import ButtonProps from "./type";
import useClassNames from "../../../../core/hooks/classnames";
const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    variant,
    bgcolor,
    width,
    fullwidth,
    className,
    fullheight,
    height,
    bookmark,
    color,
    borderradius,
    children,
    login,
    submit,
    returnbtn,
    tab,
    index,
    border,
    state,
    type = "button", 
  } = props;
  const baseClasses = `font-iranSans flex items-center font-[500] leading-[17.77px] px-3 justify-evenly`;

  const sizeClasses = useClassNames({
    "w-full": fullwidth,
    "h-full": fullheight,
    [`w-[${width}]`]: width && !fullwidth,
    [`h-[${height}]`]: height && !fullheight,
  });

  const LoginBtn = useClassNames(
    baseClasses,
    sizeClasses,
    ` rounded-[59px] w-[128px] h-[36px]  text-[14px]   border border-[1px] border-[#CACACA]`
  );

  const SubmitBtn = useClassNames(
    baseClasses,
    sizeClasses,
    ` ${className}
    rounded-[17px] p-4 h-[51.21px]  text-[14px] ${variant === "outlined" ? 'bg-transparent border-[1px] border-[#09A380]' : variant === 'glass' ? "isolate aspect-video  rounded-xl bg-white/40 shadow-lg ring-1 ring-black/5" : ''} `
  );

  const ReturnBtn = useClassNames(
    baseClasses,
    sizeClasses,
    ` rounded-[96px] w-[206px]  h-[40px]  text-[14px] ${variant === 'outlined' ? 'bg-transparent border-[1px] flex justify-center items-end border-[#007C9A]' : ''} `
  );

  const BookMark = useClassNames(
    baseClasses,
    sizeClasses,
    `rounded-3xl w-[42px] h-[35px] border border-[#D3D3D3]`
  );
  const Tab = useClassNames(
    `py-2 border-b-4 -mb-[2px] w-full transition-colors duration-300 ${index === state ? "border-[#09A380] text-[#09A380]" : "border-transparent"
    }`
  )


  const buttonClasses = useClassNames(
    login && LoginBtn,
    submit && SubmitBtn,
    returnbtn && ReturnBtn,
    bookmark && BookMark,
    tab && Tab
  );

  const inlineStyles = {
    backgroundColor: bgcolor,
    color: color,
    borderRadius: borderradius,
    width: fullwidth ? "100%" : width,
    height: fullheight ? "100%" : height,
    border: border,
  };

  return (
    <button {...props} className={buttonClasses} style={inlineStyles} ref={ref} type={type}>
      {children}
    </button>
  );
});
Button.displayName = "Button";
export default Button;