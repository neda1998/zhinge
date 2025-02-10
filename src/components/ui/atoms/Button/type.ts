/** @format */

import { ButtonHTMLAttributes } from "react";
import * as CSS from "csstype";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "text" | "contained" | "outlined" | "gradient" | "filled" | "outlined" | "arad" | "glass";
    className?: React.CSSProperties | any;
    children?: React.ReactNode;
    bgcolor?: any,
    addclient?: boolean | string,
    returnbtn?: boolean | string,
    ReportBtn?: boolean | string,
    width?: CSS.Property.Width | number | string,
    fullwidth?: boolean | string,
    fullheight?: boolean | string,
    height?: CSS.Property.Height | number | string,
    color?: any,
    error?: boolean | string,
    login?: boolean | string,
    gradientbtn?: boolean | string,
    submit?: boolean | string,
    saveUser?: boolean | string,
    borderradius?: any,
    bookmark?: boolean | string,
    tab?: boolean | string,
    state?: number | any,
    index?: number,
    border?:any,
};

export default ButtonProps;
