/** @format */
import * as CSS from "csstype";
import { ButtonHTMLAttributes } from "react";

type StepperProps = ButtonHTMLAttributes<HTMLSpanElement> & {
  variant?:
  | "text"
  | "contained"
  | "outlined"
  | "gradient"
  | "filled"
  | "outlined"
  | "notheader";
  className?: React.CSSProperties;
  bgcolor?: CSS.Property.BackgroundColor | number | string;
  width?: CSS.Property.Width | number | string;
  fullwidth?: boolean | string;
  fullheight?: boolean | string;
  height?: CSS.Property.Height | number | string;
  color?: CSS.Property.Color | number | string;
  borderradius?: CSS.Property.BorderRadius | number | string;
  steps: string[];
  currentStep: number;
  stepper: boolean | string;
};
export default StepperProps;
