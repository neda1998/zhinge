import React, { useState } from 'react';
import Image22 from '../../../../assets/images/Rectangle 60 (1).svg'
const ImageGallery = ({ ImageMainPage, Image2, Image3 }: any) => {
    const [mainImage, setMainImage] = useState(ImageMainPage);

    return (
        <>
            <img src={mainImage} className="object-contain" alt="Main" />
            <div className="w-[70%] grid grid-cols-2 -top-24  overflow-hidden relative justify-start last-of-type:-bottom-5 items-end h-fit">
                <img
                    className='col-span-1'
                    src={Image2}
                    alt="Thumbnail 2"
                    onClick={() => setMainImage(Image22)}
                />
                <img
                    className='col-span-1'
                    src={Image3}
                    alt="Thumbnail 3"
                    onClick={() => setMainImage(ImageMainPage)}
                />
            </div>
        </>
    );
};

export default ImageGallery;
