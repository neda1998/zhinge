import React, { useState, useEffect } from "react";
import Logo1 from "@/assets/images/logo/Logo.svg";
import Logo2 from "@/assets/images/logo/logo2.png";
import Logo3 from "@/assets/images/logo/logo_3.png";
import instagram from '@/assets/images/Icons/Instagram.svg'
import Telegram from '@/assets/images/Icons/Telegram.svg'
import Whatsapp from '@/assets/images/Icons/Whatsapp.svg'
import Headphone from '@/assets/images/Icons/Headphone.svg'
import ImageSliderType from "./type";

const images = [Logo1, Logo2, Logo3];
const imagesSocial = [instagram, Telegram, Whatsapp, Headphone]

const ImageSlider = (props: ImageSliderType) => {
    const { variant, width } = props;
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setOpacity(0);
            setTimeout(() => {
                setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
                setOpacity(1);
            }, (variant === "logo" ? 600 : 1000));
        }, (variant === "logo" ? 5000 : 7000));

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="image-slider">
            {variant === "logo" ? (<>
                <img
                    key={currentImageIndex}
                    alt={`Logo ${currentImageIndex + 1}`}
                    src={images[currentImageIndex]}
                    className={` w-[${width ? width : ''}] slide`}
                    style={{ opacity, transition: "opacity 0.5s ease-in-out" }}
                />
            </>) : variant === "social" ? (
                <img
                    key={currentImageIndex}
                    alt={`Logo ${currentImageIndex + 1}`}
                    src={imagesSocial[currentImageIndex]}
                    className={` ${width ? width : ''} slide`}
                    style={{ opacity, transition: "opacity 0.5s ease-in-out" }}
                />
            ) : ""}

        </div>
    );
};

export default ImageSlider;
