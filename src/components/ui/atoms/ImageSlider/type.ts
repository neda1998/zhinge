/** @format */

import { ButtonHTMLAttributes } from "react";
import * as CSS from "csstype";
import { number } from "yup";

type ImageSliderType = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "text" | "contained" | "outlined" | "gradient" | "filled" | "outlined" | "logo" | "social";
    className?: React.CSSProperties;
    width?: CSS.Property.Width | number | any
};

export default ImageSliderType;
