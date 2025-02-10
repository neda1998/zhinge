import { ButtonHTMLAttributes } from "react";
import * as CSS from "csstype";

type NavItemsProps = {
    variant?: "text" | "contained" | "outlined" | "gradient" | "filled" | "outlined" | "auth" | "Selection" | "Force";
    className?: React.CSSProperties;
    children?: React.ReactNode;
    bgcolor?: any,
    width?: CSS.Property.Width | number;
    height?: CSS.Property.Height | number;
    fullwidth?: boolean | string,
    fullheight?: boolean | string,
    color?: boolean | string,
    error?: boolean | string,
    text: string,
    url?: string | any
};

export default NavItemsProps;