/** @format */

import React, { forwardRef } from "react";

import BadgeProps from "./type";
import useClassNames from "../../../../core/hooks/classnames";
const Badge = forwardRef<HTMLButtonElement, BadgeProps>((props, ref) => {
  const {
    variant,
    bgcolor,
    width,
    fullwidth,
    fullheight,
    height,
    text,
    color,
    position,
    top,
    left,
    bottom,
    right,
    borderradius,
    error,
    children,
    normal,
    circle,
  } = props;
  const baseClasses = ` flex items-center justify-center whitespace-nowrap rounded-full bg-[primary-100]  px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-primary-700 dark:bg-slate-900 dark:text-primary-500`;

  const sizeClasses = useClassNames({
    "w-full": fullwidth,
    "h-full": fullheight,
    [`w-[${width}]`]: width && !fullwidth,
    [`h-[${height}]`]: height && !fullheight,
  });

  const paddingClasses = "p-2.5";

  const NormalBadge = useClassNames(
    ` flex items-center justify-center bg-inherit w-[80px] h-[25px] rounded-full  text-[.8rem] capitalize mobile:w-[75.48px]  mobile:h-[20px] `
  );
  const CircleBadge = useClassNames(
    sizeClasses,
    baseClasses,
    `flex items-center justify-center  text-[7px] leading-[7.32px] font-bold rounded-full  rotate-[-40deg]`
  );

  const textBadge = useClassNames(

    `flex items-center justify-center bg-inherit w-[70px] h-[20px] rounded-full  text-[.8rem] capitalize mobile:w-[75.48px]  mobile:h-[20px] `
  );

  const buttonClasses = useClassNames(
    normal && NormalBadge,
    circle && CircleBadge,
    text && textBadge
  );

  const inlineStyles = {
    backgroundColor: bgcolor,
    color: color,
    borderRadius: borderradius,
    width: fullwidth ? "100%" : width,
    height: fullheight ? "100%" : height,
    position: position,
    top: top,
    bottom: bottom,
    left: left,
    right: right,
  };

  return (
    <span {...props} className={buttonClasses} style={inlineStyles} ref={ref}>
      {children}
    </span>
  );
});

Badge.displayName = "Badge";
export default Badge;
