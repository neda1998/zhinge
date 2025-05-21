import React from 'react';

const Text = ({ children, className }: any) => {
  return (
    <>
      <p className={className} >{children}</p>
    </>
  )
};

export default Text;
