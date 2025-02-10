import React from 'react';
import ImageProps from './type';

const Images = (props: ImageProps) => {
    const { onClick, src, alt, width, height, className } = props;
    return <img  onClick={onClick} className={className} src={src} alt={alt} width={width} height={height} />;

};

export default Images;
