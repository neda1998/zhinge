import React from 'react';
import PropTypes from 'prop-types';

const Heading = ({ size, children }:any) => {
    let Tag: any = `h${size}`;
    return <Tag>{children}</Tag>;
};

Heading.propTypes = {
    size: PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired,
    children: PropTypes.node.isRequired,
};

export default Heading;
