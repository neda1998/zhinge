/** @format */

import { forwardRef } from "react";
import TabsProps from "./types";
import useClassNames from "../../../../core/hooks/classnames";

const Tabs = forwardRef<HTMLDivElement, TabsProps>((props, ref) => {
  const {
    bgcolor,
    width,
    fullwidth,
    fullheight,
    height,
    color,
    children,
    borderradius,
  } = props;

  const tabsClasses = useClassNames("flex items-center border-b border-b-2 border-b-[#D9D9D9]");

  const inlineStyles = {
    backgroundColor: bgcolor,
    color: color,
    borderRadius: borderradius,
    width: fullwidth ? "100%" : width,
    height: fullheight ? "100%" : height,
  };

  return (
    <div {...props} style={inlineStyles} className={tabsClasses}>
      {children}
    </div>
  );
});

Tabs.displayName = "Tabs";
export default Tabs;
