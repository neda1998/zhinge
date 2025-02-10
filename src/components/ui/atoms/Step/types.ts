/** @format */
import * as CSS from "csstype";
import { ButtonHTMLAttributes } from "react";

type StepProps = ButtonHTMLAttributes<HTMLSpanElement> & {
  variant?:
  | "text"
  | "contained"
  | "outlined"
  | "gradient"
  | "filled"
  | "outlined"
  | "notheader"
  | any;
  className?: React.CSSProperties;
  bgcolor?: any;
  width?: CSS.Property.Width | number | string;
  fullwidth?: boolean | string;
  fullheight?: boolean | string;
  height?: CSS.Property.Height | number | string;
  color?: any;
  borderradius?: any;
  isactive: boolean;
  iscompeleted: boolean;
  index?: number;
  step: boolean | string;
  label: string;
  length: number;
};
export default StepProps;
