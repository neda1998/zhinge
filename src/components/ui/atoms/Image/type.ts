/** @format */

type ImageProps = {
  variant?:
    | "text"
    | "contained"
    | "outlined"
    | "gradient"
    | "filled"
    | "outlined"
    | "auth"
    | "Selection"
    | "Force";
  onClick?: any;
  src: string | any;
  alt: string;
  className?: any;
  width?:any,
  height?:any
};

export default ImageProps;
