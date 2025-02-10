import { forwardRef } from "react";
import useClassNames from "../../../../core/hooks/classnames";
import SelectProps from "./type";
import arrow from "../../../../assets/images/service/Polygon.svg"
const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
    const {
        variant,
        bgcolor,
        width,
        fullwidth,
        baseresponsiv,
        fullheight,
        height,
        bookmark,
        color,
        borderradius,
        error,
        children,
        submit,
        returnbtn,
        base,
        styleInput
    } = props;
    const baseClasses = `font-iranSans flex items-center font-[500] leading-[17.77px] justify-evenly`;

    const sizeClasses = useClassNames({
        "w-full": fullwidth,
        "h-full": fullheight,
        [`w-[${width}]`]: width && !fullwidth,
        [`h-[${height}]`]: height && !fullheight,
    });


    const BaseBtn = useClassNames(
        baseClasses,
        sizeClasses,
        `block custom-select appearance-none remove-arrow ${styleInput} ${variant === "arrow-icon" ? 'selects text-black px-5 ' : 'text-center'} ${error ? 'border-red-500' : ''} border-[1px] outline-none  text-[#9F9F9F] bg-[#ECECEC] text-[14px] p-2 text-sm  rounded-[13px] `
    );

    const BaseBtnResponsive = useClassNames(
        baseClasses,
        sizeClasses,
        `block  custom-select w-[220px] mobile:w-[115px] remove-arrow ${styleInput} disa  ${variant === "arrow-icon" ? 'selects text-black ' : 'text-center'} ${error ? 'border-red-500' : ''} border-[1px] outline-none  text-[#9F9F9F] bg-[#ECECEC] text-[14px]  p-2  text-sm   rounded-[13px] `
    );
    const SubmitBtn = useClassNames(
        baseClasses,
        sizeClasses,
        ` rounded-[17px]   h-[51.21px]  text-[14px]  `
    );

    const ReturnBtn = useClassNames(
        baseClasses,
        sizeClasses,
        ` rounded-[96px] w-[206px]  h-[40px]  text-[14px]  `
    );

    const BookMark = useClassNames(
        baseClasses,
        sizeClasses,
        `rounded-[96px] w-[41px] border border-[1px] border-[#D3D3D3]  h-[41px]  text-[14px]  `
    );

    const buttonClasses = useClassNames(
        base && BaseBtn,
        submit && SubmitBtn,
        returnbtn && ReturnBtn,
        bookmark && BookMark,
        baseresponsiv && BaseBtnResponsive
    );

    const inlineStyles = {
        backgroundColor: bgcolor,
        color: color,
        borderRadius: borderradius,
        width: fullwidth ? "100%" : width,
        height: fullheight ? "100%" : height,
    };

    return (
        <select {...props} className={buttonClasses} style={inlineStyles} >
            <img src={arrow} alt="arrow " width={"40px"} height={"40px"} />
            {children}
        </select>
    );
});

Select.displayName = "Select";
export default Select;