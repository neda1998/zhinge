/** @format */

import { ButtonHTMLAttributes } from "react";

type BadgeProps = ButtonHTMLAttributes<HTMLSpanElement> & {
  variant?:
  | "text"
  | "contained"
  | "outlined"
  | "gradient"
  | "filled"
  | "outlined"
  | "arad";
  className?: React.CSSProperties;
  children?: any;
  bgcolor?: any;
  addclient?: any;
  text?: boolean | string;
  ReportBtn?: any;
  width?: any;
  fullwidth?: any;
  fullheight?: any;
  height?: any;
  position?: any;
  top?: any;
  bottom?: any;
  left?: any;
  right?: any;
  color?: any;
  error?: any;
  normal?: boolean | string;
  gradientbtn?: any;
  circle?: any;
  saveUser?: any;
  borderradius?: any;
};

export default BadgeProps;
