import { InputHTMLAttributes } from "react";
import * as CSS from "csstype";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    variant?: "text" | "contained" | "outlined" | "gradient" | "filled" | "outlined" | "arad" | "Date";
    className?: React.CSSProperties;
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
    base?: boolean | string
    render?: any
    calendar?: any
    locale?: any
    name?: string; // Add the name property
};

export default InputProps;